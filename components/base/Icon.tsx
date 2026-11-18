/**
 * Paraje line icons. 24×24, 1.25px stroke, round caps — drawn like the junta.
 * Every stroke has pathLength=1 so CSS can "draw" it when the icon enters the
 * viewport (see `.draw` in globals.css + components/motion/InViewObserver).
 * Fills (`f`) appear after the strokes; `anim` adds a small idle motion class.
 */
import type { ReactNode } from 'react';

type Def = { d: ReactNode; anim?: string };

const P = ({ d, f }: { d: string; f?: boolean }) => <path d={d} pathLength={1} className={f ? 'fill-[currentColor] icon-fill' : undefined} />;
const C = ({ cx, cy, r, f }: { cx: number; cy: number; r: number; f?: boolean }) => <circle cx={cx} cy={cy} r={r} pathLength={1} className={f ? 'fill-[currentColor] icon-fill' : undefined} />;

export const ICONS = {
  catarina: {
    anim: 'icon-wander',
    d: (
      <>
        <P d="M12 6.5c3.6 0 6 2.9 6 6.6S15.4 20 12 20s-6-3.2-6-6.9 2.4-6.6 6-6.6Z" />
        <P d="M12 6.5V20" />
        <P d="M9.6 6.9a2.6 2.6 0 0 1 4.8 0" />
        <P d="M10.4 4.6 9.2 3.2M13.6 4.6l1.2-1.4" />
        <C cx={9.2} cy={11} r={0.9} f />
        <C cx={14.8} cy={11} r={0.9} f />
        <C cx={8.9} cy={15.4} r={0.8} f />
        <C cx={15.1} cy={15.4} r={0.8} f />
      </>
    ),
  },
  ladrillo: {
    d: (
      <>
        <P d="M3 6h18v4H3zM3 10h18v4H3zM3 14h18v4H3z" />
        <P d="M12 6v4M7.5 10v4M16.5 10v4M12 14v4" />
      </>
    ),
  },
  hoja: {
    anim: 'icon-sway',
    d: (
      <>
        <P d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z" />
        <P d="M5 19 14 10M9.5 14.5h3.2M12 12V9" />
      </>
    ),
  },
  arco: {
    d: (
      <>
        <P d="M5 20V11a7 7 0 0 1 14 0v9" />
        <P d="M8.5 20v-8.5a3.5 3.5 0 0 1 7 0V20" />
        <P d="M3 20h18" />
      </>
    ),
  },
  pabellon: {
    anim: 'icon-glint',
    d: (
      <>
        <P d="M3 10 12 4l9 6" />
        <P d="M5 9v11h14V9" />
        <P d="M9.7 20v-9M14.3 20v-9M5 14.5h14" />
        <P d="m6.8 12.6 1.4-1.4" />
      </>
    ),
  },
  arbol: {
    anim: 'icon-sway',
    d: (
      <>
        <P d="M12 21v-6M12 17l-2.5-2M12 16.2l2.4-1.8" />
        <P d="M7.2 14.6a4 4 0 0 1-.6-7.4A5 5 0 0 1 16 5.6a4 4 0 0 1 1.6 7.6 3.4 3.4 0 0 1-3 1.6H9.6a3.3 3.3 0 0 1-2.4-.2Z" />
        <P d="M4 21h16" />
      </>
    ),
  },
  cipres: {
    anim: 'icon-sway',
    d: (
      <>
        <P d="M8 19c-2 0-2.6-3-2.6-6.5S6.6 4 8 3c1.4 1 2.6 6 2.6 9.5S10 19 8 19Z" />
        <P d="M16.5 19c-1.8 0-2.3-2.6-2.3-5.6s1-6.6 2.3-7.4c1.3.8 2.3 4.4 2.3 7.4s-.5 5.6-2.3 5.6Z" />
        <P d="M3 21h18M8 21v-2M16.5 21v-2" />
      </>
    ),
  },
  fuente: {
    anim: 'icon-jet',
    d: (
      <>
        <P d="M4 15h16l-1.5 3.5h-13Z" />
        <P d="M9 18.5 8.5 21h7l-.5-2.5" />
        <P d="M12 15V6M12 6c-1.4-1.6-3.6-1.4-4 1M12 6c1.4-1.6 3.6-1.4 4 1" />
        <P d="M8 9.5v2M16 9.5v2" />
      </>
    ),
  },
  mesa: {
    d: (
      <>
        <P d="M3 10.5c0-1.4 4-2.5 9-2.5s9 1.1 9 2.5-4 2.5-9 2.5-9-1.1-9-2.5Z" />
        <P d="M12 13v7M8.5 20h7" />
        <P d="M8 6.5v1.4M12 5.6v1.6M16 6.5v1.4" />
      </>
    ),
  },
  silla: {
    d: (
      <>
        <P d="M7 21V4.5h10V21" />
        <P d="M7 13h10M7 8h10M10.3 4.5V13M13.7 4.5V13" />
        <P d="M7 16h10" />
      </>
    ),
  },
  copa: {
    anim: 'icon-tilt',
    d: (
      <>
        <P d="M8 3h8l-.4 4.8A3.6 3.6 0 0 1 12 11.2a3.6 3.6 0 0 1-3.6-3.4Z" />
        <P d="M12 11.2V20M8.5 20h7" />
        <P d="M8.4 6.6h7.2" />
      </>
    ),
  },
  mezcal: {
    d: (
      <>
        <P d="M10.5 3h3v3.2c2 1 3 2.4 3 4.6V21h-9V10.8c0-2.2 1-3.6 3-4.6Z" />
        <P d="M7.5 13h9M7.5 17.5h9" />
      </>
    ),
  },
  auto: {
    d: (
      <>
        <P d="M4 16v-3.2l1.8-4.4A2 2 0 0 1 7.6 7h8.8a2 2 0 0 1 1.8 1.4L20 12.8V16Z" />
        <P d="M4 12.8h16" />
        <C cx={7.6} cy={16.8} r={1.6} />
        <C cx={16.4} cy={16.8} r={1.6} />
      </>
    ),
  },
  escudo: {
    d: (
      <>
        <P d="M12 3 5 5.8v5.4c0 4.3 3 7.7 7 9.8 4-2.1 7-5.5 7-9.8V5.8Z" />
        <P d="m9 12 2.2 2.2L15.4 10" />
      </>
    ),
  },
  bano: {
    d: (
      <>
        <C cx={8} cy={5.4} r={1.6} />
        <C cx={16} cy={5.4} r={1.6} />
        <P d="M6.2 21v-6.5H5.4V10a1.6 1.6 0 0 1 1.6-1.6h2A1.6 1.6 0 0 1 10.6 10v4.5h-.8V21" />
        <P d="M14.6 21v-4.2h-2l2.2-6.8A1.6 1.6 0 0 1 16.3 9h-.6a1.6 1.6 0 0 1 1.5 1l2.2 6.8h-2V21" />
        <P d="M12 3v18" />
      </>
    ),
  },
  flama: {
    anim: 'icon-flicker',
    d: (
      <>
        <P d="M12 21c-3.3 0-5.5-2.3-5.5-5.4 0-3.4 3-5.3 3.4-9.6 2.6 1.7 4.2 4 4.2 6.3.8-.6 1.3-1.6 1.5-2.6 1.3 1.4 1.9 3.3 1.9 5.2 0 3.6-2.2 6.1-5.5 6.1Z" />
        <P d="M12 21c-1.4 0-2.3-1-2.3-2.4 0-1.6 1.3-2.4 2.3-4 1 1.6 2.3 2.4 2.3 4 0 1.4-.9 2.4-2.3 2.4Z" />
      </>
    ),
  },
  hielo: {
    anim: 'icon-spin',
    d: (
      <>
        <P d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
        <P d="m9.8 4.3 2.2 2 2.2-2M9.8 19.7l2.2-2 2.2 2" />
      </>
    ),
  },
  reloj: {
    anim: 'icon-tick',
    d: (
      <>
        <C cx={12} cy={12} r={8.5} />
        <P d="M12 7v5l3.2 2" />
      </>
    ),
  },
  personas: {
    d: (
      <>
        <C cx={9} cy={8} r={3} />
        <P d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
        <C cx={16.6} cy={9.2} r={2.4} />
        <P d="M15.6 14.7c2.8-.4 5 1.6 5 4.8" />
      </>
    ),
  },
  calendario: {
    anim: 'icon-flip',
    d: (
      <>
        <P d="M4 6.5h16V20H4Z" />
        <P d="M4 10.5h16M8.5 4v4M15.5 4v4" />
        <C cx={12} cy={15} r={1.5} f />
      </>
    ),
  },
  chat: {
    anim: 'icon-bob',
    d: (
      <>
        <P d="M12 4a8 8 0 0 0-6.9 12L4 20l4.2-1.1A8 8 0 1 0 12 4Z" />
        <P d="M9 10.6c.3 1.8 1.6 3.3 3.6 4 .6.2 1.2 0 1.6-.5l.5-.6-1.7-1-.7.6c-.8-.4-1.4-1-1.8-1.8l.6-.7-1-1.7-.6.5c-.4.3-.6.7-.5 1.2Z" />
      </>
    ),
  },
  pin: {
    anim: 'icon-bob',
    d: (
      <>
        <P d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
        <C cx={12} cy={10} r={2.4} />
      </>
    ),
  },
  cafe: {
    anim: 'icon-steam',
    d: (
      <>
        <P d="M5 10h11v4.5A5.5 5.5 0 0 1 10.5 20 5.5 5.5 0 0 1 5 14.5Z" />
        <P d="M16 11.5h1.6a2.2 2.2 0 0 1 0 4.4H16" />
        <P d="M8.5 3.5c-.8 1 .8 2 0 3M12 3.5c-.8 1 .8 2 0 3" />
      </>
    ),
  },
  proyector: {
    d: (
      <>
        <P d="M3 5h18M4.5 5v10h15V5" />
        <P d="M12 15v3M9 21l3-3 3 3" />
        <P d="m8 12 3-3 2 2 3-3" />
      </>
    ),
  },
  crema: {
    anim: 'icon-steam',
    d: (
      <>
        <P d="M3 11h18a9 9 0 0 1-18 0Z" />
        <P d="M8 19.5h8" />
        <P d="M9 3.5c-.8 1 .8 2 0 3M12.5 3.5c-.8 1 .8 2 0 3M16 3.5c-.8 1 .8 2 0 3" />
      </>
    ),
  },
  pasta: {
    d: (
      <>
        <P d="M3 13h18c0 3.9-4 7-9 7s-9-3.1-9-7Z" />
        <P d="M8 13c0-2 1.8-3 4-3s4 1 4 3M10 13c0-1 .9-1.6 2-1.6s2 .6 2 1.6" />
        <P d="M17 4l-4.2 7.4M19.2 5.4l-5.6 6.4" />
      </>
    ),
  },
  plato: {
    d: (
      <>
        <C cx={12} cy={12} r={6} />
        <C cx={12} cy={12} r={8.8} />
        <P d="M2 4v5.4M2 6.8h0M21.6 4v16M21.6 4c-1.4.6-1.8 3-1.8 5.4h1.8" />
      </>
    ),
  },
  ensalada: {
    anim: 'icon-sway',
    d: (
      <>
        <P d="M3 12h18a9 9 0 0 1-18 0Z" />
        <P d="M7 12c-.6-2.4.6-4.6 3-5.2 0 2.4-1 4.2-3 5.2ZM12 12c0-3 1.6-5.4 4.4-6-.2 2.8-1.6 5-4.4 6Z" />
        <C cx={15.5} cy={10.4} r={1} f />
      </>
    ),
  },
  sol: {
    anim: 'icon-spin',
    d: (
      <>
        <C cx={12} cy={12} r={4} />
        <P d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
      </>
    ),
  },
  amanecer: {
    anim: 'icon-rise',
    d: (
      <>
        <P d="M2.5 17h19M5 20.5h14" />
        <P d="M7 17a5 5 0 0 1 10 0" />
        <P d="M12 6.5v2.4M5.6 9.6l1.6 1.4M18.4 9.6 16.8 11" />
      </>
    ),
  },
  luna: {
    d: (
      <>
        <P d="M19 14.6A7.5 7.5 0 0 1 9.4 5a7.5 7.5 0 1 0 9.6 9.6Z" />
        <P d="M16 4.5v2M15 5.5h2" />
      </>
    ),
  },
  brindis: {
    anim: 'icon-tilt',
    d: (
      <>
        <P d="M5.4 6 9 5l1.6 5.2a2.6 2.6 0 0 1-1.8 3.2 2.6 2.6 0 0 1-3.2-1.8Z" />
        <P d="M18.6 6 15 5l-1.6 5.2a2.6 2.6 0 0 0 1.8 3.2 2.6 2.6 0 0 0 3.2-1.8Z" />
        <P d="M7.6 13.6 9 19M16.4 13.6 15 19M7 19.5h3.4M13.6 19.5H17" />
        <P d="M12 2.5v2M9.6 3.2l.6.8M14.4 3.2l-.6.8" />
      </>
    ),
  },
  flor: {
    anim: 'icon-sway',
    d: (
      <>
        <C cx={12} cy={8} r={1.6} f />
        <P d="M12 6.4c-1-2.6 2-2.6 1-0M13.6 8c2.6-1 2.6 2 0 1M12 9.6c1 2.6-2 2.6-1 0M10.4 8c-2.6 1-2.6-2 0-1" />
        <P d="M12 10v11M12 16c-2.6 0-4-1.4-4.4-3.6 2.4 0 3.8 1.2 4.4 3.6ZM12 18c2.4 0 3.6-1.2 4-3.2-2.2 0-3.4 1-4 3.2Z" />
      </>
    ),
  },
  musica: {
    d: (
      <>
        <P d="M9 18V5.5l11-2V16" />
        <C cx={6.5} cy={18} r={2.5} />
        <C cx={17.5} cy={16} r={2.5} />
        <P d="M9 9.5l11-2" />
      </>
    ),
  },
  camara: {
    d: (
      <>
        <P d="M3 8h4l1.6-2.5h6.8L17 8h4v11H3Z" />
        <C cx={12} cy={13.4} r={3.6} />
      </>
    ),
  },
  mantel: {
    d: (
      <>
        <P d="M3 6h18v8.5l-1.5 3-1.5-3-1.5 3-1.5-3-1.5 3-1.5-3-1.5 3-1.5-3-1.5 3-1.5-3-1.5 3L3 14.5Z" />
        <P d="M3 10h18" />
      </>
    ),
  },
  sobre: {
    anim: 'icon-bob',
    d: (
      <>
        <P d="M3 6h18v12H3Z" />
        <P d="m3 6 9 7 9-7" />
      </>
    ),
  },
  flecha: {
    d: <P d="M4 12h15M14 6.5l5.5 5.5-5.5 5.5" />,
  },
  mas: {
    d: <P d="M12 5v14M5 12h14" />,
  },
} satisfies Record<string, Def>;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  size = 24,
  className = '',
  draw = true,
  idle = true,
  label,
}: {
  name: IconName;
  size?: number;
  className?: string;
  /** stroke-draw when it scrolls into view */
  draw?: boolean;
  /** small looping motion (sway, steam…) where the icon has one */
  idle?: boolean;
  label?: string;
}) {
  const def = ICONS[name] as Def;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      data-observe={draw ? '' : undefined}
      className={`icon ${draw ? 'draw' : ''} ${idle && def.anim ? def.anim : ''} shrink-0 overflow-visible ${className}`}
    >
      {def.d}
    </svg>
  );
}
