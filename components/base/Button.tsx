import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { Icon, type IconName } from '@/components/base/Icon';

type Tone = 'piedra' | 'cal' | 'fronda';

const tones: Record<Tone, { base: string; sweep: string; dot: string }> = {
  piedra: { base: 'bg-piedra text-cal', sweep: 'bg-fronda', dot: 'bg-catarina' },
  fronda: { base: 'bg-fronda text-cal', sweep: 'bg-piedra', dot: 'bg-catarina' },
  cal: { base: 'bg-cal text-piedra', sweep: 'bg-cal-claro', dot: 'bg-catarina' },
};

/**
 * Primary button: square body with scalloped ends (same bump language as the
 * image crops). Hover: a fill rises from the base over 700ms.
 */
function Inner({ children, tone, dot, icon }: { children: ReactNode; tone: Tone; dot?: boolean; icon?: IconName }) {
  const t = tones[tone];
  return (
    <>
      <span aria-hidden="true" className={`absolute inset-0 translate-y-full ${t.sweep} transition-transform duration-700 ease-lux group-hover:translate-y-0 group-focus-visible:translate-y-0`} />
      <span className="relative inline-flex items-center gap-3">
        {dot && <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${t.dot} transition-transform duration-700 ease-lux group-hover:scale-150`} />}
        {icon && <Icon name={icon} size={18} draw={false} className="-my-1" />}
        {children}
      </span>
    </>
  );
}

const cls = (tone: Tone, extra = '') =>
  `group scallop-x relative inline-flex h-[52px] min-w-[44px] items-center justify-center overflow-hidden px-8 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap ${tones[tone].base} ${extra}`;

export function ButtonLink({
  tone = 'piedra',
  dot = true,
  className = '',
  children,
  icon,
  ...props
}: ComponentProps<typeof Link> & { tone?: Tone; dot?: boolean; icon?: IconName }) {
  return (
    <Link className={cls(tone, className)} {...props}>
      <Inner tone={tone} dot={dot && !icon} icon={icon}>
        {children}
      </Inner>
    </Link>
  );
}

export function ButtonA({ tone = 'piedra', dot = true, className = '', icon, children, ...props }: ComponentProps<'a'> & { tone?: Tone; dot?: boolean; icon?: IconName }) {
  return (
    <a className={cls(tone, className)} {...props}>
      <Inner tone={tone} dot={dot && !icon} icon={icon}>
        {children}
      </Inner>
    </a>
  );
}

export function Button({ tone = 'piedra', dot = true, className = '', icon, children, ...props }: ComponentProps<'button'> & { tone?: Tone; dot?: boolean; icon?: IconName }) {
  return (
    <button className={cls(tone, `${className} disabled:opacity-60`)} {...props}>
      <Inner tone={tone} dot={dot && !icon} icon={icon}>
        {children}
      </Inner>
    </button>
  );
}

/** Secondary action: text with a growing underline and a quiet arrow. */
export function TextLink({ className = '', children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link className={`group inline-flex min-h-[44px] items-center gap-2 t-nav ${className}`} {...props}>
      <span className="link-grow">{children}</span>
      <Icon name="flecha" size={18} draw={false} className="btn-icon" />
    </Link>
  );
}
