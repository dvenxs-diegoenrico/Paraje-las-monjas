import Link from 'next/link';
import { Eyebrow } from '@/components/base/Typography';
import { ScallopImage } from '@/components/media/ScallopImage';
import { Reveal } from '@/components/motion/Reveal';
import { priceFrom, type Content } from '@/content';
import { href, type Locale } from '@/lib/i18n';
import { images, type ImageKey } from '@/lib/images';

/** Two documented set-ups told as short case studies: scene, table, materials, service. */
export function Montajes({ locale, c }: { locale: Locale; c: Content }) {
  const m = c.montajes;
  const rows: [keyof Content['montajes']['labels'], 'scene' | 'table' | 'materials' | 'service'][] = [
    ['scene', 'scene'],
    ['table', 'table'],
    ['materials', 'materials'],
    ['service', 'service'],
  ];
  return (
    <section id="montajes" className="scroll-mt-24 bg-cal-claro py-24 lg:py-36" aria-labelledby="montajes-t">
      <div className="container-lux">
        <Reveal>
          <Eyebrow icon="mesa">{m.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 id="montajes-t" className="t-display mt-6 max-w-[16ch]">
            {m.title}
          </h2>
        </Reveal>
        <Reveal delay={0.2} as="p" className="measure mt-8 text-piedra/85">
          {m.intro}
        </Reveal>

        {m.items.map((it, i) => (
          <article key={it.id} className="mt-20 grid-lux items-center gap-y-10 lg:mt-32">
            <div className={`col-span-4 md:col-span-8 lg:col-span-7 ${i % 2 ? 'lg:order-2 lg:col-start-6' : ''}`}>
              <ScallopImage photo={images[it.image as ImageKey]} locale={locale} ratio="3:2" sizes="(min-width:1024px) 58vw, 100vw" />
              <p className="t-caption mt-3 text-piedra/70">{m.note}</p>
            </div>
            <div className={`col-span-4 md:col-span-8 lg:col-span-5 ${i % 2 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'} ${i % 2 ? '' : 'lg:-ml-2'}`}>
              <p className="t-caption text-tabique">0{i + 1}</p>
              <h3 className="mt-3 font-serif text-[clamp(34px,3.6vw,56px)] font-light leading-[1.02] tracking-[-0.01em]">{it.name}</h3>
              <p className="t-data mt-3 text-tabique">{priceFrom(c, it.price)}</p>
              <dl className="mt-8">
                {rows.map(([label, key]) => (
                  <div key={key} className="grid gap-1 border-t border-cantera/50 py-4 md:grid-cols-[8.5rem_1fr] md:gap-6">
                    <dt className="t-eyebrow text-tabique">{m.labels[label]}</dt>
                    <dd className="text-[15px] leading-snug">{it[key]}</dd>
                  </div>
                ))}
              </dl>
              <Link href={href(locale, 'planear', 'paquete-bodas-intimas')} className="link-grow t-nav mt-4 inline-flex min-h-[44px] items-center">
                {c.celebraciones.seeOffer}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Credits for the houses and crafts that are part of the packages. */
export function Credits({ c }: { c: Content }) {
  const p = c.partners;
  return (
    <section className="bg-cal py-20 lg:py-28" aria-labelledby="creditos-t">
      <div className="container-lux grid-lux gap-y-8">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <Eyebrow icon="mezcal">{p.eyebrow}</Eyebrow>
          <h2 id="creditos-t" className="t-h2 mt-6 max-w-[18ch]">
            {p.title}
          </h2>
          <p className="mt-4 text-piedra/80">{p.intro}</p>
        </div>
        <ul className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          {p.items.map((it) => (
            <li key={it.name} className="grid gap-2 border-t border-cantera/50 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
              <div>
                <p className="font-serif text-[32px] italic leading-none">{it.name}</p>
                <p className="t-caption mt-2 text-tabique">{it.role}</p>
              </div>
              <p className="text-[15px] leading-snug text-piedra/85">{it.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
