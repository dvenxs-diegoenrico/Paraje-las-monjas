import type { ReactNode } from 'react';
import { Icon, type IconName } from '@/components/base/Icon';

/** Mono eyebrow with the catarina dot as marker. */
export function Eyebrow({ children, className = '', dot = true, tone = 'tabique', icon }: { children: ReactNode; className?: string; dot?: boolean; tone?: 'tabique' | 'cantera'; icon?: IconName }) {
  return (
    <p className={`t-eyebrow flex items-center gap-3 ${tone === 'tabique' ? 'text-tabique' : 'text-cantera'} ${className}`}>
      {icon ? <Icon name={icon} size={20} /> : dot && <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-catarina" />}
      {children}
    </p>
  );
}

/** la junta — 1px stone hairline at 30%. */
export function Rule({ className = '' }: { className?: string }) {
  return <hr className={`junta ${className}`} />;
}
