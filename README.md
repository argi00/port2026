# Portfolio — Mamane Argi

Site portfolio personnel (Data Analyst & IA), en React, compilé dans un seul fichier autonome.

## Contenu du dossier

```
.
├── index.html                      ← le site complet (autonome, fonctionne hors-ligne)
├── portfolio/
│   └── Mamane-Argi-CV.pdf          ← le CV téléchargeable (bouton « CV »)
└── .nojekyll                       ← évite que GitHub Pages ignore certains fichiers
```

Tout est inclus dans `index.html` : React, les styles, les polices et les animations.
Aucune connexion internet ni dépendance externe n'est requise pour l'afficher.

## Mise en ligne sur GitHub Pages

### Option A — interface web (la plus simple)
1. Crée un dépôt sur https://github.com/new (ex. `portfolio`, public).
2. Sur la page du dépôt vide, clique **« uploading an existing file »**.
3. Glisse-dépose **tout le contenu de ce dossier** (`index.html`, le dossier `portfolio/`, `.nojekyll`).
4. Commit.
5. *Settings → Pages → Source : `main` / `/root`* → enregistre.
6. Ton site sera en ligne sous une minute à l'adresse :
   `https://<ton-pseudo>.github.io/portfolio/`

### Option B — ligne de commande
```bash
git init
git add .
git commit -m "Mon portfolio"
git branch -M main
git remote add origin https://github.com/<ton-pseudo>/portfolio.git
git push -u origin main
```
Puis active GitHub Pages dans *Settings → Pages*.

## Autres hébergeurs
Fonctionne tel quel sur **Netlify**, **Vercel**, **Cloudflare Pages** ou tout hébergeur statique :
il suffit de glisser-déposer ce dossier.

## Le chatbot
L'assistant IA de la page bascule automatiquement sur sa base de connaissances intégrée
en hébergement statique — il répond donc toujours, même sans modèle IA live connecté.
