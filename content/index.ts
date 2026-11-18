import type { Locale } from '@/lib/i18n';
import { es, type Content } from './es';
import { en } from './en';

export type { Content };
export const dictionaries: Record<Locale, Content> = { es, en };
export const getContent = (locale: Locale) => dictionaries[locale];

export function formatPrice(n: number) {
  return `$${n.toLocaleString('en-US')}`;
}

export function priceFrom(c: Content, n: number) {
  return c.priceFrom.replace('{price}', formatPrice(n));
}
