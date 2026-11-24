import type { Dict, Lang } from '@/data/i18n';
import ChatWidget from '@/components/ChatWidget';

type Props = { lang: Lang; t: Dict; cv: string | null };

export default function Hero({ lang, t, cv }: Props) {
  const h = t.hero;
  return (
    <section id="top" className="container hero">
      <div className="hero-copy">
        <p className="status">
          <span className="status-dot" aria-hidden="true" />
          {h.available}
        </p>
        <h1>{h.title}</h1>
        <p className="lead">{h.sub}</p>
        <ul className="chips" aria-label="Stack">
          {h.web.map((x) => (
            <li key={x} className="chip chip-accent">
              {x}
            </li>
          ))}
          <li className="chip-sep" aria-hidden="true" />
          {h.ai.map((x) => (
            <li key={x} className="chip">
              {x}
            </li>
          ))}
        </ul>
        <div className="actions">
          <a className="btn btn-primary" href="#projects">
            {h.ctaProjects}
          </a>
          {cv ? (
            <a className="btn btn-outline" href={cv} download>
              {h.ctaCv}
            </a>
          ) : (
            <a className="btn btn-outline" href="#contact">
              {h.ctaContact}
            </a>
          )}
        </div>
      </div>
      <ChatWidget lang={lang} labels={t.chat} />
    </section>
  );
}
