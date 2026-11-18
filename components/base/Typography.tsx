import type { ReactNode } from 'react';

/** Mono eyebrow with the catarina dot as marker. */
export function Eyebrow({ children, className = '', dot = true, tone = 'tabique' }: { children: ReactNode; className?: string; dot?: boolean; tone?: 'tabique' | 'cantera' }) {
  return (
    <p className={`t-eyebrow flex items-center gap-3 ${tone === 'tabique' ? 'text-tabique' : 'text-cantera'} ${className}`}>
      {dot && <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-catarina" />}
      {children}
    </p>
  );
}

/** la junta — 1px stone hairline at 30%. */
export function Rule({ className = '' }: { className?: string }) {
  return <hr className={`junta ${className}`} />;
}
