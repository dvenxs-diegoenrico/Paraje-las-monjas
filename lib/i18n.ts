export type Locale = 'es' | 'en';
export const locales: Locale[] = ['es', 'en'];

export type RouteKey = 'home' | 'lugar' | 'celebraciones' | 'planear' | 'galeria' | 'visita' | 'privacidad';

/** Spanish slugs in both languages (clean, stable URLs). */
const slugs: Record<RouteKey, string> = {
  home: '',
  lugar: 'el-lugar',
  celebraciones: 'celebraciones',
  planear: 'planear',
  galeria: 'galeria',
  visita: 'visita',
  privacidad: 'aviso-de-privacidad',
};

export function href(locale: Locale, route: RouteKey, hash?: string) {
  const slug = slugs[route];
  const base = locale === 'es' ? `/${slug}` : `/en${slug ? `/${slug}` : ''}`;
  return hash ? `${base}#${hash}` : base;
}

export const routeKeys = Object.keys(slugs) as RouteKey[];

export function swapLocale(pathname: string, to: Locale) {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  if (to === 'es') return stripped;
  return stripped === '/' ? '/en' : `/en${stripped}`;
}
