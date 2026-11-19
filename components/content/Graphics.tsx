/**
 * Explanatory graphics: they say with drawing what the copy says with words.
 * All server components; motion is CSS driven by the single InViewObserver.
 */
import { Icon, type IconName } from '@/components/base/Icon';
import type { Content } from '@/content';
import { spaceIcon } from '@/components/content/spaceIcon';

export { spaceIcon };

/* ------------------------------------------------------------ helpers */
const RULES: [RegExp, IconName][] = [
  [/mezcal/i, 'mezcal'],
  [/brindis|toast|espumoso|sparkling/i, 'brindis'],
  [/silla|chair/i, 'silla'],
  [/mesa|table/i, 'mesa'],
  [/mantel|camino|runner|cloth|overlay|servillet|napkin|linen|lino/i, 'mantel'],
  [/cocina|kitchen|gas/i, 'flama'],
  [/tinas|cooling|hielo|ice/i, 'hielo'],
  [/baño|restroom|papel|toilet/i, 'bano'],
  [/estacionamiento|parking/i, 'auto'],
  [/vigilancia|security/i, 'escudo'],
  [/mesero|waiter|coordinador/i, 'personas'],
  [/menú|menu|banquete|dinner|tres tiempos|three-course|crema|soup/i, 'plato'],
  [/loza|china|tableware|cubiertos|cutlery/i, 'plato'],
  [/copa|glass|vaso/i, 'copa'],
  [/agua|refresco|water|drinks|soft/i, 'copa'],
  [/flores|flower|arco de follaje|foliage|centros|centrepiece/i, 'flor'],
  [/ceremonia|ceremony|juez|judge/i, 'arco'],
  [/coffee|café|pan dulce/i, 'cafe'],
  [/proyector|projector|bocina|speaker/i, 'proyector'],
  [/techada|covered/i, 'pabellon'],
  [/montaje|set-up/i, 'silla'],
];
export function iconFor(text: string): IconName {
  for (const [re, name] of RULES) if (re.test(text)) return name;
  return 'hoja';
}

/* ------------------------------------------------------------ inclusions as icon chips */
export function IconList({ items, cols = 2 }: { items: string[]; cols?: 1 | 2 }) {
  return (
    <ul data-observe="" className={`stagger grid gap-x-6 gap-y-3 ${cols === 2 ? 'md:grid-cols-2' : ''}`}>
      {items.map((it) => (
        <li key={it} className="group flex items-start gap-3 text-[15px] leading-snug">
          <span className="mt-[-2px] grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cal text-fronda shadow-lux">
            <Icon name={iconFor(it)} size={18} />
          </span>
          <span className="pt-1">{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------ documented facts as cards */
export function FactCards({ facts, dark = false }: { facts: Content['facts']; dark?: boolean }) {
  return (
    <ul data-observe="" className="stagger shadow-lux grid grid-cols-2 gap-px overflow-hidden bg-cantera/40 md:grid-cols-3 lg:grid-cols-5 [&>li:last-child]:col-span-2 md:[&>li:last-child]:col-span-1">
      {facts.map((f) => (
        <li key={f.k} className={`group flex flex-col gap-4 p-5 lg:p-6 ${dark ? 'bg-piedra' : 'bg-cal'}`}>
          <span className={`grid h-12 w-12 place-items-center rounded-full ${dark ? 'bg-cal/10 text-cal' : 'bg-cal-claro text-fronda'}`}>
            <Icon name={f.icon} size={26} />
          </span>
          <span className="t-eyebrow text-tabique">{f.k}</span>
          <span className="t-data">{f.v}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------ how it works */
export function HowItWorks({ c }: { c: Content['howItWorks'] }) {
  return (
    <div data-observe="">
      <div className="relative">
        {/* the path that joins the steps draws itself */}
        <svg aria-hidden="true" className="pointer-events-none absolute left-0 top-[28px] hidden h-10 w-full lg:block" viewBox="0 0 1000 40" preserveAspectRatio="none">
          <path d="M60 20 C 200 -5, 300 45, 375 20 S 560 -5, 625 20 S 820 45, 940 20" fill="none" stroke="var(--cantera)" strokeWidth="1.25" strokeDasharray="0" pathLength={1} className="line-draw" vectorEffect="non-scaling-stroke" />
        </svg>
        <ol className="stagger relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {c.steps.map((s, i) => (
            <li key={s.t} className="group relative flex flex-col items-start gap-5 lg:items-center lg:text-center">
              <span className="live relative grid h-14 w-14 place-items-center rounded-full bg-cal-claro text-fronda shadow-lux ring-1 ring-cantera/60">
                <Icon name={s.icon} size={28} />
                <span className="t-caption absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-catarina text-[11px] text-cal-claro">{i + 1}</span>
              </span>
              <h3 className="font-serif text-[26px] leading-tight">{s.t}</h3>
              <p className="max-w-[30ch] text-[15px] text-piedra/80">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ the four spaces, grouped */
function SpaceGroup({ title, list, icon, base }: { title: string; list: Content['spaces']; icon: IconName; base: string }) {
  return (
    <div className="shadow-lux relative flex-1 border border-cantera/50 bg-cal-claro p-5 lg:p-6">
      <p className="t-eyebrow flex items-center gap-2 text-tabique">
        <Icon name={icon} size={18} /> {title}
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-4">
        {list.map((s) => (
          <li key={s.id} className="group">
            <a href={`${base}#${s.id}`} className="flex flex-col items-start gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-cal text-fronda transition-colors duration-500 group-hover:bg-fronda group-hover:text-cal">
                <Icon name={spaceIcon(s.name)} size={30} />
              </span>
              <span className="font-serif text-[20px] leading-tight">{s.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SpacesDiagram({ spaces, g, base = '' }: { spaces: Content['spaces']; g: Content['spacesGroups']; base?: string }) {
  const roof = spaces.slice(0, 2);
  const open = spaces.slice(2);
  return (
    <figure data-observe="" className="rise-in">
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
        <SpaceGroup title={g.roof} list={roof} icon="pabellon" base={base} />
        {/* walking path between the two halves */}
        <svg aria-hidden="true" viewBox="0 0 80 24" className="mx-auto h-6 w-20 rotate-90 text-tabique md:rotate-0">
          <path d="M2 12 C 20 2, 40 22, 62 12" fill="none" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 4" strokeLinecap="round" />
          <path d="M58 7 l7 5 -7 5" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
        <SpaceGroup title={g.open} list={open} icon="sol" base={base} />
      </div>
      <figcaption className="t-caption mt-4 text-piedra/70">{g.caption}</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------ textures */
export function Motes({ count = 14 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="motes pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${30 + ((i * 53) % 70)}%`,
            animationDelay: `${(i * 1.7) % 14}s`,
            animationDuration: `${12 + (i % 5) * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

/** A small catarina — the "monja" of the name — that walks across a section. */
export function Walker({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute h-[80px] w-[760px] max-w-full ${className}`}>
      <span className="walker absolute left-0 top-0 block text-catarina">
        <svg viewBox="0 0 24 24" width="22" height="22" className="block">
          <path d="M12 6.5c3.6 0 6 2.9 6 6.6S15.4 20 12 20s-6-3.2-6-6.9 2.4-6.6 6-6.6Z" fill="currentColor" />
          <path d="M9.6 6.9a2.6 2.6 0 0 1 4.8 0Z" fill="var(--piedra)" />
          <path d="M12 6.5V20" stroke="var(--piedra)" strokeWidth="0.8" />
          <circle cx="9.2" cy="11" r="1" fill="var(--piedra)" />
          <circle cx="14.8" cy="11" r="1" fill="var(--piedra)" />
          <circle cx="9" cy="15.4" r="0.9" fill="var(--piedra)" />
          <circle cx="15" cy="15.4" r="0.9" fill="var(--piedra)" />
        </svg>
      </span>
    </div>
  );
}
