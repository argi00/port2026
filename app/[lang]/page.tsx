import { notFound } from 'next/navigation';
import { dict, isLang } from '@/data/i18n';
import { firstPublicFile } from '@/lib/files';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import {
  About,
  Experience,
  Skills,
  Certifications,
  Contact,
  Footer,
} from '@/components/Sections';
import Projects from '@/components/Projects';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = dict[lang];
  const photo = firstPublicFile(['photo.jpg', 'photo.jpeg', 'photo.png', 'photo.webp']);
  const cv = firstPublicFile([`cv-${lang}.pdf`, 'cv.pdf']);

  return (
    <>
      <a className="skip-link" href="#main">
        {lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}
      </a>
      <Header lang={lang} t={t.nav} />
      <main id="main">
        <Hero lang={lang} t={t} cv={cv} />
        <About t={t.about} photo={photo} />
        <Projects lang={lang} t={t.projects} />
        <Experience t={t.experience} />
        <Skills t={t.skills} />
        <Certifications lang={lang} t={t.certifications} />
        <Contact t={t.contact} />
      </main>
      <Footer t={t.footer} />
    </>
  );
}
