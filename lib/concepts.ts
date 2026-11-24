// ============================================================
// GROUPES DE SENS (le "dictionnaire de synonymes" du chatbot de secours)
//
// Chaque groupe rassemble des mots qui disent la même chose, en français,
// en anglais et en langage courant. Le chatbot ne compare plus les mots eux-mêmes,
// mais leur groupe : "bosser", "boulot" et "worked" appartiennent tous au groupe
// "work", donc ils trouvent les mêmes fiches.
//
// POUR L'AMÉLIORER : si un visiteur écrit un mot que le chatbot ne comprend pas,
// ajoutez ce mot dans le bon groupe ci-dessous (sans accent, en minuscules).
// Un mot peut figurer dans plusieurs groupes si son sens est ambigu.
// ============================================================

export const CONCEPTS: Record<string, string[]> = {
  // Expérience professionnelle
  work: [
    'travail', 'travaille', 'travailler', 'travaillait', 'travaille', 'bosse', 'bosser', 'boulot', 'taf',
    'job', 'jobs', 'emploi', 'emplois', 'poste', 'postes', 'work', 'worked', 'working', 'works',
    'employ', 'employed', 'career', 'carriere', 'experience', 'experiences', 'parcours', 'professionnel',
    'professional', 'occupation', 'role', 'position', 'stage', 'stages', 'stagiaire', 'intern', 'internship',
    'employeur', 'employer', 'entreprise', 'entreprises', 'societe', 'societes', 'boite', 'boites',
    'company', 'companies', 'firm', 'startup', 'start-up', 'organisation', 'organization', 'client', 'clients',
    'history', 'historique', 'cv', 'resume',
  ],

  // Études, formation
  study: [
    'etude', 'etudes', 'etudie', 'etudier', 'etudiant', 'etudiante', 'student', 'study', 'studies', 'studied', 'studying',
    'formation', 'formations', 'education', 'ecole', 'ecoles', 'school', 'universite', 'university', 'fac', 'college',
    'cursus', 'diplome', 'diplomes', 'diplomee', 'degree', 'degrees', 'master', 'mba', 'licence', 'bachelor',
    'niveau', 'level', 'scolarite', 'academique', 'academic', 'graduate', 'graduated', 'apprend', 'apprendre', 'learn',
    'learned', 'learning', 'bootcamp', 'campus', 'promotion',
  ],

  // Enseignement
  teach: [
    'enseigne', 'enseigner', 'enseignant', 'enseignement', 'professeur', 'prof', 'teacher', 'teach', 'teaching', 'taught',
    'cours', 'course', 'courses', 'lecture', 'lectures', 'formateur', 'trainer', 'instructor', 'pedagogie', 'transmettre',
    'mentor', 'mentoring', 'eleves', 'students', 'etudiants',
  ],

  // Compétences
  skill: [
    'competence', 'competences', 'skill', 'skills', 'savoir', 'sait', 'connait', 'connaitre', 'connaissance', 'connaissances',
    'maitrise', 'maitriser', 'maitrises', 'know', 'knows', 'knowledge', 'expertise', 'expert', 'capable', 'capacite', 'capacites',
    'ability', 'abilities', 'talent', 'talents', 'forts', 'forte', 'strengths', 'strength', 'aptitude', 'aptitudes', 'niveau-technique',
    'speciality', 'specialty', 'specialite', 'specialise', 'specialize', 'specialized', 'domaine', 'field', 'fort',
  ],

  // Technologies, outils
  tech: [
    'technologie', 'technologies', 'techno', 'technos', 'technology', 'stack', 'outil', 'outils', 'tool', 'tools',
    'langage', 'langages', 'language', 'languages', 'framework', 'frameworks', 'librairie', 'librairies', 'library', 'libraries',
    'bibliotheque', 'bibliotheques', 'logiciel', 'logiciels', 'software', 'programmation', 'programming', 'programmer',
    'coder', 'coding', 'code', 'developper', 'develop', 'utilise', 'utiliser', 'utilises', 'use', 'uses', 'using', 'used',
    'employe', 'environnement', 'environment',
  ],

  // Backend
  backend: [
    'backend', 'back-end', 'serveur', 'serveurs', 'server', 'servers', 'api', 'apis', 'django', 'fastapi', 'flask', 'python',
    'rest', 'restful', 'microservice', 'microservices', 'endpoint', 'endpoints', 'base-de-donnees', 'database', 'databases',
    'postgres', 'postgresql', 'sql',
  ],

  // Frontend
  frontend: [
    'frontend', 'front-end', 'front', 'interface', 'interfaces', 'ui', 'ux', 'react', 'nextjs', 'next', 'javascript', 'typescript',
    'web', 'site', 'sites', 'page', 'pages', 'client-side', 'navigateur', 'browser', 'design', 'responsive',
  ],

  // Intelligence artificielle
  ai: [
    'ia', 'ai', 'intelligence', 'artificielle', 'artificial', 'llm', 'llms', 'gpt', 'chatgpt', 'claude', 'rag', 'agent', 'agents',
    'agentique', 'agentic', 'generative', 'generatif', 'genai', 'nlp', 'modele', 'modeles', 'model', 'models', 'pytorch',
    'deep', 'neural', 'neurones', 'reseau-de-neurones', 'apprentissage', 'ml', 'machine', 'embedding', 'embeddings',
    'vectorielle', 'vectorielles', 'vectoriel', 'vector', 'retriever', 'retrievers', 'prediction', 'predictif', 'predictive',
  ],

  // Vision par ordinateur
  vision: [
    'vision', 'ordinateur', 'computer', 'image', 'images', 'imagerie', 'photo', 'photos', 'picture', 'pictures',
    'satellite', 'satellites', 'detection', 'classification', 'visuel', 'visual', 'cv-vision', 'medical-imaging',
  ],

  // Chatbot, assistant
  chatbot: [
    'chatbot', 'chatbots', 'bot', 'bots', 'assistant', 'assistants', 'conversationnel', 'conversational', 'dialogue',
    'discuter', 'chat', 'robot', 'agent-conversationnel',
  ],

  // Data
  data: [
    'data', 'donnee', 'donnees', 'analyse', 'analyses', 'analyser', 'analyste', 'analyst', 'analytics', 'analytique',
    'statistique', 'statistiques', 'statistics', 'visualisation', 'dashboard', 'dashboards', 'tableau', 'pandas', 'plotly',
    'power', 'bi', 'datascience', 'scientist', 'jeu-de-donnees', 'dataset', 'datasets',
  ],

  // Automatisation
  automation: [
    'automatisation', 'automatiser', 'automatise', 'automation', 'automate', 'automated', 'workflow', 'workflows',
    'script', 'scripts', 'scraping', 'cron', 'pipeline', 'pipelines', 'n8n', 'zapier', 'make-com', 'processus', 'process',
  ],

  // Projets, réalisations
  project: [
    'projet', 'projets', 'project', 'projects', 'realisation', 'realisations', 'realise', 'realises', 'built', 'build',
    'construit', 'construire', 'creation', 'creations', 'cree', 'created', 'create', 'made', 'fabrique', 'travaux', 'demo',
    'demos', 'application', 'applications', 'app', 'apps', 'reference', 'references', 'portfolio', 'accompli',
    'accomplishments', 'achievements', 'achievement', 'bati', 'batir', 'batis', 'developpe', 'developped',
  ],

  // Certifications
  cert: [
    'certification', 'certifications', 'certif', 'certifs', 'certificat', 'certificats', 'certificate', 'certificates',
    'certified', 'certifie', 'credential', 'credentials', 'badge', 'badges', 'attestation', 'attestations', 'ibm', 'coursera',
    'accreditation', 'qualification', 'qualifications',
  ],

  // Contact
  contact: [
    'contact', 'contacter', 'contacte', 'joindre', 'joignable', 'ecrire', 'ecris', 'email', 'emails', 'mail', 'mails', 'courriel',
    'adresse-mail', 'reach', 'touch', 'message', 'messages', 'appeler', 'telephone', 'tel', 'numero', 'linkedin', 'github',
    'reseau', 'reseaux', 'social', 'parler', 'speak', 'talk', 'discussion', 'rdv', 'rendez-vous', 'meeting', 'call',
  ],

  // Embauche, disponibilité
  hire: [
    'recruter', 'recrute', 'recrutement', 'recruit', 'recruiting', 'embaucher', 'embauche', 'embaucher', 'hire', 'hiring', 'hired',
    'disponible', 'disponibilite', 'dispo', 'available', 'availability', 'libre', 'free', 'open', 'ouvert', 'freelance',
    'freelancer', 'mission', 'missions', 'pigiste', 'consultant', 'consulting', 'collaborer', 'collaboration', 'collaborate',
    'partenariat', 'partner', 'engager', 'engage', 'proposition', 'opportunite', 'opportunity', 'opportunities', 'cdi', 'cdd',
    'alternance', 'apprenticeship', 'salaire', 'salary', 'tarif', 'tarifs', 'rate', 'prix', 'price',
  ],

  // Lieu
  location: [
    'habite', 'habiter', 'habites', 'habitez', 'vit', 'vivre', 'vivez', 'vivant', 'live', 'lives', 'living', 'reside', 'reside',
    'situe', 'situee', 'situated', 'localise', 'localisation', 'location', 'located', 'locate', 'base', 'basee', 'based',
    'ville', 'villes', 'city', 'pays', 'country', 'dakar', 'senegal', 'niger', 'niamey', 'afrique', 'africa', 'region', 'lieu',
    'endroit', 'place', 'remote', 'teletravail', 'distance', 'fuseau', 'timezone',
  ],

  // Présentation
  identity: [
    'presentation', 'presenter', 'presente', 'introduce', 'introduction', 'profil', 'profile', 'personne', 'person',
    'biographie', 'bio', 'apropos', 'propos', 'about', 'nom', 'name', 'prenom',
  ],

  // Santé
  health: [
    'sante', 'health', 'healthcare', 'medical', 'medicale', 'medecine', 'medicine', 'hopital', 'hopitaux', 'hospital',
    'clinique', 'patient', 'patients', 'soins', 'maladie', 'disease',
  ],

  // Alimentation, faim
  food: [
    'faim', 'hunger', 'alimentaire', 'alimentation', 'nourriture', 'food', 'fao', 'nutrition', 'famine', 'malnutrition',
    'sous-nutrition', 'agriculture', 'agricole', 'agricultural', 'recolte', 'harvest',
  ],

  // Eau
  water: ['eau', 'water', 'potable', 'drinking', 'wash', 'assainissement', 'sanitation', 'oms', 'ong', 'ngo', 'tanzanie', 'tanzania'],

  // Salutations / remerciements sont gérés à part dans fallback.ts
};
