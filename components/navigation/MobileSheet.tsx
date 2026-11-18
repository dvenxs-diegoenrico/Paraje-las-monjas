'use client';

import Link from 'next/link';
import { AnimatePresence, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useRef } from 'react';
import { Logo } from '@/components/brand/Logo';
import { ButtonA, ButtonLink } from '@/components/base/Button';
import { href, type Locale, type RouteKey } from '@/lib/i18n';
import { whatsappLink } from '@/lib/site';
import type { Content } from '@/content';
import { useFocusTrap } from '@/components/navigation/useFocusTrap';

const ITEMS: RouteKey[] = ['home', 'lugar', 'celebraciones', 'planear', 'galeria', 'visita'];
const ease = [0.22, 1, 0.36, 1] as const;

export function MobileSheet({ open, onClose, locale, c }: { open: boolean; onClose: () => void; locale: Locale; c: Pick<Content, 'nav' | 'a11y' | 'whatsappMessage'> }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useFocusTrap(ref, open, onClose);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={ref}
          id="mobile-sheet"
          role="dialog"
          aria-modal="true"
          aria-label={c.a11y.mainNav}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-cal lg:hidden"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="container-lux flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Logo variant="horizontal" className="text-[17px]" label={c.a11y.logo} />
            <button type="button" onClick={onClose} className="t-nav inline-flex min-h-[44px] min-w-[44px] items-center justify-center" data-autofocus>
              <span className="sr-only">{c.a11y.closeMenu}</span>
              <span aria-hidden="true" className="relative block h-5 w-5">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-piedra" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-piedra" />
              </span>
            </button>
          </div>
          <nav aria-label={c.a11y.mainNav} className="container-lux flex-1 pt-8">
            <ul className="flex flex-col">
              {ITEMS.map((k, i) => (
                <m.li
                  key={k}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08 + i * 0.06, ease }}
                  className="border-b border-cantera/30"
                >
                  <Link href={href(locale, k)} onClick={onClose} className="flex min-h-[64px] items-center justify-between py-3 font-serif text-[40px] font-light leading-none tracking-[-0.01em]">
                    {c.nav[k]}
                    <span aria-hidden="true" className="t-caption text-tabique">
                      0{i + 1}
                    </span>
                  </Link>
                </m.li>
              ))}
            </ul>
          </nav>
          <div className="container-lux flex shrink-0 flex-wrap gap-3 py-8">
            <ButtonLink href={href(locale, 'visita')} onClick={onClose} icon="calendario">
              {c.nav.visita}
            </ButtonLink>
            <ButtonA href={whatsappLink(c.whatsappMessage)} target="_blank" rel="noopener" tone="fronda" icon="chat">
              {c.nav.whatsapp}
            </ButtonA>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
