import type { Metadata } from 'next';
import { getContent } from '@/content';
import { href, type Locale, type RouteKey } from './i18n';
import { INSTAGRAM_URL, SITE_URL, WHATSAPP_DISPLAY } from './site';

export function pageMetadata(locale: Locale, route: RouteKey): Metadata {
  const c = getContent(locale);
  const p = c.meta.pages[route];
  const title = route === 'home' ? { absolute: p.title } : p.title;
  const description = p.description || c.meta.description;
  const url = href(locale, route);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: { 'es-MX': href('es', route), en: href('en', route), 'x-default': href('es', route) },
    },
    openGraph: {
      type: 'website',
      siteName: c.meta.siteName,
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_MX'],
      url,
      title: route === 'home' ? p.title : `${p.title} · ${c.meta.siteName}`,
      description,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: c.a11y.logo }],
    },
    twitter: { card: 'summary_large_image', title: route === 'home' ? p.title : `${p.title} · ${c.meta.siteName}`, description, images: ['/og.png'] },
  };
}

export const layoutMetadata = (locale: Locale): Metadata => {
  const c = getContent(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: c.meta.pages.home.title, template: `%s · ${c.meta.siteName}` },
    description: c.meta.description,
    applicationName: c.meta.siteName,
  };
};

/** EventVenue / LocalBusiness — unverified fields (address, hours, geo, capacity) omitted on purpose. */
export function venueJsonLd(locale: Locale) {
  const c = getContent(locale);
  return {
    '@context': 'https://schema.org',
    '@type': ['EventVenue', 'LocalBusiness'],
    '@id': `${SITE_URL}/#venue`,
    name: 'Paraje Las Monjas',
    description: c.meta.description,
    url: SITE_URL + href(locale, 'home'),
    image: `${SITE_URL}/og.png`,
    logo: `${SITE_URL}/icon-512.png`,
    telephone: WHATSAPP_DISPLAY.replace(/\s/g, ''),
    address: { '@type': 'PostalAddress', addressLocality: 'Atlixco', addressRegion: 'Puebla', addressCountry: 'MX' },
    sameAs: [INSTAGRAM_URL],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: locale === 'es' ? 'Estacionamiento privado con vigilancia' : 'Private parking with security', value: true },
      { '@type': 'LocationFeatureSpecification', name: locale === 'es' ? '4 baños' : '4 restrooms', value: true },
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
      .filter((i) => !i.a.includes('[por confirmar]') && !i.a.includes('[to be confirmed]'))
      .map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
}
