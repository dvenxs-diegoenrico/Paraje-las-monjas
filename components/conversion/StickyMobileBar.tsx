import Link from 'next/link';
import { href, type Locale } from '@/lib/i18n';
import { whatsappLink } from '@/lib/site';
import type { Content } from '@/content';
import { Icon } from '@/components/base/Icon';

/** Fixed bottom bar on mobile: Agendar visita + WhatsApp. */
export function StickyMobileBar({ locale, c }: { locale: Locale; c: Pick<Content, 'nav' | 'whatsappMessage'> }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-cantera/30 bg-cal/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-[6px] lg:hidden">
      <div className="grid grid-cols-2">
        <Link href={href(locale, 'visita')} className="shadow-lux transition-shadow duration-700 hover:shadow-lux-lg mx-2 my-2 flex h-[52px] items-center justify-center gap-2 bg-piedra font-sans text-[13px] font-semibold uppercase tracking-[0.08em] text-cal">
          <Icon name="calendario" size={18} draw={false} />
          {c.nav.visita}
        </Link>
        <a
          href={whatsappLink(c.whatsappMessage)}
          target="_blank"
          rel="noopener"
          className="shadow-lux transition-shadow duration-700 hover:shadow-lux-lg mx-2 my-2 flex h-[52px] items-center justify-center bg-fronda font-sans text-[13px] font-semibold uppercase tracking-[0.08em] text-cal gap-2"
        >
          <Icon name="chat" size={18} draw={false} />
          {c.nav.whatsapp}
        </a>
      </div>
    </div>
  );
}
