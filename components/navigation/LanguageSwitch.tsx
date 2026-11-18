'use client';

import { usePathname } from 'next/navigation';
import { swapLocale, type Locale } from '@/lib/i18n';

/** Plain <a> on purpose: each language has its own root layout (lang attr). */
export function LanguageSwitch({ locale, label, short, name, className = '' }: { locale: Locale; label: string; short: string; name: string; className?: string }) {
  const pathname = usePathname() || '/';
  const to: Locale = locale === 'es' ? 'en' : 'es';
  return (
    <a
      href={swapLocale(pathname, to)}
      hrefLang={to === 'es' ? 'es-MX' : 'en'}
      lang={to === 'es' ? 'es-MX' : 'en'}
      className={`t-nav link-grow inline-flex min-h-[44px] min-w-[44px] items-center justify-center ${className}`}
    >
      {short}
      <span className="sr-only">
        {' '}
        · {label}: {name}
      </span>
    </a>
  );
}
