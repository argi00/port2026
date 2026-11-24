'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import type { Dict, Lang } from '@/data/i18n';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget({ lang, labels }: { lang: Lang; labels: Dict['chat'] }) {
  // `messages` ne contient pas le message de bienvenue (affiché à part).
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  // Fait défiler uniquement la zone de discussion, pas toute la page.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setLoading(true);
    setFailed(false);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lang }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { reply?: string };
      if (!data.reply) throw new Error('empty reply');
      setMessages([...next, { role: 'assistant', content: data.reply }]);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <div className="chat">
      <div className="chat-head">
        <h2 className="chat-title">{labels.title}</h2>
        <span className="chat-badge">{labels.badge}</span>
      </div>

      <div className="chat-log" ref={logRef} role="log" aria-live="polite" aria-relevant="additions">
        <div className="bubble bubble-bot">{labels.welcome}</div>
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'bubble bubble-user' : 'bubble bubble-bot'}>
            {m.content}
          </div>
        ))}
        {loading && <div className="bubble bubble-bot bubble-pending">{labels.thinking}</div>}
        {failed && (
          <div className="bubble bubble-error" role="alert">
            {labels.error}
          </div>
        )}
      </div>

      {messages.length === 0 && (
        <div className="suggestions">
          {labels.suggestions.map((s) => (
            <button key={s} type="button" className="suggestion" onClick={() => void send(s)} disabled={loading}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form className="chat-form" onSubmit={onSubmit}>
        <label htmlFor="chat-input" className="visually-hidden">
          {labels.inputLabel}
        </label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={labels.placeholder}
          maxLength={500}
          autoComplete="off"
          disabled={loading}
        />
        <button type="submit" className="send-button" aria-label={labels.send} disabled={loading || !input.trim()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </div>
  );
}
