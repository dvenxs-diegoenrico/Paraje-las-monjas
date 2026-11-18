import type { MetadataRoute } from 'next';
import { href, routeKeys } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return routeKeys.map((r) => ({
    url: SITE_URL + href('es', r),
    changeFrequency: 'monthly',
    priority: r === 'home' ? 1 : r === 'privacidad' ? 0.2 : 0.7,
    alternates: { languages: { 'es-MX': SITE_URL + href('es', r), en: SITE_URL + href('en', r) } },
  }));
}
