
import { NextRequest, NextResponse } from 'next/server';

const locales = ['fr', 'en'] as const;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ne pas intercepter les routes qui possèdent déjà un préfixe de langue.
  const hasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` ||
      pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  // Priorité à la langue mémorisée.
  const saved = request.cookies.get('lang')?.value;

  // Détection de la langue préférée du navigateur.
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferredLanguage = acceptLanguage
    .split(',')[0]
    ?.trim()
    .toLowerCase();

  const lang =
    saved && locales.includes(saved as (typeof locales)[number])
      ? saved
      : preferredLanguage?.startsWith('fr')
        ? 'fr'
        : 'en';

  // Redirection en conservant les paramètres de l'URL.
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname === '/' ? '' : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
