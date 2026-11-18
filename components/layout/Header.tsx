'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { ButtonLink } from '@/components/base/Button';
import { LanguageSwitch } from '@/components/navigation/LanguageSwitch';
import { MobileSheet } from '@/components/navigation/MobileSheet';
import { href, type Locale, type RouteKey } from '@/lib/i18n';
import type { Content } from '@/content';

export const NAV: RouteKey[] = ['lugar', 'celebraciones', 'planear', 'galeria'];

export function Header({ locale, c }: { locale: Locale; c: Pick<Content, 'nav' | 'a11y' | 'whatsappMessage'> }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // the sheet belongs to the page it was opened on: navigating closes it
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean) => setOpenAt(v ? pathname : null);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last.current) > 6) {
        setHidden(y > last.current && y > 160);
        last.current = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-700 ease-lux ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}
        onFocusCapture={() => setHidden(false)}
      >
        <div
          className={`absolute inset-0 bg-cal/92 backdrop-blur-[6px] transition-opacity duration-700 ease-lux ${scrolled ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        />
        <div className="container-lux relative flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href={href(locale, 'home')} className="flex min-h-[44px] items-center">
            <Logo variant="horizontal" className="text-[17px] lg:text-[19px]" label={c.a11y.logo} />
          </Link>
          <nav aria-label={c.a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV.map((k) => {
                const target = href(locale, k);
                const active = pathname === target;
                return (
                  <li key={k}>
                    <Link href={target} aria-current={active ? 'page' : undefined} className="t-nav link-grow inline-flex min-h-[44px] items-center">
                      {c.nav[k]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <ButtonLink href={href(locale, 'visita')} icon="calendario">
                {c.nav.visita}
              </ButtonLink>
            </div>
            <LanguageSwitch locale={locale} label={c.a11y.language} short={c.nav.langShort} name={c.nav.langName} />
            <button
              type="button"
              className="t-nav inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-sheet"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">{c.a11y.openMenu}</span>
              <span aria-hidden="true" className="flex w-6 flex-col gap-[6px]">
                <span className="h-px w-full bg-piedra" />
                <span className="h-px w-2/3 self-end bg-piedra" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileSheet open={open} onClose={() => setOpen(false)} locale={locale} c={c} />
    </>
  );
}
