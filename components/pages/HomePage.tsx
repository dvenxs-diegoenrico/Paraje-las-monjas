import Image from 'next/image';
import { TextLink } from '@/components/base/Button';
import { Eyebrow } from '@/components/base/Typography';
import { Valance } from '@/components/base/Valance';
import { CrossFade } from '@/components/content/CrossFade';
import { Hero } from '@/components/content/Hero';
import { EditorialTriptych, GalleryMosaic, Manifesto, Philosophy, SpacesShowcase } from '@/components/content/HomeSections';
import { ScaleTabs } from '@/components/content/ScaleTabs';
import { FactCards, HowItWorks } from '@/components/content/Graphics';
import { Icon } from '@/components/base/Icon';
import { VisitCTA } from '@/components/conversion/VisitCTA';
import { scallopStyle } from '@/components/media/ScallopImage';
import { Reveal } from '@/components/motion/Reveal';
import { getContent } from '@/content';
import { href, type Locale } from '@/lib/i18n';
import { images } from '@/lib/images';
import { scallopMask } from '@/lib/scallop';

export function HomePage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const h = c.home;
  return (
    <>
      <Hero locale={locale} c={h.hero} archMask={scallopMask('arch', 1 / 1.3, 1)} sealMask={scallopMask('circle', 1, 1.6)} />
      <Manifesto c={h.manifesto} />
      <SpacesShowcase locale={locale} c={h.lugar} spaces={c.spaces} groups={c.spacesGroups} />
      <EditorialTriptych locale={locale} c={h.editorial} />

      {/* 5 · Adentro y afuera */}
      <section className="on-dark relative bg-fronda py-28 text-cal lg:py-40" aria-labelledby="adentro">
        <Valance color="var(--fronda)" />
        <div className="container-lux grid-lux items-center gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Reveal>
              <Eyebrow tone="cantera" icon="pabellon">{h.adentro.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="adentro" className="t-h2 mt-6">
                {h.adentro.title}
              </h2>
            </Reveal>
            {h.adentro.body.map((p, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1} as="p" className="measure mt-6 text-cal/85">
                {p}
              </Reveal>
            ))}
            <div data-observe="" className="stagger mt-10 flex items-center gap-4 text-cal">
              <span className="live grid h-16 w-16 place-items-center rounded-full bg-cal/10"><Icon name="pabellon" size={30} /></span>
              <svg aria-hidden="true" viewBox="0 0 60 12" className="h-3 w-16 text-cantera"><path d="M1 6h50M46 1l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" className="icon-dash" /></svg>
              <span className="live grid h-16 w-16 place-items-center rounded-full bg-cal/10"><Icon name="arbol" size={30} /></span>
            </div>
            <div className="mt-10 text-cal">
              <TextLink href={href(locale, 'lugar', 'pabellon-de-cristal')}>{h.adentro.link}</TextLink>
            </div>
          </div>
          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-8">
            <CrossFade
              className="aspect-[4/5] w-full"
              slides={[images.pabellonCristal, images.mesaCristal].map((p, i) => (
                <div key={p.id} className="h-full w-full" style={scallopStyle('arch', '4:5', 0.9)}>
                  <Image src={p.src} width={p.width} height={p.height} alt={i === 0 ? p.alt[locale] : ''} sizes="(min-width:1024px) 40vw, 90vw" placeholder="blur" blurDataURL={p.blurDataURL} className="h-full w-full object-cover" />
                </div>
              ))}
            />
            <p className="t-caption mt-4 text-cantera">{images.pabellonCristal.caption[locale]}</p>
          </div>
        </div>
      </section>

      {/* 6 · Capacidades */}
      <section className="relative bg-cal py-28 lg:py-40" aria-labelledby="capacidades">
        <Valance color="var(--cal)" />
        <div className="container-lux grid-lux gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Reveal>
              <Eyebrow icon="personas">{h.capacidades.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="capacidades" className="t-h2 mt-6">
                {h.capacidades.title}
              </h2>
            </Reveal>
            <Reveal delay={0.2} as="p" className="mt-6 text-piedra/85">
              {h.capacidades.intro}
            </Reveal>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <ScaleTabs scales={c.scales} label={h.capacidades.label} footnote={c.scalesFootnote} spacesLabel={h.capacidades.spacesLabel} offerLabel={h.capacidades.offerLabel} legend={c.dotsLegend} />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-12 mt-6">
            <p className="t-eyebrow mb-5 text-tabique">{h.capacidades.factsTitle}</p>
            <FactCards facts={c.facts} />
            <div className="mt-8">
                <TextLink href={href(locale, 'planear')}>{h.capacidades.link}</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="relative bg-cal pb-28 lg:pb-36" aria-labelledby="como">
        <div className="container-lux">
          <hr className="junta mb-16" />
          <Reveal>
            <Eyebrow icon="catarina">{c.howItWorks.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="como" className="t-h2 mt-6 max-w-[18ch]">
              {c.howItWorks.title}
            </h2>
          </Reveal>
          <div className="mt-14">
            <HowItWorks c={c.howItWorks} />
          </div>
        </div>
      </section>

      <GalleryMosaic locale={locale} c={h.galeria} />
      <Philosophy c={h.filosofia} />
      <VisitCTA locale={locale} c={c} />
    </>
  );
}
