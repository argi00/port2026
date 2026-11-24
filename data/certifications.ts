// ============================================================
// VOS CERTIFICATIONS
// Ajoutez un bloc par certification. Renseignez `url` avec le lien du diplôme :
// toute la carte devient alors cliquable.
// ============================================================

export type Certification = {
  issuer: string;
  title: string;
  date: { fr: string; en: string };
  credentialId?: string;
  url?: string;
};

export const certifications: Certification[] = [
  {
    issuer: 'IBM',
    title: 'Advanced RAG with Vector Databases and Retrievers',
    date: { fr: 'Sept. 2026', en: 'Sep 2026' },
    credentialId: 'L5ETHRDR7KHR',
    url: 'https://www.coursera.org/account/accomplishments/verify/L5ETHRDR7KHR',
  },
  {
    issuer: 'IBM',
    title: 'Associate Data Scientist',
    date: { fr: 'Jan 2023', en: 'Jan 2023' },
    credentialId: 'MTM1Mi1tYWxhbS1iYV9tLWp1bC0yMDIxLTMwLWU4OTE=',
    url: 'https://upskill.us.qwasar.io/certificates/MTM1Mi1tYWxhbS1iYV9tLWp1bC0yMDIxLTMwLWU4OTE=',
  },
];
