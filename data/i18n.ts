// ============================================================
// TEXTES DU SITE (français et anglais)
// Modifiez les textes ici. Les deux langues ont exactement la même structure.
// ============================================================

export const locales = ['fr', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'fr';

export function isLang(value: string): value is Lang {
  return (locales as readonly string[]).includes(value);
}

const fr = {
  meta: {
    title: 'Mamane Argi · AI & Full-Stack Developer',
    description:
      'Développeur full-stack et IA (Django, FastAPI, Next.js, RAG, agents, vision par ordinateur) basé à Dakar.',
  },
  nav: {
    projects: 'Projets',
    experience: 'Parcours',
    skills: 'Compétences',
    certifications: 'Certifications',
    contact: 'Me contacter',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    switchLang: 'Passer le site en anglais',
  },
  hero: {
    available: 'Dakar, Sénégal · Disponible pour de nouveaux projets',
    title: 'AI & Full-Stack Developer',
    sub: 'Je conçois des applications complètes : backend, interfaces et intelligence artificielle intégrée.',
    web: ['Django', 'FastAPI', 'Next.js'],
    ai: ['RAG', 'Agents', 'Computer Vision'],
    ctaProjects: 'Voir mes projets',
    ctaCv: 'Télécharger mon CV',
    ctaContact: 'Me contacter',
  },
  chat: {
    title: 'Posez une question sur son parcours',
    badge: 'Assistant IA',
    welcome:
      "Bonjour ! Je suis l'assistant du portfolio de Mamane. Posez-moi vos questions sur son parcours, ses projets ou ses compétences.",
    placeholder: 'Écrivez votre question...',
    inputLabel: 'Votre question',
    send: 'Envoyer',
    thinking: 'Réflexion…',
    error: 'Désolé, une erreur est survenue. Réessayez dans un instant.',
    suggestions: [
      'Quelle est sa spécialité ?',
      "Où a-t-il travaillé sur l'IA ?",
      'Quels sont ses projets ?',
    ],
  },
  about: {
    eyebrow: 'À propos',
    title: "Du backend à l'IA, jusqu'au déploiement.",
    paragraphs: [
      "Je conçois des applications web complètes avec Django, FastAPI et Next.js, et j'y intègre de l'IA : RAG, agents et vision par ordinateur. Pendant deux ans chez Likita Care, j'ai mené des projets de machine learning, de la préparation des données au déploiement. J'ai aussi enseigné le machine learning à l'African Development University, et je prépare un MBA AI & Big Data à l'ISM, à Dakar.",
    ],
    photoAlt: 'Portrait de Mamane Argi',
    photoMissing: 'Ajoutez votre photo dans public/photo.jpg',
    photoHint: 'Format portrait 4:5, par exemple 800 × 1000 px',
  },
  projects: {
    eyebrow: 'Projets',
    title: "Des projets qui vont jusqu'à la décision ou au produit.",
    filterLabel: 'Filtrer les projets',
    filters: { all: 'Tous', fullstack: 'Full-Stack', ai: 'IA', data: 'Data' },
    visit: 'Voir le projet',
  },
  experience: {
    eyebrow: 'Parcours',
    title: "De Niamey à Dakar, de la data à l'IA en production.",
    items: [
      {
        period: 'Juin 2024 – mai 2026',
        title: 'AI & Full Stack Developer',
        org: 'Likita Care',
        text: 'Machine learning et vision par ordinateur, de la préparation des données au déploiement. Modèles PyTorch, APIs d’inférence FastAPI, analyses Power BI.',
      },
      {
        period: 'Oct. 2025 – juil. 2027',
        title: 'MBA AI & Big Data',
        org: 'Groupe ISM',
        text: 'Formation en cours, à Dakar.',
      },
      {
        period: 'Janv. – juin 2025',
        title: 'Adjunct Teacher, Advanced Machine Learning',
        org: 'African Development University',
        text: 'Cours de machine learning (régression, classification, clustering) et de programmation Python.',
      },
      {
        period: 'Août – nov. 2023',
        title: 'Junior Developer',
        org: 'Yayi Make',
        text: 'Fonctionnalités data et ML, prétraitement des données, intégration backend. Next.js, JavaScript.',
      },
      {
        period: 'Févr. 2023 – mai 2024',
        title: 'Data scientist, IA',
        org: 'Qwasar Silicon Valley',
        text: 'Science des données et programmation en C.',
      },
    ],
  },
  skills: {
    eyebrow: 'Compétences',
    title: "Du backend à l'interface, avec l'IA intégrée.",
    groups: [
      { title: 'Backend', items: ['Python', 'Django', 'FastAPI', "APIs d'inférence"] },
      { title: 'Frontend', items: ['Next.js', 'JavaScript'] },
      {
        title: 'IA',
        items: ['RAG', 'Bases vectorielles', 'Agents', 'Vision par ordinateur', 'PyTorch'],
      },
      { title: 'Data & automatisation', items: ['Pandas', 'Plotly', 'Power BI'] },
    ],
  },
  certifications: {
    eyebrow: 'Certifications',
    title: 'Des compétences validées par des certifications.',
    idLabel: 'ID',
    viewCredential: 'Voir le diplôme',
    viewAll: 'Voir toutes mes certifications sur LinkedIn',
  },
  contact: {
    title: "Un projet web ou d'IA ?",
    text: "Parlons de ce que vous voulez construire, ou posez d'abord votre question à l'assistant.",
    email: 'Écrire un e-mail',
  },
  footer: { location: 'Dakar, Sénégal' },
};

export type Dict = typeof fr;

const en: Dict = {
  meta: {
    title: 'Mamane Argi · AI & Full-Stack Developer',
    description:
      'Full-stack and AI developer (Django, FastAPI, Next.js, RAG, agents, computer vision) based in Dakar.',
  },
  nav: {
    projects: 'Projects',
    experience: 'Experience',
    skills: 'Skills',
    certifications: 'Certifications',
    contact: 'Contact me',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLang: 'Switch the site to French',
  },
  hero: {
    available: 'Dakar, Senegal · Available for new projects',
    title: 'AI & Full-Stack Developer',
    sub: 'I design complete applications: backend, interfaces and built-in artificial intelligence.',
    web: ['Django', 'FastAPI', 'Next.js'],
    ai: ['RAG', 'Agents', 'Computer Vision'],
    ctaProjects: 'View my projects',
    ctaCv: 'Download my CV',
    ctaContact: 'Contact me',
  },
  chat: {
    title: 'Ask about his background',
    badge: 'AI assistant',
    welcome:
      "Hello! I'm the assistant on Mamane's portfolio. Ask me anything about his background, projects or skills.",
    placeholder: 'Type your question...',
    inputLabel: 'Your question',
    send: 'Send',
    thinking: 'Thinking…',
    error: 'Sorry, something went wrong. Please try again in a moment.',
    suggestions: [
      "What's his specialty?",
      'Where has he worked on AI?',
      'What are his projects?',
    ],
  },
  about: {
    eyebrow: 'About',
    title: 'From backend to AI, all the way to deployment.',
    paragraphs: [
      "I design complete web applications with Django, FastAPI and Next.js, and build AI into them: RAG, agents and computer vision. For two years at Likita Care, I led machine learning projects, from data preparation to deployment. I also taught machine learning at the African Development University, and I'm pursuing an MBA in AI & Big Data at ISM in Dakar.",
    ],
    photoAlt: 'Portrait of Mamane Argi',
    photoMissing: 'Add your photo at public/photo.jpg',
    photoHint: 'Portrait format 4:5, for example 800 × 1000 px',
  },
  projects: {
    eyebrow: 'Projects',
    title: 'Projects that end in a decision or a product.',
    filterLabel: 'Filter projects',
    filters: { all: 'All', fullstack: 'Full-Stack', ai: 'AI', data: 'Data' },
    visit: 'View project',
  },
  experience: {
    eyebrow: 'Experience',
    title: 'From Niamey to Dakar, from data to production AI.',
    items: [
      {
        period: 'Jun 2024 – May 2026',
        title: 'AI & Full-Stack Developer',
        org: 'Likita Care',
        text: 'Machine learning and computer vision, from data preparation to deployment. PyTorch models, FastAPI inference APIs, Power BI analysis.',
      },
      {
        period: 'Oct 2025 – Jul 2027',
        title: 'MBA in AI & Big Data',
        org: 'Groupe ISM',
        text: 'Ongoing, in Dakar.',
      },
      {
        period: 'Jan – Jun 2025',
        title: 'Adjunct Teacher, Advanced Machine Learning',
        org: 'African Development University',
        text: 'Machine learning course (regression, classification, clustering) and Python programming.',
      },
      {
        period: 'Aug – Nov 2023',
        title: 'Junior Developer',
        org: 'Yayi Make',
        text: 'Data and ML features, data preprocessing, backend integration. Next.js, JavaScript.',
      },
      {
        period: 'Feb 2023 – May 2024',
        title: 'Data scientist, AI',
        org: 'Qwasar Silicon Valley',
        text: 'Data science and C programming.',
      },
    ],
  },
  skills: {
    eyebrow: 'Skills',
    title: 'From backend to interface, with AI built in.',
    groups: [
      { title: 'Backend', items: ['Python', 'Django', 'FastAPI', 'Inference APIs'] },
      { title: 'Frontend', items: ['Next.js', 'JavaScript'] },
      {
        title: 'AI',
        items: ['RAG', 'Vector databases', 'Agents', 'Computer vision', 'PyTorch'],
      },
      { title: 'Data & automation', items: ['Pandas', 'Plotly', 'Power BI'] },
    ],
  },
  certifications: {
    eyebrow: 'Certifications',
    title: 'Skills backed by certifications.',
    idLabel: 'ID',
    viewCredential: 'View credential',
    viewAll: 'See all my certifications on LinkedIn',
  },
  contact: {
    title: 'A web or AI project?',
    text: "Let's talk about what you want to build, or ask the assistant first.",
    email: 'Send an email',
  },
  footer: { location: 'Dakar, Senegal' },
};

export const dict: Record<Lang, Dict> = { fr, en };
