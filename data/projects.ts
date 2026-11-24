// ============================================================
// VOS PROJETS
//
// Pour ajouter un projet : copiez un bloc ci-dessous (ou le modèle en bas
// du fichier), collez-le dans la liste, puis remplissez les champs.
//
//  - image : une image de présentation. Deux façons de faire :
//      1. Déposez le fichier dans le dossier  public/projects/
//         puis écrivez  '/projects/nom-du-fichier.png'
//      2. Ou collez directement une adresse https://...
//      (facultatif : sans image, une vignette de remplacement s'affiche)
//  - link  : le lien d'accès au projet (site, GitHub, démo...). Facultatif.
//  - categories : 'fullstack', 'ai' et/ou 'data' (sert aux filtres).
//  - Les textes existent en français (fr) et en anglais (en).
//
// Le chatbot lit aussi cette liste : un projet ajouté ici est automatiquement
// connu de l'assistant.
// ============================================================

export type Category = 'fullstack' | 'ai' | 'data';

export type Project = {
  slug: string;
  categories: Category[];
  image?: string;
  link?: string;
  tags: string[];
  title: { fr: string; en: string };
  description: { fr: string; en: string };
};

export const projects: Project[] = [
  {
    slug: 'portfolio-assistant',
    categories: ['fullstack', 'ai'],
    image: '/projects/portfolio-assistant.jpg',
    // Image Unsplash : Glen Carrie — https://unsplash.com/photos/programming-code-on-dark-screen-QJl_FJviaRA
    link: 'https://argi.space',
    tags: ['Chatbot', 'RAG'],
    title: {
      fr: 'Portfolio avec assistant IA',
      en: 'Portfolio with an AI assistant',
    },
    description: {
      fr: "Un mini chatbot qui répond uniquement aux questions sur mon parcours, alimenté par mon CV, mes expériences, mes compétences et mes projets.",
      en: 'A mini chatbot that answers only questions about me, powered by my CV, experience, skills and projects.',
    },
  },
  {
    slug: 'likita-care-ai',
    categories: ['ai'],
    image: '/projects/likita-care-ai.jpg',
    // Image Unsplash : National Cancer Institute — https://unsplash.com/photos/man-usingcomputer-mVV0s8ZvEm4
    tags: ['PyTorch', 'FastAPI', 'Computer Vision'],
    title: {
      fr: 'IA appliquée chez Likita Care',
      en: 'Applied AI at Likita Care',
    },
    description: {
      fr: "Modèles de deep learning (classification d'images, analyse prédictive) et APIs d'inférence, de la préparation des données au déploiement.",
      en: 'Deep learning models (image classification, predictive analytics) and inference APIs, from data preparation to deployment.',
    },
  },
  {
    slug: 'water-access',
    categories: ['data'],
    image: '/projects/water-access.jpg',
    // Image Unsplash : Nishaan Ahmed — https://unsplash.com/photos/a-man-standing-next-to-a-water-pump-oLfKHI0R4c0
    tags: ['Python', 'Pandas', 'Plotly', 'Power BI'],
    title: {
      fr: "Où investir pour l'accès à l'eau potable ?",
      en: 'Where to invest for drinking water access?',
    },
    description: {
      fr: "5 sources OMS et FAO, 194 pays, des scores de priorisation par type d'intervention. Recommandation finale : la Tanzanie pour la création de services d'eau.",
      en: '5 WHO and FAO sources, 194 countries, priority scores for each type of intervention. Final recommendation: Tanzania for creating new water services.',
    },
  },
  {
    slug: 'fao-food-security',
    categories: ['data'],
    image: '/projects/food-security.jpg',
    // Image Unsplash : Goran Jaksic — https://unsplash.com/photos/aerial-view-of-agricultural-fields-with-harvested-crops-lhKMILOsHtQ
    tags: ['Python', 'Data analysis'],
    title: {
      fr: 'La faim est-elle un problème de production ?',
      en: 'Is hunger a production problem?',
    },
    description: {
      fr: "Analyse des données FAO de sécurité alimentaire (année pivot 2017) : la planète produisait assez de calories, mais la répartition et l'usage des ressources posent problème.",
      en: 'Analysis of FAO food security data (reference year 2017): the planet produced enough calories, yet distribution and use of resources remain the problem.',
    },
  },

  // ---------------- MODÈLE À COPIER ----------------
  // {
  //   slug: 'mon-projet',
  //   categories: ['fullstack'],
  //   image: '/projects/mon-projet.png',
  //   link: 'https://mon-projet.com',
  //   tags: ['Django', 'Next.js'],
  //   title: { fr: 'Titre du projet', en: 'Project title' },
  //   description: {
  //     fr: 'Problème résolu, votre rôle, résultat.',
  //     en: 'Problem solved, your role, result.',
  //   },
  // },
];
