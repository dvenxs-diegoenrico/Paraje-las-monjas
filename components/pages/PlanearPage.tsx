import { Eyebrow } from '@/components/base/Typography';
import { FAQ } from '@/components/content/FAQ';
import { FactCards, HowItWorks } from '@/components/content/Graphics';
import { Icon, type IconName } from '@/components/base/Icon';

const COURSE_ICON: IconName[] = ['crema', 'pasta', 'plato', 'ensalada'];
const TOC_ICON: IconName[] = ['personas', 'mesa', 'plato', 'chat'];
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

const anchors = ['capacidades', 'paquetes', 'menu', 'preguntas'];

export function PlanearPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const p = c.planearPage;
  const h = c.home.capacidades;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(c.faq.items)) }} />
      <PageHero locale={locale} eyebrow={p.eyebrow} title={p.title} intro={p.intro} backWord={locale === 'es' ? 'planear' : 'plan'} photo={images.salonPiedra} />

      <nav aria-label={p.eyebrow} className="container-lux">
        <ol className="t-nav flex flex-wrap gap-x-8 gap-y-2 border-y border-cantera/40 py-4">
          {p.toc.map((t, i) => (
            <li key={t}>
              <a href={`#${anchors[i]}`} className="group inline-flex min-h-[44px] items-center gap-2">
                <Icon name={TOC_ICON[i]} size={20} className="text-tabique" />
                <span className="link-grow">{t}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Proceso */}
      <section className="tex-cal py-20 lg:py-28" aria-labelledby="proceso-t">
        <div className="container-lux">
          <Eyebrow icon="catarina">{c.howItWorks.eyebrow}</Eyebrow>
          <h2 id="proceso-t" className="t-h2 mt-6 max-w-[20ch]">
            {c.howItWorks.title}
          </h2>
          <div className="mt-14">
            <HowItWorks c={c.howItWorks} />
          </div>
        </div>
      </section>

      {/* Capacidades */}
      <section id="capacidades" className="tex-cal scroll-mt-24 py-20 lg:py-28" aria-labelledby="cap-t">
        <div className="container-lux grid-lux gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Eyebrow icon="personas">{h.eyebrow}</Eyebrow>
            <h2 id="cap-t" className="t-h2 mt-6">
              {h.title}
            </h2>
            <p className="mt-6 text-piedra/85">{h.intro}</p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <ScaleTabs scales={c.scales} label={h.label} footnote={c.scalesFootnote} spacesLabel={h.spacesLabel} offerLabel={h.offerLabel} legend={c.dotsLegend} />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <p className="t-eyebrow mb-5 text-tabique">{p.includedTitle}</p>
            <FactCards facts={c.facts} />
          </div>
        </div>
      </section>

      {/* Paquetes */}
      <section id="paquetes" className="tex-claro relative scroll-mt-24 bg-cal-claro py-20 lg:py-28" aria-labelledby="paq-t">
        <div className="container-lux">
          <Eyebrow icon="mesa">{c.offers.eyebrow}</Eyebrow>
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
      <section id="menu" className="tex-cal relative scroll-mt-24 bg-cal py-20 lg:py-28" aria-labelledby="menu-t">
        <div className="container-lux grid-lux gap-y-12">
          <div className="col-span-4 md:col-span-3 lg:col-span-4">
            <Eyebrow icon="plato">{c.menu.eyebrow}</Eyebrow>
            <h2 id="menu-t" className="t-h2 mt-6">
              {c.menu.title}
            </h2>
            <p className="mt-6 text-piedra/85">{c.menu.intro}</p>
            <div className="mt-10 w-full md:w-2/3 md:max-w-[280px]">
              <ScallopImage photo={images.platillo} locale={locale} shape="arch" ratio="3:4" sizes="25vw" density={0.8} />
            </div>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-7 lg:col-start-6">
            <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
              {c.menu.courses.map((course, i) => (
                <div key={course.name} className="group border-t border-cantera/40 pt-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-cal-claro text-fronda">
                      <Icon name={COURSE_ICON[i]} size={26} />
                    </span>
                    <p className="t-caption text-tabique">0{i + 1}</p>
                  </div>
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
            <div className="shadow-lux mt-10 bg-cal-claro p-6 md:p-8">
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

      {/* Preguntas */}
      <section id="preguntas" className="tex-cal scroll-mt-24 bg-cal pb-28 pt-10 lg:pb-36" aria-labelledby="faq-t">
        <div className="container-lux grid-lux gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Eyebrow icon="chat">{c.faq.eyebrow}</Eyebrow>
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
