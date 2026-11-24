'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/data/site';
import type { Dict, Lang } from '@/data/i18n';

type Props = { lang: Lang; t: Dict['nav'] };

export default function Header({ lang, t }: Props) {
  const [open, setOpen] = useState(false);
  const other: Lang = lang === 'fr' ? 'en' : 'fr';

  const links = [
    { href: '#projects', label: t.projects },
    { href: '#experience', label: t.experience },
    { href: '#skills', label: t.skills },
    { href: '#certifications', label: t.certifications },
  ];

  // Mémorise le choix de langue pour les prochaines visites.
  function rememberLang() {
    try {
      document.cookie = `lang=${other}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      /* ignore */
    }
  }

  const langSwitch = (
    <div className="lang-switch" role="group" aria-label="Language / Langue">
      <span className="lang-current" aria-current="true">
        {lang.toUpperCase()}
      </span>
      <Link
        href={`/${other}`}
        hrefLang={other}
        lang={other}
        aria-label={t.switchLang}
        onClick={rememberLang}
      >
        {other.toUpperCase()}
      </Link>
    </div>
  );

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={`/${lang}`} className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            {site.initials}
          </span>
          {site.name}
        </Link>

        <nav className="nav-desktop" aria-label="Navigation">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          {langSwitch}
          <a className="btn btn-outline btn-sm" href="#contact">
            {t.contact}
          </a>
        </nav>

        <div className="nav-mobile-controls">
          {langSwitch}
          <button
            type="button"
            className="menu-button"
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Navigation">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="btn btn-primary" href="#contact" onClick={() => setOpen(false)}>
            {t.contact}
          </a>
        </nav>
      )}
    </header>
  );
}
