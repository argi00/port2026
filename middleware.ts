import { NextRequest, NextResponse } from 'next/server';

const locales = ['fr', 'en'];

// Redirige "/" (et tout chemin sans préfixe de langue) vers /fr ou /en,
// d'après le choix mémorisé (cookie "lang") ou la langue du navigateur.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const saved = request.cookies.get('lang')?.value;
  const accept = (request.headers.get('accept-language') ?? '').toLowerCase();
  const lang =
    saved && locales.includes(saved)
      ? saved
      : accept.includes('fr') || accept === ''
        ? 'fr'
        : 'en';

  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Ignore l'API, les fichiers statiques (avec extension) et les ressources Next.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
