import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/base/Icon';
import { href, type Locale, type RouteKey } from '@/lib/i18n';
import { FACEBOOK_NAME, FACEBOOK_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from '@/lib/site';
import type { Content } from '@/content';

const LINKS: RouteKey[] = ['lugar', 'celebraciones', 'planear', 'galeria', 'visita'];

export function Footer({ locale, c }: { locale: Locale; c: Content }) {
  const f = c.footer;
  return (
    <footer className="on-dark grain relative mt-0 overflow-hidden bg-piedra pb-28 text-cal lg:pb-0">
      <div className="bricks pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" />
      <div className="container-lux relative pt-24 pb-12 lg:pt-32">
        <div className="grid-lux gap-y-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Logo variant="vertical" tone="light" className="text-[22px]" label={c.a11y.logo} />
            <p className="mt-10 font-serif text-[32px] font-light italic leading-tight text-cal/90">{f.tagline}</p>
          </div>
          <nav aria-label={c.a11y.footerNav} className="col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-6">
            <ul className="flex flex-col gap-1">
              {LINKS.map((k) => (
                <li key={k}>
                  <Link href={href(locale, k)} className="t-nav link-grow inline-flex min-h-[44px] items-center text-cal">
                    {c.nav[k]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-2 md:col-span-3 lg:col-span-3 lg:col-start-8">
            <p className="t-eyebrow text-cantera">{f.contactLabel}</p>
            <ul className="t-data mt-4 flex flex-col gap-3">
              <li>
                <a href={whatsappLink(c.whatsappMessage)} target="_blank" rel="noopener" className="group inline-flex items-center gap-2">
                  <Icon name="chat" size={18} className="text-cantera" />
                  <span className="link-grow">WhatsApp {WHATSAPP_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="group inline-flex items-center gap-2">
                  <Icon name="camara" size={18} className="text-cantera" />
                  <span className="link-grow">Instagram {INSTAGRAM_HANDLE}</span>
                </a>
              </li>
              <li>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener" className="group inline-flex items-center gap-2">
                  <Icon name="personas" size={18} className="text-cantera" />
                  <span className="link-grow">Facebook · {FACEBOOK_NAME}</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-2 lg:col-start-11">
            <p className="t-eyebrow flex items-center gap-2 text-cantera">
              <Icon name="pin" size={16} /> {f.addressLabel}
            </p>
            <p className="t-data mt-4">
              {f.address}
              <br />
              {f.city}
            </p>
            <p className="t-eyebrow mt-8 flex items-center gap-2 text-cantera">
              <Icon name="reloj" size={16} /> {f.hoursLabel}
            </p>
            <p className="t-data mt-4">{f.hours}</p>
          </div>
        </div>
        <hr className="junta mt-20" />
        <div className="t-caption flex flex-col justify-between gap-4 pt-6 text-cantera md:flex-row">
          <p>
            © {new Date().getFullYear()} {f.rights} · {c.meta.descriptor}
          </p>
          <Link href={href(locale, 'privacidad')} className="link-grow self-start">
            {f.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
