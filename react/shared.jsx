/* Shared icons + Reveal wrapper (ported from the vanilla markup) */
const { useRef, useEffect, useState, useCallback } = React;

/* ---- icons ---- */
function IcDownload(p){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>;}
function IcChat(p){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;}
function IcArrow(p){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;}
function IcSend(p){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>;}
function IcMail(p){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;}
function IcPhone(p){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>;}
function IcBot(p){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M12 2a3 3 0 013 3v1h1a3 3 0 013 3v1a2 2 0 012 2 2 2 0 01-2 2v1a3 3 0 01-3 3h-1v1a3 3 0 01-6 0v-1H8a3 3 0 01-3-3v-1a2 2 0 01-2-2 2 2 0 012-2V9a3 3 0 013-3h1V5a3 3 0 013-3z"/><circle cx="9" cy="13" r="1" fill="currentColor"/><circle cx="15" cy="13" r="1" fill="currentColor"/></svg>;}
function IcGithub(p){return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.4 9.4 0 0112 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.04 10.04 0 0022 12.26C22 6.58 17.52 2 12 2z"/></svg>;}
function IcLinkedin(p){return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18.34V10.4H5.67v7.94h2.67zM7 9.24a1.55 1.55 0 100-3.1 1.55 1.55 0 000 3.1zm11.34 9.1v-4.36c0-2.33-1.25-3.42-2.92-3.42-1.35 0-1.95.74-2.29 1.26v-1.08h-2.67c.04.75 0 7.94 0 7.94h2.67v-4.43c0-.24.02-.48.09-.65.19-.48.63-.98 1.36-.98.96 0 1.35.73 1.35 1.81v4.25h2.41z"/></svg>;}

/* ---- shared social row ---- */
function Socials(){
  return (
    <div className="socials">
      <a href="https://github.com/argi00" target="_blank" rel="noopener" aria-label="GitHub"><IcGithub/></a>
      <a href="https://linkedin.com/in/mamane-argi" target="_blank" rel="noopener" aria-label="LinkedIn"><IcLinkedin/></a>
      <a href="mailto:mamaneargimalambawa@gmail.com" aria-label="Email"><IcMail/></a>
    </div>
  );
}

/* ---- Reveal: IntersectionObserver fade-in, mirrors .reveal/.in ---- */
function Reveal({ as = "div", className = "", children, ...rest }){
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  const cls = ("reveal " + className).trim();
  return <Tag ref={ref} className={cls} {...rest}>{children}</Tag>;
}

Object.assign(window, {
  IcDownload, IcChat, IcArrow, IcSend, IcMail, IcPhone, IcBot, IcGithub, IcLinkedin,
  Socials, Reveal,
});
