import { Icon } from '@/components/base/Icon';
import { Eyebrow } from '@/components/base/Typography';
import type { Content } from '@/content';

/**
 * Credibility near the top of the page. Press, awards and accreditations go in
 * `content/*.ts → press.items`; the strip stays hidden until real ones exist.
 * Everything else is limited to facts documented in the client's PDFs.
 */
export function TrustBar({ c }: { c: Pick<Content, 'trust' | 'press'> }) {
  const press = c.press.items;
  return (
    <section aria-label={c.trust.eyebrow} className="tex-cal bg-cal pt-16 lg:pt-24">
      <div className="container-lux">
        {press.length > 0 && (
          <div className="mb-14 border-b border-cantera/40 pb-10">
            <Eyebrow>{c.press.eyebrow}</Eyebrow>
            <ul className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-3">
              {press.map((p) => (
                <li key={p.name}>
                  <p className="font-serif text-[28px] italic leading-tight">{p.name}</p>
                  <p className="t-caption mt-1 text-piedra/70">{p.note}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Eyebrow icon="escudo">{c.trust.eyebrow}</Eyebrow>
        <ul data-observe="" className="stagger mt-8 grid gap-px bg-cantera/40 shadow-lux md:grid-cols-2 lg:grid-cols-4">
          {c.trust.items.map((it) => (
            <li key={it.t} className="tex-claro group flex flex-col gap-4 bg-cal-claro p-6 lg:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-cal text-fronda shadow-lux">
                <Icon name={it.icon} size={26} />
              </span>
              <h3 className="font-serif text-[24px] leading-tight">{it.t}</h3>
              <p className="text-[15px] leading-snug text-piedra/80">{it.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
