/* Fixed nav bar + scroll state + mobile hamburger menu */
const { useState: useStateNav, useEffect: useEffectNav } = React;

const NAV_LINKS = [
  ["#demo", "Mon IA"],
  ["#apropos", "À propos"],
  ["#journey", "Parcours"],
  ["#work", "Projets"],
  ["#skills", "Compétences"],
  ["#contact", "Contact"],
];

function Nav(){
  const [scrolled, setScrolled] = useStateNav(false);
  const [open, setOpen] = useStateNav(false);

  useEffectNav(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const onResize = () => { if (window.innerWidth > 760) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")} id="nav">
      <div className="nav-inner">
        <a className="brand" href="#top"><span className="dot"></span>Mamane&nbsp;Argi</a>
        <nav className="nav-links">
          {NAV_LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="nav-right">
          <a className="nav-cta" href="portfolio/Mamane-Argi-CV.pdf" download>
            <IcDownload width="14" height="14"/>
            CV
          </a>
          <button
            className="nav-toggle"
            aria-label="Ouvrir le menu"
            aria-expanded={open ? "true" : "false"}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <nav className={"mobile-menu" + (open ? " open" : "")} id="mobile-menu" aria-hidden={open ? "false" : "true"}>
        {NAV_LINKS.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  );
}

window.Nav = Nav;
