import { BRICK_REST, BRICK_TOP, LEAVES, MARK_VIEWBOX } from './mark-paths';

type Variant = 'horizontal' | 'vertical' | 'mark';
type Tone = 'dark' | 'light' | 'mono';

const tones = {
  dark: { top: 'var(--viga)', brick: 'var(--tabique)', leaf: 'var(--fronda)', word: 'var(--piedra)', monjas: 'var(--fronda)', jardin: 'var(--piedra)' },
  light: { top: '#C4694A', brick: '#C4694A', leaf: '#7C9A83', word: 'var(--cal)', monjas: 'var(--cal)', jardin: 'var(--cal)' },
  mono: { top: 'var(--piedra)', brick: 'var(--piedra)', leaf: 'var(--piedra)', word: 'var(--piedra)', monjas: 'var(--piedra)', jardin: 'var(--piedra)' },
} as const;

export function Mark({ tone = 'dark', className }: { tone?: Tone; className?: string }) {
  const t = tones[tone];
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      <path fill={t.top} d={BRICK_TOP} />
      <path fill={t.brick} d={BRICK_REST} />
      <path fill={t.leaf} d={LEAVES} />
    </svg>
  );
}

/**
 * Logo with live wordmark text (Newsreader / Hanken Grotesk / DM Mono).
 * Outlined SVG files for print and third parties live in /public/brand.
 * Clear space = height of the top brick row; min widths: mark 24px, horizontal 140px.
 */
export function Logo({
  variant = 'horizontal',
  tone = 'dark',
  label = 'Paraje Las Monjas, jardín en Atlixco',
  className = '',
}: {
  variant?: Variant;
  tone?: Tone;
  label?: string;
  className?: string;
}) {
  const t = tones[tone];
  if (variant === 'mark') {
    return (
      <span role="img" aria-label={label} className={`inline-block ${className}`}>
        <Mark tone={tone} className="block h-full w-full" />
      </span>
    );
  }
  const vertical = variant === 'vertical';
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-flex select-none ${vertical ? 'flex-col items-center text-center' : 'items-center gap-[0.7em]'} ${className}`}
    >
      <Mark tone={tone} className={vertical ? 'w-[3.9em]' : 'h-[2.55em] w-auto shrink-0'} />
      <span aria-hidden="true" className={`flex flex-col ${vertical ? 'items-center' : 'items-start'}`}>
        <span className="font-serif leading-[0.9]" style={{ color: t.word, fontSize: vertical ? '2.25em' : '1.62em', fontWeight: 400, letterSpacing: '-0.01em' }}>
          Paraje
        </span>
        <span className="font-sans uppercase" style={{ color: t.monjas, fontSize: vertical ? '0.62em' : '0.5em', fontWeight: 500, letterSpacing: '0.42em', marginRight: '-0.42em', marginTop: '0.35em' }}>
          Las Monjas
        </span>
        <span className="mt-[0.3em] block h-px w-full" style={{ background: 'var(--cantera)', opacity: tone === 'light' ? 0.5 : 1 }} />
        <span className="font-mono uppercase" style={{ color: t.jardin, fontSize: vertical ? '0.4em' : '0.34em', letterSpacing: '0.24em', marginRight: '-0.24em', marginTop: '0.35em' }}>
          Jardín
        </span>
      </span>
    </span>
  );
}
