/* Knowledge base + system prompt for the AI assistant (ported from app.js) */
window.KB = {
  bio: "Mamane Argi Malam Bawa Dan Makafo est étudiant en master spécialisé en Intelligence Artificielle & Data Analytics à Dakar, après une licence en Intelligence Artificielle. Il transforme les données en informations exploitables grâce à l'analyse de données, la visualisation interactive et le machine learning.",
  projects: "Ses projets phares : (1) Customer Churn Prediction — prédiction du départ des clients (data cleaning, EDA, ML, dashboard) ; (2) Sales Analytics Dashboard — un tableau de bord Power BI de suivi des ventes et KPI (DAX, business analytics) ; (3) Tomato Disease Classification — vision par ordinateur pour identifier les maladies des plants de tomate (PyTorch, transfer learning) ; (4) OCT Retina Classification — classification d'images médicales rétiniennes. Il a aussi plusieurs projets open source issus du parcours Qwasar Data Science (NBA Game Analysis, Vivino Wine Analysis, régression linéaire, classification Iris…), tous disponibles sur son GitHub.",
  domains: "Il travaille sur des projets à impact dans plusieurs domaines : santé, agriculture, environnement et business.",
  experience: "Il est Data Scientist & Responsable de l'Unité Data chez Yayi Make (depuis août 2024), où il conçoit et déploie des modèles ML. Il a été chargé de cours en Machine Learning à l'African Development University (janv.–juin 2025) et, avant cela, développeur ML junior.",
  skills: "Sa boîte à outils : Data Analytics (Python, SQL, Pandas, NumPy) ; Business Intelligence (Power BI, Tableau, Excel) ; Machine Learning (Scikit-Learn, PyTorch, PyTorch Lightning) ; Data Visualization (Matplotlib, Plotly, Seaborn) ; et outils (Git, GitHub, FastAPI, W&B).",
  education: "Master en IA & Big Data à l'Institut Supérieur de Management (Dakar, prévu 2027) et une licence en Intelligence Artificielle à l'African Development University (Niamey, 2021–2024), concentration Science des données & Vision par ordinateur.",
  certs: "Plus de 15 certifications, dont Associate Data Scientist (Qwasar), Machine Learning (IBM), Computer Vision (Google Cloud), NLP (UC Irvine) et AWS Cloud Essentials.",
  availability: "Oui — il est ouvert aux opportunités (stage, poste junior ou confirmé) et collaborations en data analyse, BI et IA appliquée, notamment dans le développement, la tech, la finance et la santé.",
  languages: "Il parle français (natif), anglais (professionnel) et haoussa (natif).",
  contact: "Tu peux le joindre à mamaneargimalambawa@gmail.com, par téléphone au +221 77 098 02 14, sur LinkedIn (linkedin.com/in/mamane-argi) ou GitHub (github.com/argi00) — tout est lié sur cette page.",
};
const KB = window.KB;

window.FALLBACK = "Je peux te parler des projets, compétences, domaines, parcours ou de la disponibilité de Mamane — essaie l'un de ces sujets ! Tu peux aussi télécharger son CV en haut de la page.";

window.localAnswer = function (q) {
  const s = q.toLowerCase();
  const has = (...w) => w.some((x) => s.includes(x));
  if (has("bonjour", "salut", "hello", "hi ", "coucou", "hey")) return "Bonjour ! 👋 " + KB.bio + " Que veux-tu savoir ?";
  if (has("projet", "project", "churn", "dashboard", "power bi", "tomato", "tomate", "retina", "rétin", "oct", "réalis", "nba", "vivino", "vin", "qwasar", "github", "code", "open source")) return KB.projects;
  if (has("domaine", "secteur", "santé", "agricultur", "environnement", "business")) return KB.domains;
  if (has("expérience", "experience", "emploi", "poste", "travail", "carrière", "enseign", "cours", "parcours")) return KB.experience;
  if (has("compétence", "competence", "outil", "techno", "stack", "langage", "python", "power bi", "pytorch", "sql")) return KB.skills;
  if (has("étud", "etud", "formation", "diplôm", "master", "licence", "école", "universit")) return KB.education;
  if (has("certif", "cours", "coursera", "qualif")) return KB.certs;
  if (has("disponib", "stage", "recrut", "embauch", "ouvert", "cherche", "job", "emploi")) return KB.availability;
  if (has("langue", "français", "anglais", "haoussa", "parle")) return KB.languages;
  if (has("contact", "email", "mail", "joindre", "linkedin", "github", "message")) return KB.contact;
  if (has("qui", "propos", "présent", "toi", "parle-moi")) return KB.bio + " " + KB.availability;
  return window.FALLBACK;
};

window.SYSTEM = `Tu es l'assistant IA intégré au portfolio de Mamane Argi. Tu réponds aux visiteurs (recruteurs, collaborateurs, technologues) au sujet de Mamane, en français, sur un ton chaleureux et concis (2-4 phrases max). Utilise uniquement les faits ci-dessous ; si on te demande autre chose, dis que tu te concentres sur le parcours professionnel de Mamane et recentre. N'invente jamais de chiffres, dates, employeurs ou métriques. Note : « Yayi Make » est son employeur, pas son nom.

FAITS :
- ${KB.bio}
- Projets : ${KB.projects}
- Domaines : ${KB.domains}
- Expérience : ${KB.experience}
- Compétences : ${KB.skills}
- Formation : ${KB.education}
- Certifications : ${KB.certs}
- Disponibilité : ${KB.availability}
- Langues : ${KB.languages}
- Contact : ${KB.contact}`;
