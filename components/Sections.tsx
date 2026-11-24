import { site } from '@/data/site';
import { certifications } from '@/data/certifications';
import type { Dict, Lang } from '@/data/i18n';

export function About({ t, photo }: { t: Dict['about']; photo: string | null }) {
  return (
    <section id="about" className="container section about">
      <div className="photo-frame">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={t.photoAlt} />
        ) : (
          <div className="photo-placeholder">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="3" />
              <circle cx="9" cy="10" r="1.8" />
              <path d="M21 16l-5-5-8 9" />
            </svg>
            <strong>{t.photoMissing}</strong>
            <span>{t.photoHint}</span>
          </div>
        )}
      </div>
      <div className="about-copy">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 className="section-title">{t.title}</h2>
        {t.paragraphs.map((p) => (
          <p key={p} className="lead muted">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

export function Experience({ t }: { t: Dict['experience'] }) {
  return (
    <section id="experience" className="container section experience">
      <div>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 className="section-title">{t.title}</h2>
      </div>
      <ol className="timeline">
        {t.items.map((item) => (
          <li key={`${item.period}-${item.org}`} className="timeline-item">
            <span className="timeline-period">{item.period}</span>
            <div>
              <h3>
                {item.title} · {item.org}
              </h3>
              <p className="muted">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Skills({ t }: { t: Dict['skills'] }) {
  return (
    <section id="skills" className="container section">
      <p className="eyebrow">{t.eyebrow}</p>
      <h2 className="section-title">{t.title}</h2>
      <div className="skill-grid">
        {t.groups.map((g, i) => (
          <div key={g.title} className="card skill-card">
            <h3>
              {String(i + 1).padStart(2, '0')} · {g.title}
            </h3>
            <p className="muted">{g.items.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Certifications({ lang, t }: { lang: Lang; t: Dict['certifications'] }) {
  return (
    <section id="certifications" className="container section">
      <p className="eyebrow">{t.eyebrow}</p>
      <h2 className="section-title">{t.title}</h2>
      <div className="cert-grid">
        {certifications.map((c) => {
          const content = (
            <>
              <span className="cert-meta">
                {c.issuer} · {c.date[lang]}
              </span>
              <h3>{c.title}</h3>
              {c.credentialId && (
                <span className="muted small">
                  {t.idLabel} : {c.credentialId}
                </span>
              )}
              {c.url && (
                <span className="link-arrow">
                  {t.viewCredential} <span aria-hidden="true">→</span>
                </span>
              )}
            </>
          );

          return c.url ? (
            <a
              key={c.title}
              className="card cert-card cert-card-link"
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          ) : (
            <article key={c.title} className="card cert-card">
              {content}
            </article>
          );
        })}
      </div>
      <a className="link-arrow link-large" href={site.linkedin} target="_blank" rel="noopener noreferrer">
        {t.viewAll} <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

export function Contact({ t }: { t: Dict['contact'] }) {
  return (
    <section id="contact" className="container section">
      <div className="contact-box">
        <div className="contact-copy">
          <h2 className="section-title">{t.title}</h2>
          <p className="lead muted">{t.text}</p>
        </div>
        <div className="actions">
          {site.email && (
            <a className="btn btn-primary" href={`mailto:${site.email}`}>
              {t.email}
            </a>
          )}
          <a
            className={site.email ? 'btn btn-outline' : 'btn btn-primary'}
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          {site.github && (
            <a className="btn btn-outline" href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer({ t }: { t: Dict['footer'] }) {
  return (
    <footer className="container site-footer">
      © {new Date().getFullYear()} {site.name} · {t.location}
    </footer>
  );
}
