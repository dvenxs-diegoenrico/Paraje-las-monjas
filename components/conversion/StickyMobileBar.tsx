import Link from 'next/link';
import { href, type Locale } from '@/lib/i18n';
import { whatsappLink } from '@/lib/site';
import type { Content } from '@/content';

/** Fixed bottom bar on mobile: Agendar visita + WhatsApp. */
export function StickyMobileBar({ locale, c }: { locale: Locale; c: Pick<Content, 'nav' | 'whatsappMessage'> }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-cantera/30 bg-cal/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-[6px] lg:hidden">
      <div className="grid grid-cols-2">
        <Link href={href(locale, 'visita')} className="scallop-x mx-2 my-2 flex h-[52px] items-center justify-center gap-2 bg-piedra font-sans text-[13px] font-semibold uppercase tracking-[0.08em] text-cal">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-catarina" />
          {c.nav.visita}
        </Link>
        <a
          href={whatsappLink(c.whatsappMessage)}
          target="_blank"
          rel="noopener"
          className="scallop-x mx-2 my-2 flex h-[52px] items-center justify-center bg-fronda font-sans text-[13px] font-semibold uppercase tracking-[0.08em] text-cal"
        >
          {c.nav.whatsapp}
        </a>
      </div>
    </div>
  );
}
