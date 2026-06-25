/* Stats band, About, Skills, Journey (experience + education) */

function Stats(){
  const cells = [
    ["Licence", "en Intelligence Artificielle"],
    ["Master", "en cours · Dakar"],
    ["12+", "projets réalisés"],
    ["15+", "technologies maîtrisées"],
  ];
  return (
    <section className="stats-band" data-screen-label="Chiffres">
      <div className="wrap">
        <Reveal className="stats-grid">
          {cells.map(([v, k]) => (
            <div className="stat-cell" key={v + k}>
              <div className="stat-v">{v}</div>
              <div className="stat-k">{k}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function About(){
  return (
    <section className="section-pad" id="apropos" data-screen-label="À propos">
      <div className="wrap">
        <Reveal className="about-grid">
          <div>
            <span className="eyebrow">À propos de moi</span>
            <h2 className="about-h">La donnée au service<br/>de la décision.</h2>
          </div>
          <div className="about-body">
            <p>Étudiant en master spécialisé en <b>Intelligence Artificielle &amp; Data Analytics</b> à Dakar, après une licence en Intelligence Artificielle. Je m'intéresse à l'<b>analyse de données</b>, à la <b>Business Intelligence</b> et à l'<b>IA appliquée</b>.</p>
            <p>Mon objectif : aider les organisations à prendre des décisions éclairées grâce à des solutions basées sur les données.</p>
            <div className="domain-row">
              <span className="domain">Santé</span>
              <span className="domain">Agriculture</span>
              <span className="domain">Environnement</span>
              <span className="domain">Business</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const SKILL_CATS = [
  ["01", "Data Analytics", ["Python","SQL","Pandas","NumPy"]],
  ["02", "Business Intelligence", ["Power BI","Tableau","Excel"]],
  ["03", "Machine Learning", ["Scikit-Learn","PyTorch","PyTorch Lightning"]],
  ["04", "Data Visualization", ["Matplotlib","Plotly","Seaborn"]],
  ["05", "Outils", ["Git","GitHub","FastAPI","W&B"]],
];

function Skills(){
  return (
    <section className="section-pad" id="skills" style={{paddingTop:0}} data-screen-label="Skills">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">Compétences</span>
          <h2>De la donnée brute à la décision.</h2>
          <p>Les outils que je mobilise sur tout le pipeline — analyse, visualisation et machine learning.</p>
        </Reveal>
        <Reveal className="skill-grid">
          {SKILL_CATS.map(([num, title, tags]) => (
            <div className="skill-cat" key={num}>
              <div className="skill-cat-h"><span className="num">{num}</span>{title}</div>
              <div className="skill-tags">
                {tags.map((t) => <span className="stag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="lang-row">
          <span className="lang-label">Langues</span>
          <span className="lang"><b>Français</b> natif</span>
          <span className="lang-sep">·</span>
          <span className="lang"><b>Anglais</b> professionnel</span>
          <span className="lang-sep">·</span>
          <span className="lang"><b>Haoussa</b> natif</span>
        </Reveal>
      </div>
    </section>
  );
}

const TIMELINE = [
  {
    when: "Août 2024 — Mai 2026",
    role: "Data Scientist & Responsable Unité Data",
    org: "Yayi Make", loc: "◇ Niamey, Niger",
    bullets: [
      "Conception et déploiement de modèles ML pour des applications réelles.",
      "Gestion du pipeline complet : collecte, prétraitement, entraînement, évaluation, déploiement.",
      "Transfer learning & CNN (VGG, ResNet) sur des tâches de vision par ordinateur.",
    ],
  },
  {
    when: "Janv. — Juin 2025",
    role: "Chargé de cours — Machine Learning",
    org: "African Development University", loc: "◇ Niamey",
    bullets: [
      "Cours avancé de ML — méthodes supervisées, non supervisées & deep learning.",
      "Conception de travaux pratiques sur données réelles.",
    ],
  },
  {
    when: "Août — Déc. 2023",
    role: "Développeur ML Junior",
    org: "Yayi Make", loc: "◇ Niamey",
    bullets: [
      "Implémentation de modèles ML en production et expérimentations sur données réelles.",
      "Contribution aux rapports de performance & améliorations basées sur les données.",
    ],
  },
];

const CERTS = [
  ["Associate Data Scientist", "· Qwasar"],
  ["Machine Learning", "· IBM"],
  ["Computer Vision", "· Google Cloud"],
  ["NLP", "· UC Irvine"],
  ["AWS Cloud Essentials", "· AWS"],
  ["Agile PM", "· Google"],
];

function Journey(){
  return (
    <section className="section-pad" id="journey" style={{paddingTop:0}} data-screen-label="Journey">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">Expérience &amp; formation</span>
          <h2>Mon parcours.</h2>
        </Reveal>
        <div className="two-col">
          <Reveal className="timeline">
            {TIMELINE.map((it, i) => (
              <div className="tl-item" key={i}>
                <span className="tl-dot"></span>
                <div className="tl-when">{it.when}</div>
                <div className="tl-role">{it.role}</div>
                <div className="tl-org">{it.org} <span className="loc">{it.loc}</span></div>
                <ul className="tl-bullets">
                  {it.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </Reveal>
          <Reveal>
            <div className="side-h">Formation</div>
            <div className="edu-item">
              <div className="deg">Master — IA &amp; Big Data</div>
              <div className="sch"><span>Institut Supérieur de Management</span><span className="yr">Dakar · prévu 2027</span></div>
              <div className="conc">Concentration : Intelligence Artificielle &amp; Big Data</div>
            </div>
            <div className="edu-item">
              <div className="deg">Licence — Intelligence Artificielle</div>
              <div className="sch"><span>African Development University</span><span className="yr">Niamey · 2021–2024</span></div>
              <div className="conc">Concentration : Science des données &amp; Vision par ordinateur</div>
            </div>
            <div className="side-h" style={{marginTop:34}}>Certifications · 15+</div>
            <div className="cert-cloud">
              {CERTS.map(([name, by]) => (
                <span className="cert" key={name}>{name} <span className="by">{by}</span></span>
              ))}
              <span className="cert-more">+ 9 autres</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Stats, About, Skills, Journey });
