/* Contact section + footer */

function Contact(){
  return (
    <section className="contact" id="contact" data-screen-label="Contact">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Travaillons ensemble</span>
          <h2>Un projet où la donnée<br/>fait la différence ?</h2>
          <p>Je suis ouvert aux opportunités en data analyse, BI et IA appliquée — dans les domaines de la santé, l'agriculture, l'environnement et le business.</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="mailto:mamaneargimalambawa@gmail.com">
              <IcMail/>Me contacter
            </a>
            <a className="btn btn-ghost" href="tel:+221770980214">
              <IcPhone width="16" height="16"/>+221 77 098 02 14
            </a>
            <a className="btn btn-ghost" href="portfolio/Mamane-Argi-CV.pdf" download>Télécharger le CV</a>
          </div>
          <Socials/>
        </Reveal>
      </div>
    </section>
  );
}

function Footer(){
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="foot-inner">
        <span>© {year} Mamane Argi · Data Analyst &amp; IA</span>
        <span>Conçu avec des données, du design &amp; un peu d'IA ◆</span>
      </div>
    </footer>
  );
}

function App(){
  return (
    <React.Fragment>
      <Nav/>
      <Hero/>
      <Stats/>
      <About/>
      <Demo/>
      <Journey/>
      <Projects/>
      <Skills/>
      <Contact/>
      <Footer/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
