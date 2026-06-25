/* Projects grid + animated per-project canvas visualizations */
const { useRef: useRefProj, useEffect: useEffectProj } = React;

const ACCENT = "120,160,255", ORANGE = "230,160,90";

function drawViz(cv, kind, t){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = cv.clientWidth, h = cv.clientHeight;
  cv.width = w * dpr; cv.height = h * dpr;
  const ctx = cv.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const accent = ACCENT, orange = ORANGE;
  if (kind === "churn") {
    ctx.strokeStyle = `rgba(${accent},0.45)`; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(w*0.12, h*0.92); ctx.lineTo(w*0.9, h*0.12); ctx.stroke();
    for (let i=0;i<48;i++){
      const cls=i%2, cx=cls?w*0.68:w*0.32, cy=cls?h*0.34:h*0.66;
      const px=cx+Math.cos(i*2.4+t*0.3)*(12+(i%5)*4);
      const py=cy+Math.sin(i*1.7+t*0.3)*(10+(i%4)*4);
      ctx.fillStyle=cls?`rgba(${orange},0.9)`:`rgba(${accent},0.9)`;
      ctx.beginPath(); ctx.arc(px,py,2.4,0,Math.PI*2); ctx.fill();
    }
  } else if (kind === "bars") {
    const n=9, gap=8, bw=(w-gap*(n+1))/n;
    for (let i=0;i<n;i++){
      const base=0.3+0.6*Math.abs(Math.sin(i*0.9+1.5));
      const v=base*(0.85+0.15*Math.sin(t*1.2+i));
      const bh=v*(h-26), x=gap+i*(bw+gap), col=i===n-1?orange:accent;
      ctx.fillStyle=`rgba(${col},0.85)`;
      const y=h-bh-8, r=Math.min(4,bw/2);
      ctx.beginPath();
      ctx.moveTo(x,h-8); ctx.lineTo(x,y+r);
      ctx.arcTo(x,y,x+r,y,r); ctx.lineTo(x+bw-r,y);
      ctx.arcTo(x+bw,y,x+bw,y+r,r); ctx.lineTo(x+bw,h-8);
      ctx.closePath(); ctx.fill();
    }
    ctx.strokeStyle=`rgba(255,255,255,0.12)`; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(0,h-8); ctx.lineTo(w,h-8); ctx.stroke();
  } else if (kind === "leaf") {
    const green="120,200,140", cols=20, rows=8, cw=w/cols, ch=h/rows;
    for (let x=0;x<cols;x++) for (let y=0;y<rows;y++){
      const v=Math.sin(x*0.55+t)*Math.cos(y*0.6-t*0.7), a=(v+1)/2;
      const diseased=((x*7+y*13)%11)<3;
      ctx.fillStyle=diseased?`rgba(${orange},${a*0.55})`:`rgba(${green},${a*0.5})`;
      ctx.fillRect(x*cw+1, y*ch+1, cw-2, ch-2);
    }
    const sx=((Math.sin(t*0.8)+1)/2)*w;
    ctx.fillStyle=`rgba(${green},0.85)`; ctx.fillRect(sx,0,2,h);
  } else if (kind === "retina") {
    const cx=w/2, cy=h/2, maxR=Math.min(w,h)*0.46;
    for (let r=maxR;r>4;r-=7){
      const o=0.15+0.35*((Math.sin(r*0.18-t*1.4)+1)/2);
      ctx.strokeStyle=`rgba(${accent},${o})`; ctx.lineWidth=1.4;
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke();
    }
    const ang=t*1.1;
    ctx.strokeStyle=`rgba(${orange},0.8)`; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(ang)*maxR, cy+Math.sin(ang)*maxR); ctx.stroke();
    ctx.fillStyle=`rgba(${orange},0.95)`;
    ctx.beginPath(); ctx.arc(cx,cy,3,0,Math.PI*2); ctx.fill();
  } else if (kind === "nba") {
    for (let i=0;i<40;i++){
      const px=(i/40)*w, py=h*0.5+Math.sin(i*0.5+t)*h*0.28;
      ctx.fillStyle=`rgba(${orange},${0.5+0.4*Math.sin(i+t)})`;
      ctx.beginPath(); ctx.arc(px,py,2.2,0,Math.PI*2); ctx.fill();
    }
    ctx.strokeStyle=`rgba(${accent},0.6)`; ctx.lineWidth=1.6;
    ctx.beginPath();
    for (let x=0;x<=w;x+=6){
      const prog=x/w, y=h*0.9-Math.sin(prog*Math.PI)*h*0.7+Math.sin(t)*4;
      x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.stroke();
  } else if (kind === "wine") {
    ctx.strokeStyle=`rgba(${orange},0.6)`; ctx.lineWidth=1.6;
    ctx.beginPath(); ctx.moveTo(w*0.1,h*0.85); ctx.lineTo(w*0.9,h*0.2); ctx.stroke();
    for (let i=0;i<50;i++){
      const px=w*0.1+(i/50)*w*0.8+Math.sin(i*3+t)*6;
      const base=h*0.85-((px-w*0.1)/(w*0.8))*h*0.65;
      const py=base+Math.cos(i*1.6+t*0.4)*16;
      const o=0.55+0.35*Math.sin(i+t);
      ctx.fillStyle=`rgba(${accent},${o})`;
      ctx.beginPath(); ctx.arc(px,py,2.3,0,Math.PI*2); ctx.fill();
    }
  }
}

function Viz({ kind }){
  const ref = useRefProj(null);
  useEffectProj(() => {
    const cv = ref.current;
    if (!cv) return;
    let t = 0, raf = null;
    const loop = () => { t += 0.018; drawViz(cv, kind, t); raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting){ if (!raf) loop(); }
      else { cancelAnimationFrame(raf); raf = null; }
    }), { threshold: 0.05 });
    io.observe(cv);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [kind]);
  return <canvas ref={ref}></canvas>;
}

const PROJECTS = [
  { viz:"churn", idx:"01 — Business", status:"Machine Learning", statusCls:"",
    title:"Customer Churn Prediction",
    desc:<>Prédiction du départ des clients à partir de leurs comportements, avec un tableau de bord de suivi du risque d'attrition.</>,
    tags:["Data Cleaning","EDA","Machine Learning","Dashboard"] },
  { viz:"bars", idx:"02 — Business Intelligence", status:"En cours", statusCls:"soon",
    title:"Sales Analytics Dashboard",
    desc:<>Tableau de bord <b>Power BI</b> pour le suivi des ventes et des KPI — analyse des tendances et aide à la décision commerciale.</>,
    tags:["Power BI","DAX","Business Analytics"] },
  { viz:"leaf", idx:"03 — Agriculture", status:"Computer Vision", statusCls:"live",
    title:"Tomato Disease Classification",
    desc:<>Projet de vision par ordinateur pour identifier les maladies des plants de tomate à partir d'images de feuilles.</>,
    tags:["Deep Learning","PyTorch","Transfer Learning"] },
  { viz:"retina", idx:"04 — Santé", status:"Computer Vision", statusCls:"live",
    title:"OCT Retina Classification",
    desc:<>Classification d'images médicales rétiniennes (OCT) pour le dépistage de pathologies oculaires.</>,
    tags:["Computer Vision","Healthcare AI","CNN"] },
  { viz:"nba", idx:"05 — Sport", status:"Data Analysis", statusCls:"live",
    title:"NBA Game Analysis",
    desc:<>Analyse statistique de données de matchs NBA — EDA, métriques de performance des joueurs et équipes, et visualisations.</>,
    tags:["Pandas","EDA","Matplotlib","Statistics"],
    link:"https://github.com/argi00/Qwasar-projects/tree/main/My_Nba_Game_Analysis" },
  { viz:"wine", idx:"06 — Business", status:"Data Analysis", statusCls:"live",
    title:"Vivino Wine Analysis",
    desc:<>Analyse exploratoire d'un jeu de données de vins — qualité, corrélation prix/note et tendances par région et cépage.</>,
    tags:["EDA","Correlation","Seaborn","Insights"],
    link:"https://github.com/argi00/Qwasar-projects/tree/main/My_Vivino" },
];

function Projects(){
  return (
    <section className="section-pad" id="work" style={{paddingTop:0}} data-screen-label="Projects">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">Projets</span>
          <div className="sec-head-row">
            <h2>De la donnée à l'impact.</h2>
            <a className="repo-link" href="https://github.com/argi00/Qwasar-projects" target="_blank" rel="noopener">
              <IcGithub/>Voir tout le code
            </a>
          </div>
          <p>Une sélection de projets en analyse de données, BI et machine learning — à travers plusieurs domaines. Plusieurs sont disponibles en open source.</p>
        </Reveal>
        <div className="proj-grid">
          {PROJECTS.map((p) => (
            <Reveal as="article" className="proj" key={p.title}>
              <div className="proj-visual"><Viz kind={p.viz}/></div>
              <div className="proj-top">
                <span className="proj-idx">{p.idx}</span>
                <span className={"proj-status" + (p.statusCls ? " " + p.statusCls : "")}>{p.status}</span>
              </div>
              <h3>{p.title}</h3>
              <div className="desc">{p.desc}</div>
              <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              {p.link && (
                <a className="proj-link" href={p.link} target="_blank" rel="noopener">Voir le code <IcArrow/></a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Projects = Projects;
