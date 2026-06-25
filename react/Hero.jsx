/* Hero section: animated neural-network canvas, portrait, CTA, ticker */
const { useRef: useRefHero, useEffect: useEffectHero } = React;

function useHeroCanvas(ref){
  useEffectHero(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let w, h, dpr, nodes = [], raf;
    const accent = "120,160,255";
    function resize(){
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(64, Math.round((w * h) / 22000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));
    }
    function step(){
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes){ n.x += n.vx; n.y += n.vy; if (n.x<0||n.x>w) n.vx*=-1; if (n.y<0||n.y>h) n.vy*=-1; }
      for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++){
        const a=nodes[i], b=nodes[j], dx=a.x-b.x, dy=a.y-b.y, d2=dx*dx+dy*dy;
        if (d2 < 145*145){
          const o=(1-Math.sqrt(d2)/145)*0.5;
          ctx.strokeStyle=`rgba(${accent},${o})`; ctx.lineWidth=0.6;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
      for (const n of nodes){ ctx.fillStyle=`rgba(${accent},0.9)`; ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill(); }
      raf = requestAnimationFrame(step);
    }
    resize(); step();
    const onResize = () => { cancelAnimationFrame(raf); resize(); step(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
}

const TICKER_ITEMS = ["Data Analytics","Power BI","Tableau","Python","SQL","Machine Learning","PyTorch","Data Visualization","Plotly","Computer Vision","FastAPI"];

function Ticker(){
  const items = TICKER_ITEMS.concat(TICKER_ITEMS);
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

function Hero(){
  const canvasRef = useRefHero(null);
  useHeroCanvas(canvasRef);
  return (
    <React.Fragment>
      <section className="hero" id="top" data-screen-label="Hero">
        <canvas id="hero-canvas" ref={canvasRef}></canvas>
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Data Analyst · IA &amp; Data Analytics</span>
              <h1>Transformer la donnée<br/>en <span className="accent">décisions</span>.</h1>
              <p className="lede">Je suis <b>Mamane Argi</b>, étudiant en master spécialisé en <b>IA &amp; Data Analytics</b>. Je transforme les données en informations exploitables — analyse, visualisation interactive et machine learning au service de meilleures décisions.</p>
              <div className="meta-row">
                <span className="chip"><span className="sq"></span>Master IA &amp; Big Data</span>
                <span className="chip"><span className="sq"></span>Dakar, Sénégal</span>
                <span className="chip"><span className="sq"></span>Ouvert aux opportunités</span>
              </div>
              <div className="hero-cta">
                <a className="btn btn-primary" href="#demo"><IcChat/>Discuter avec mon IA</a>
                <a className="btn btn-ghost" href="#work">Voir les projets</a>
              </div>
              <Socials/>
            </div>
            <div className="portrait-wrap">
              <div className="portrait-frame">
                <img className="portrait-img" src="portfolio/photo.jpg" alt="Mamane Argi" />
              </div>
              <span className="portrait-tag">◆ Data Analyst &amp; IA</span>
            </div>
          </div>
        </div>
      </section>
      <Ticker/>
    </React.Fragment>
  );
}

window.Hero = Hero;
