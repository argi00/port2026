import { site } from '@/data/site';
import { dict, type Lang } from '@/data/i18n';
import { projects } from '@/data/projects';
import { certifications } from '@/data/certifications';
import { CONCEPTS } from '@/lib/concepts';

// ============================================================
// Mode de secours du chatbot (sans clé API et sans modèle local).
//
// Principe : le site est découpé en "fiches" (profil, compétences, chaque
// expérience, chaque projet, chaque certification, contact...). Chaque fiche
// porte aussi des synonymes (français et anglais). La question du visiteur est
// comparée à toutes les fiches, avec une tolérance aux formes proches
// (travail / travaillé / worked...). Les fiches les plus proches forment la réponse.
// Si la question est très courte ("et en 2023 ?"), on s'aide de la question précédente.
//
// Les fiches sont construites à partir de data/ : un projet ou une certification
// ajouté(e) est donc automatiquement trouvé(e).
// ============================================================

type Chunk = {
  id: string;
  text: Record<Lang, string>;
  terms: string; // synonymes, FR + EN
  tokens: string[];
};

const STOP = new Set(
  (
    // français
    'le la les un une des de du et ou ou au aux en dans sur sous par pour avec sans est es sont ete etre ' +
    'il elle ils elles lui son sa ses leur leurs ce cet cette ces que qui quoi quel quelle quels quelles ' +
    'quand comment combien pas ne se tu te toi ton ta tes vous votre vos je me mon ma mes nous notre ' +
    'plus tres aussi mais donc ni car ai as avons ont suis peut peux voudrais veux mamane argi ' +
    // anglais
    'the an and or of to in on at for with without is are was were be been he she it his her its they their ' +
    'this that these those what which who whom whose when where why how do does did can could should would ' +
    'will has have had me my you your we our not yes also but so as by from about any some tell please get got'
  ).split(' '),
);

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, ' ');
}

function tokenize(s: string): string[] {
  return norm(s)
    .split(/[^a-z0-9+#]+/)
    .filter((t) => t.length >= 2 && !STOP.has(t));
}

// ---- Groupes de sens ----------------------------------------------------
// Chaque mot connu est relié à son/ses groupe(s) (lib/concepts.ts). Un mot
// devient alors un jeton "c:<groupe>" : bosser, boulot et worked donnent tous "c:work".
const WORD_TO_CONCEPTS = new Map<string, string[]>();
for (const [id, words] of Object.entries(CONCEPTS)) {
  for (const w of words) {
    const key = norm(w);
    const list = WORD_TO_CONCEPTS.get(key) ?? [];
    if (!list.includes(id)) list.push(id);
    WORD_TO_CONCEPTS.set(key, list);
  }
}
const KNOWN_WORDS = Array.from(WORD_TO_CONCEPTS.keys());

// Une seule lettre fautive, ajoutée, oubliée ou inversée (coompetences ~ competences)
function oneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i += 1;
  if (a.length === b.length) {
    if (a.slice(i + 1) === b.slice(i + 1)) return true; // lettre remplacée
    return a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2); // inversion
  }
  const [long, short] = a.length > b.length ? [a, b] : [b, a];
  return long.slice(i + 1) === short.slice(i);
}

function conceptsOf(token: string, allowTypos: boolean): string[] {
  const direct = WORD_TO_CONCEPTS.get(token);
  if (direct) return direct;
  // Forme proche d'un mot connu (travaillait ~ travaille, worked ~ work)
  const out = new Set<string>();
  for (const w of KNOWN_WORDS) {
    if (w.length < 4 || token.length < 4) continue;
    const min = Math.min(w.length, token.length);
    let i = 0;
    while (i < min && w[i] === token[i]) i += 1;
    const sameStart = i >= Math.max(4, min - 2) && Math.abs(w.length - token.length) <= 3;
    const typo =
      allowTypos && w.length >= 6 && token.length >= 6 && (oneEdit(w, token) || oneEdit(w, token.replace(/(.)\1$|s$/, '')));
    if (sameStart || typo) WORD_TO_CONCEPTS.get(w)!.forEach((c) => out.add(c));
  }
  return Array.from(out);
}

function withConcepts(tokens: string[], allowTypos: boolean): string[] {
  const out = [...tokens];
  for (const t of tokens) for (const c of conceptsOf(t, allowTypos)) out.push(`c:${c}`);
  return out;
}

// Les groupes de sens se comparent exactement ; les mots, avec tolérance.
function similar(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.startsWith('c:') || b.startsWith('c:')) return false;
  const min = Math.min(a.length, b.length);
  if (min < 4) return false;
  let i = 0;
  while (i < min && a[i] === b[i]) i += 1;
  if (i >= Math.max(4, min - 2)) return true;
  return min >= 6 && oneEdit(a, b);
}

const SKILL_WORDS =
  'competences competence skills skill stack technologies technos techno outils tools maitrise sait connait know knows utilise use uses langages languages programmation programming framework frameworks libraries bibliotheques';
const EXPERIENCE_WORDS =
  'experience experiences parcours career carriere travaille travail worked work job emploi poste position role stage intern internship entreprise entreprises company companies employeur employer startup';
const EDUCATION_WORDS =
  'etudes etudie etudiant student study studies studied formation education ecole school universite university diplome degree niveau level mba master';

function buildChunks(): Chunk[] {
  const raw: Omit<Chunk, 'tokens'>[] = [];
  const f = dict.fr;
  const e = dict.en;

  raw.push({
    id: 'identity',
    text: {
      fr: `${site.name} est ${f.hero.title}, basé à Dakar au Sénégal. Il conçoit des applications complètes : backend, interfaces et intelligence artificielle intégrée.`,
      en: `${site.name} is an ${e.hero.title} based in Dakar, Senegal. He designs complete applications: backend, interfaces and built-in artificial intelligence.`,
    },
    terms:
      'presentation presenter introduce about nom name personne person profil profile metier job profession occupation developpeur developer ingenieur engineer',
  });

  raw.push({
    id: 'specialty',
    text: {
      fr: `Il est spécialisé en ${f.hero.web.join(', ')} et ${f.hero.ai.join(', ')}.`,
      en: `He specializes in ${e.hero.web.join(', ')} and ${e.hero.ai.join(', ')}.`,
    },
    terms: `specialite specialty speciality specialise specialize expertise domaine field forces strengths principal main focus ${SKILL_WORDS}`,
  });

  const skillTerms = [
    'backend back-end serveur server api apis django fastapi python framework',
    'frontend front-end interface ui ux web site react nextjs next javascript client',
    'ia ai intelligence artificielle artificial rag llm llms agent agents vision ordinateur computer modele modeles model models pytorch deep learning machine ml embeddings vectorielle vector chatbot',
    'data donnees analyse analyst analytics visualisation dashboard automatisation automation pandas plotly power bi workflow scraping',
  ];
  f.skills.groups.forEach((g, i) => {
    raw.push({
      id: `skills-${i}`,
      text: {
        fr: `${g.title} : ${g.items.join(', ')}.`,
        en: `${e.skills.groups[i].title}: ${e.skills.groups[i].items.join(', ')}.`,
      },
      terms: `${skillTerms[i] ?? ''} ${SKILL_WORDS}`,
    });
  });

  f.experience.items.forEach((item, i) => {
    const en = e.experience.items[i];
    const label = `${item.title} ${item.org}`;
    const isEdu = /MBA|Qwasar/i.test(label);
    const isTeach = /Teacher/i.test(label);
    let terms = isEdu ? EDUCATION_WORDS : EXPERIENCE_WORDS;
    if (isTeach) terms += ' enseigne enseignant professeur prof teacher teaching taught cours course etudiants students';
    if (/Likita/i.test(label)) terms += ' sante health medical hopital hospital agriculture satellite';
    if (/Yayi/i.test(label)) terms += ' developpeur developer junior web';
    if (/Qwasar/i.test(label)) terms += ' bootcamp programmation programming';
    raw.push({
      id: `exp-${i}`,
      text: {
        fr: `${item.period} : ${item.title}, ${item.org}. ${item.text}`,
        en: `${en.period}: ${en.title}, ${en.org}. ${en.text}`,
      },
      terms,
    });
  });

  projects.forEach((p) => {
    const link = p.link ? ` ${p.link}` : '';
    raw.push({
      id: `project-${p.slug}`,
      text: {
        fr: `${p.title.fr} : ${p.description.fr}${link}`,
        en: `${p.title.en}: ${p.description.en}${link}`,
      },
      terms: `projet projets project projects realisation realisations built construit developpe made created travaux portfolio demo ${p.tags.join(' ')} ${p.categories.join(' ')}`,
    });
  });

  certifications.forEach((c, i) => {
    raw.push({
      id: `cert-${i}`,
      text: {
        fr: `${c.title} (${c.issuer}, ${c.date.fr})`,
        en: `${c.title} (${c.issuer}, ${c.date.en})`,
      },
      terms: 'certification certifications certif certifs certificat certificate credential badge ibm',
    });
  });

  const contactParts = [`LinkedIn : ${site.linkedin}`];
  if (site.email) contactParts.push(`E-mail : ${site.email}`);
  if (site.github) contactParts.push(`GitHub : ${site.github}`);
  raw.push({
    id: 'contact',
    text: {
      fr: `Vous pouvez contacter Mamane ici : ${contactParts.join(' · ')}`,
      en: `You can reach Mamane here: ${contactParts.join(' · ').replace('E-mail', 'Email')}`,
    },
    terms:
      'contact contacter joindre ecrire email mail adresse reach touch hire embaucher recruter disponible disponibilite available availability open freelance mission collaborer collaborate linkedin github telephone appeler message',
  });

  raw.push({
    id: 'location',
    text: {
      fr: 'Mamane est basé à Dakar, au Sénégal. Il a aussi travaillé à Niamey, au Niger.',
      en: 'Mamane is based in Dakar, Senegal. He has also worked in Niamey, Niger.',
    },
    terms:
      'ou habite habiter vit vivre location located situated localisation base based ville city pays country dakar senegal niger niamey region remote distance',
  });

  raw.push({
    id: 'assistant',
    text: {
      fr: "Je suis l'assistant du portfolio de Mamane. Je réponds à partir des informations de ce site.",
      en: "I'm the assistant on Mamane's portfolio. I answer from the information on this site.",
    },
    terms: 'assistant chatbot bot robot toi you es qui who comment fonctionne works modele model',
  });

  raw.push({
    id: 'about',
    text: { fr: f.about.paragraphs[0], en: e.about.paragraphs[0] },
    terms: 'a propos about resume summary presentation profil background histoire story parcours',
  });

  return raw.map((c) => ({
    ...c,
    tokens: withConcepts(tokenize(`${c.terms} ${c.text.fr} ${c.text.en}`), false),
  }));
}

const chunks = buildChunks();

type Scored = { chunk: Chunk; score: number };

function search(query: string): Scored[] {
  const qTokens = Array.from(new Set(withConcepts(tokenize(query), true)));
  if (qTokens.length === 0) return [];

  const N = chunks.length;
  // Importance d'un mot : plus il est rare dans les fiches, plus il compte.
  const idf = new Map<string, number>();
  for (const q of qTokens) {
    const df = chunks.filter((c) => c.tokens.some((t) => similar(q, t))).length;
    idf.set(q, Math.log(1 + N / (1 + df)));
  }

  const scored: Scored[] = chunks.map((chunk) => {
    let score = 0;
    for (const q of qTokens) {
      let tf = 0;
      let exact = false;
      for (const t of chunk.tokens) {
        if (similar(q, t)) {
          tf += 1;
          if (q === t) exact = true;
        }
      }
      if (tf > 0) score += (idf.get(q) ?? 0) * (1 + Math.log(tf)) * (exact ? 1.3 : 1);
    }
    return { chunk, score };
  });

  return scored.sort((a, b) => b.score - a.score);
}

const MIN_SCORE = 1.2;
const MAX_CHUNKS = 6;

function pick(query: string): Scored[] {
  const ranked = search(query);
  const top = ranked[0];
  if (!top || top.score < MIN_SCORE) return [];
  return ranked.filter((r) => r.score >= top.score * 0.7).slice(0, MAX_CHUNKS);
}

export function fallbackAnswer(question: string, lang: Lang, previousQuestion?: string): string {
  const t = dict[lang];
  const fr = lang === 'fr';
  const q = norm(question).trim();
  const words = tokenize(question);

  // Politesse
  if (/^(salut|bonjour|bonsoir|coucou|hello|hi|hey|yo)\b/.test(q) && words.length <= 2) {
    return t.chat.welcome;
  }
  if (/\b(merci|thanks|thank you|thx)\b/.test(q) && words.length <= 3) {
    return fr
      ? "Avec plaisir ! N'hésitez pas si vous avez d'autres questions sur Mamane."
      : 'My pleasure! Feel free to ask anything else about Mamane.';
  }

  // Questions de présentation : "qui est...", "que fait-il ?", "what does he do ?"
  if (
    /\b(qui (est|es)|who (is|are)|presente|presentation|introduce|parle moi de lui|tell me about (him|mamane)|about him|que fait|qu est ce qu il fait|what does .*\bdo\b|what do you do|what is his job|metier|profession)\b/.test(
      q,
    )
  ) {
    return chunks.find((c) => c.id === 'identity')!.text[lang];
  }

  let picked = pick(question);
  // Question trop courte ou sans résultat : on la rattache à la précédente.
  if (picked.length === 0 && previousQuestion) {
    picked = pick(`${previousQuestion} ${question}`);
  }

  if (picked.length === 0) {
    return fr
      ? "Je n'ai pas cette information. Je peux répondre sur le parcours de Mamane, ses compétences, ses projets, ses certifications ou comment le contacter."
      : "I don't have that information. I can answer about Mamane's background, skills, projects, certifications, or how to contact him.";
  }

  if (picked.length === 1) return picked[0].chunk.text[lang];
  return picked.map((p) => `• ${p.chunk.text[lang]}`).join('\n');
}
