export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://paraje-las-monjas.vercel.app').replace(/\/$/, '');

export const WHATSAPP_NUMBER = '522447855365';
export const WHATSAPP_DISPLAY = '+52 244 785 5365';
export const INSTAGRAM_HANDLE = '@paraje_las_monjas';
export const INSTAGRAM_URL = 'https://www.instagram.com/paraje_las_monjas/';
export const FACEBOOK_NAME = 'Paraje Las Monjas';
/** Exact Facebook page URL is [por confirmar]; we link to a search for the page name. */
export const FACEBOOK_URL = 'https://www.facebook.com/search/top?q=Paraje%20Las%20Monjas';

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
