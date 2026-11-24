# Portfolio de Mamane Argi (Next.js)

Portfolio bilingue (français / anglais), responsive, avec un chatbot qui répond sur votre parcours.

- **Next.js 15** (App Router) + **React 19** + **TypeScript**, aucune autre dépendance
- Pages `/fr` et `/en` (la racine `/` redirige selon la langue du navigateur)
- Projets, certifications et textes gérés dans des fichiers simples (`data/`)
- Chatbot : Claude (clé API), ou un modèle local gratuit (Ollama), ou un mode de secours intégré sans clé

## 1. Lancer en local

```bash
npm install
cp .env.example .env.local     # puis renseignez ANTHROPIC_API_KEY (voir plus bas)
npm run dev
```

Ouvrez http://localhost:3000

Pour tester la version de production : `npm run build` puis `npm start`.

## 2. Ce que vous devez personnaliser

| Quoi | Où |
| --- | --- |
| E-mail, GitHub, LinkedIn | `data/site.ts` |
| Votre photo | déposez-la dans `public/photo.jpg` (ou `photo.jpeg`, `photo.png`, `photo.webp`) |
| Votre CV | déposez-le dans `public/cv.pdf` (ou `cv-fr.pdf` et `cv-en.pdf`). Le bouton « Télécharger mon CV » apparaît tout seul |
| Textes (titre, à propos, parcours, compétences) | `data/i18n.ts` (français et anglais) |
| Certifications | `data/certifications.ts` |
| Couleur principale | variable `--accent` en haut de `app/globals.css` |

Tant que `public/photo.jpg` n'existe pas, un cadre vide s'affiche à la place.
Si `data/site.ts` ne contient pas d'e-mail, le bouton e-mail est masqué.

## 3. Ajouter un projet (avec lien d'accès et image)

1. Déposez l'image de présentation dans `public/projects/` (par exemple `mon-projet.png`, idéalement 1280 × 720 px).
2. Ouvrez `data/projects.ts` et copiez le bloc « MODÈLE À COPIER » en bas du fichier dans la liste :

```ts
{
  slug: 'mon-projet',                  // identifiant unique, sans espace
  categories: ['fullstack'],           // 'fullstack', 'ai' et/ou 'data' (filtres)
  image: '/projects/mon-projet.png',   // ou une adresse https://...
  link: 'https://mon-projet.com',      // lien d'accès (facultatif)
  tags: ['Django', 'Next.js'],
  title: { fr: 'Titre du projet', en: 'Project title' },
  description: {
    fr: 'Problème résolu, votre rôle, résultat.',
    en: 'Problem solved, your role, result.',
  },
},
```

3. Enregistrez. Le projet apparaît dans les deux langues, dans les bons filtres, et le chatbot le connaît.

Sans `image`, une vignette de remplacement avec les initiales du projet est affichée. Sans `link`, le lien est masqué.

## 4. Le chatbot

Le navigateur envoie la question à `/api/chat` (fichier `app/api/chat/route.ts`). **Les clés restent côté serveur** et ne sont jamais exposées. Le serveur essaie, dans l'ordre :

1. **Claude** (`ANTHROPIC_API_KEY` défini) : le plus intelligent. Il comprend toutes les formulations, suit la conversation et répond uniquement à partir de vos données. Modèle par défaut : `claude-haiku-5-5` (changez-le avec `ANTHROPIC_MODEL`).
2. **Un modèle local gratuit via Ollama** (`OLLAMA_MODEL` défini) : pour le développement sur votre ordinateur.
   - Installez Ollama (https://ollama.com), puis `ollama pull llama3.2` (ou un autre modèle, plus il est gros mieux il comprend).
   - Dans `.env.local` : `OLLAMA_MODEL=llama3.2` (et `OLLAMA_URL` si Ollama n'est pas sur `http://localhost:11434`).
   - Le contexte complet (parcours, projets, certifications) est envoyé au modèle avec une fenêtre de 8192 tokens. Attention : un serveur en ligne (Vercel) ne peut pas joindre l'Ollama de votre ordinateur.
3. **Le mode de secours intégré** (`lib/fallback.ts`), sans clé ni modèle : une recherche par **groupes de sens** (`lib/concepts.ts` : « bosser », « boulot », « job », « worked » forment un même groupe « travail »), qui tolère aussi les formes proches, les fautes de frappe et les questions de relance (« et en 2023 ? »). Si un visiteur emploie un mot non compris, ajoutez-le simplement dans le bon groupe de `lib/concepts.ts`. Elle ne raisonne pas comme un vrai modèle : pour des questions ouvertes ou très inattendues, utilisez l'option 1 ou 2.

Si une option échoue (clé invalide, Ollama éteint), le serveur passe automatiquement à la suivante : le chatbot ne reste jamais muet. Le terminal affiche alors `[chat] ... failed`.

- Protections : messages limités à 500 caractères, 8 derniers messages seulement, 30 requêtes par 10 minutes et par adresse IP (réglable avec `CHAT_RATE_LIMIT`), et consigne de ne parler que de vous.
- Les faits connus de l'assistant viennent des fichiers `data/` (`lib/knowledge.ts`) : un projet ou une certification ajouté(e) est connu(e) automatiquement.

Obtenir une clé : https://console.anthropic.com (section API keys). Attention : l'usage de l'API est facturé ; fixez une limite de dépense dans la console.

## 5. Déployer sur Vercel (le plus simple)

1. Mettez le dossier sur GitHub (`git init`, `git add .`, `git commit`, puis poussez sur un dépôt).
2. Sur https://vercel.com : **Add New > Project**, choisissez le dépôt. Les réglages Next.js sont détectés automatiquement.
3. Avant de lancer le déploiement, ajoutez dans **Environment Variables** : `ANTHROPIC_API_KEY` (et éventuellement `ANTHROPIC_MODEL`).
4. Cliquez sur **Deploy**.
5. Pour utiliser `argi.space` : **Settings > Domains > Add**, puis suivez les instructions DNS affichées.

Fonctionne aussi sur tout hébergeur Node.js : `npm run build` puis `npm start`.

## 6. Structure du projet

```
app/
  [lang]/layout.tsx     langue, métadonnées, polices
  [lang]/page.tsx       assemble la page
  api/chat/route.ts     chatbot (serveur)
  globals.css           tous les styles
components/             Header, Hero, ChatWidget, Projects, Sections...
data/                   site.ts, projects.ts, certifications.ts, i18n.ts
lib/                    knowledge.ts (faits du chatbot), fallback.ts, concepts.ts (groupes de sens), files.ts
middleware.ts           redirection / vers /fr ou /en
public/                 photo.jpg, cv.pdf, projects/
```
