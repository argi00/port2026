import { NextResponse } from 'next/server';
import { isLang, type Lang } from '@/data/i18n';
import { buildSystemPrompt } from '@/lib/knowledge';
import { fallbackAnswer } from '@/lib/fallback';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Msg = { role: 'user' | 'assistant'; content: string };

const MAX_MESSAGES = 8;
const MAX_CHARS = 500;

// Limite simple par adresse IP (en mémoire). Suffisant pour un portfolio ;
// sur Vercel, chaque instance a son propre compteur.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = Number(process.env.CHAT_RATE_LIMIT) || 30;
const hits = new Map<string, { count: number; reset: number }>();

function isLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

// Nettoie ce que le navigateur envoie : on ne fait jamais confiance au client.
function cleanMessages(input: unknown): Msg[] {
  if (!Array.isArray(input)) return [];
  const out: Msg[] = [];
  for (const item of input.slice(-MAX_MESSAGES)) {
    if (!item || typeof item !== 'object') continue;
    const rec = item as Record<string, unknown>;
    const role = rec.role;
    const content = rec.content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue;
    const text = content.trim().slice(0, MAX_CHARS);
    if (!text) continue;
    const last = out[out.length - 1];
    if (last && last.role === role) last.content += `\n${text}`;
    else out.push({ role, content: text });
  }
  while (out.length > 0 && out[0].role !== 'user') out.shift();
  return out;
}

async function askClaude(apiKey: string, lang: Lang, messages: Msg[]): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5',
        max_tokens: 400,
        system: buildSystemPrompt(lang),
        messages,
      }),
    });
    if (!res.ok) throw new Error(`Anthropic API error ${res.status}`);
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = (data.content ?? [])
      .filter((c) => c.type === 'text')
      .map((c) => c.text ?? '')
      .join('')
      .trim();
    if (!text) throw new Error('Empty reply');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

// Modèle local gratuit via Ollama (https://ollama.com). Utile en développement
// sur votre ordinateur : un serveur Vercel ne peut pas joindre votre Ollama local.
async function askOllama(lang: Lang, messages: Msg[]): Promise<string> {
  const model = process.env.OLLAMA_MODEL;
  if (!model) throw new Error('OLLAMA_MODEL not set');
  const base = (process.env.OLLAMA_URL || 'http://localhost:11434').replace(/\/$/, '');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 60_000);
  try {
    const res = await fetch(`${base}/api/chat`, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        model,
        stream: false,
        // num_ctx : taille de contexte. La valeur par défaut d'Ollama est petite
        // et tronquerait les informations fournies au modèle.
        options: { temperature: 0.2, num_ctx: 8192 },
        messages: [{ role: 'system', content: buildSystemPrompt(lang) }, ...messages],
      }),
    });
    if (!res.ok) throw new Error(`Ollama error ${res.status}`);
    const data = (await res.json()) as { message?: { content?: string } };
    const text = data.message?.content?.trim();
    if (!text) throw new Error('Empty reply');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  const payload = (body ?? {}) as { messages?: unknown; lang?: unknown };
  const lang: Lang = typeof payload.lang === 'string' && isLang(payload.lang) ? payload.lang : 'fr';
  const messages = cleanMessages(payload.messages);
  const last = messages[messages.length - 1];
  if (!last || last.role !== 'user') {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  // Ordre : 1) Claude (clé API)  2) modèle local Ollama  3) mode de secours intégré.
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (apiKey) {
    try {
      const reply = await askClaude(apiKey, lang, messages);
      return NextResponse.json({ reply });
    } catch (error) {
      console.error('[chat] Claude request failed, trying next option:', error);
    }
  }

  if (process.env.OLLAMA_MODEL) {
    try {
      const reply = await askOllama(lang, messages);
      return NextResponse.json({ reply });
    } catch (error) {
      console.error('[chat] Ollama request failed, using built-in fallback:', error);
    }
  }

  // Question utilisateur précédente, pour comprendre les relances courtes ("et en 2023 ?").
  const previousUser = messages
    .slice(0, -1)
    .reverse()
    .find((m) => m.role === 'user')?.content;

  return NextResponse.json({ reply: fallbackAnswer(last.content, lang, previousUser) });
}
