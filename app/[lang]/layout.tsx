import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { dict, isLang, locales } from '@/data/i18n';
import { site } from '@/data/site';
import '../globals.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = dict[lang];
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { fr: '/fr', en: '/en' },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}`,
      siteName: site.name,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
