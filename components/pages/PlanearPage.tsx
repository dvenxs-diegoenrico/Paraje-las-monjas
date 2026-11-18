import { Eyebrow } from '@/components/base/Typography';
import { Valance } from '@/components/base/Valance';
import { FAQ } from '@/components/content/FAQ';
import { OfferCard } from '@/components/content/OfferCard';
import { PageHero } from '@/components/content/PageHero';
import { ScaleTabs } from '@/components/content/ScaleTabs';
import { VisitCTA } from '@/components/conversion/VisitCTA';
import { ScallopImage } from '@/components/media/ScallopImage';
import { Reveal } from '@/components/motion/Reveal';
import { formatPrice, getContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { images } from '@/lib/images';
import { faqJsonLd } from '@/lib/seo';

const anchors = ['capacidades', 'paquetes', 'menu', 'mobiliario', 'preguntas'];

export function PlanearPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const p = c.planearPage;
  const h = c.home.capacidades;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(c.faq.items)) }} />
      <PageHero locale={locale} eyebrow={p.eyebrow} title={p.title} intro={p.intro} backWord={locale === 'es' ? 'planear' : 'plan'} photo={images.mesaCristal} />

      <nav aria-label={p.eyebrow} className="container-lux">
        <ol className="t-nav flex flex-wrap gap-x-8 gap-y-2 border-y border-cantera/40 py-4">
          {p.toc.map((t, i) => (
            <li key={t}>
              <a href={`#${anchors[i]}`} className="link-grow inline-flex min-h-[44px] items-center gap-2">
                <span className="t-caption text-tabique">0{i + 1}</span> {t}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Capacidades */}
      <section id="capacidades" className="scroll-mt-24 py-20 lg:py-28" aria-labelledby="cap-t">
        <div className="container-lux grid-lux gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Eyebrow>{h.eyebrow}</Eyebrow>
            <h2 id="cap-t" className="t-h2 mt-6">
              {h.title}
            </h2>
            <p className="mt-6 text-piedra/85">{h.intro}</p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <ScaleTabs scales={c.scales} label={h.label} footnote={c.scalesFootnote} spacesLabel={h.spacesLabel} offerLabel={h.offerLabel} />
            <p className="t-eyebrow mt-14 text-tabique">{p.includedTitle}</p>
            <dl className="mt-4">
              {c.facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[9rem_1fr] gap-4 border-t border-cantera/30 py-4 md:grid-cols-[12rem_1fr]">
                  <dt className="t-data text-tabique">{f.k}</dt>
                  <dd className="t-data">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Paquetes */}
      <section id="paquetes" className="relative scroll-mt-24 bg-cal-claro py-20 lg:py-28" aria-labelledby="paq-t">
        <Valance color="var(--cal-claro)" />
        <div className="container-lux">
          <Eyebrow>{c.offers.eyebrow}</Eyebrow>
          <h2 id="paq-t" className="t-h2 mt-6">
            {c.celebraciones.title}
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {c.offers.items.map((o) => (
              <Reveal key={o.id}>
                <OfferCard offer={o} c={c} anchor surface="cal" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Menú */}
      <section id="menu" className="relative scroll-mt-24 bg-cal py-20 lg:py-28" aria-labelledby="menu-t">
        <Valance color="var(--cal)" />
        <div className="container-lux grid-lux gap-y-12">
          <div className="col-span-4 md:col-span-3 lg:col-span-4">
            <Eyebrow>{c.menu.eyebrow}</Eyebrow>
            <h2 id="menu-t" className="t-h2 mt-6">
              {c.menu.title}
            </h2>
            <p className="mt-6 text-piedra/85">{c.menu.intro}</p>
            <div className="mt-10 w-2/3 max-w-[280px]">
              <ScallopImage photo={images.platillo} locale={locale} shape="arch" ratio="3:4" sizes="25vw" density={0.8} />
            </div>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-7 lg:col-start-6">
            <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
              {c.menu.courses.map((course, i) => (
                <div key={course.name} className="border-t border-cantera/40 pt-5">
                  <p className="t-caption text-tabique">0{i + 1}</p>
                  <h3 className="mt-2 font-serif text-[28px] italic">{course.name}</h3>
                  <ul className="mt-3 space-y-1">
                    {course.options.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="t-data mt-10 border-t border-cantera/40 pt-5">{c.menu.drinks}</p>
            <div className="mt-10 bg-cal-claro p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-serif text-[28px]">{c.menu.kids.name}</h3>
                <p className="t-data text-tabique">
                  {formatPrice(c.menu.kids.price)} {c.menu.kids.unit}
                </p>
              </div>
              <ul className="mt-4 space-y-1 text-[15px]">
                {c.menu.kids.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <p className="t-caption mt-4 text-piedra/70">{c.pricesNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobiliario */}
      <section id="mobiliario" className="relative scroll-mt-24 bg-cal py-20 lg:py-28" aria-labelledby="mob-t">
        <div className="container-lux">
          <hr className="junta mb-16" />
          <Eyebrow>{c.catalogue.eyebrow}</Eyebrow>
          <h2 id="mob-t" className="t-h2 mt-6 max-w-[20ch]">
            {c.catalogue.title}
          </h2>
          <p className="t-caption mt-4 text-piedra/70">{c.catalogue.note}</p>
          <div className="mt-12 columns-1 gap-x-10 md:columns-2 lg:columns-3">
            {c.catalogue.groups.map((g) => (
              <div key={g.name} className="mb-10 break-inside-avoid">
                <h3 className="t-h3">{g.name}</h3>
                <dl className="mt-3">
                  {g.items.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 border-t border-cantera/30 py-2">
                      <dt className="text-[15px]">{k}</dt>
                      <dd className="t-data shrink-0 text-tabique">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preguntas */}
      <section id="preguntas" className="scroll-mt-24 bg-cal pb-28 pt-10 lg:pb-36" aria-labelledby="faq-t">
        <div className="container-lux grid-lux gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Eyebrow>{c.faq.eyebrow}</Eyebrow>
            <h2 id="faq-t" className="t-h2 mt-6">
              {c.faq.title}
            </h2>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <FAQ items={c.faq.items} />
          </div>
        </div>
      </section>

      <VisitCTA locale={locale} c={c} />
    </>
  );
}
