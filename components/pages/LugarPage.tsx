import { Eyebrow } from '@/components/base/Typography';
import { PageHero } from '@/components/content/PageHero';
import { VisitCTA } from '@/components/conversion/VisitCTA';
import { ScallopImage } from '@/components/media/ScallopImage';
import { Reveal } from '@/components/motion/Reveal';
import { Mark } from '@/components/brand/Logo';
import { getContent } from '@/content';
import { SpacesDiagram, spaceIcon } from '@/components/content/Graphics';
import { Icon, type IconName } from '@/components/base/Icon';

const MATERIAL_ICON: IconName[] = ['ladrillo', 'arco', 'hoja', 'pabellon'];
import type { Locale } from '@/lib/i18n';
import { images, type ImageKey } from '@/lib/images';

export function LugarPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const p = c.lugarPage;
  const extra: Record<string, ImageKey> = { 'salon-de-pilares': 'salonPiedra', 'pabellon-de-cristal': 'mesaLarga', 'el-arbolado': 'arboladoFuente', 'la-pradera': 'praderaSetos' };
  return (
    <>
      <PageHero locale={locale} eyebrow={p.eyebrow} title={p.title} intro={p.intro} backWord={locale === 'es' ? 'el lugar' : 'the place'} photo={images.pabellonCristal} />

      <div className="container-lux pb-8">
        <SpacesDiagram spaces={c.spaces} g={c.spacesGroups} />
      </div>

      {c.spaces.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={s.id} id={s.id} className="tex-cal relative scroll-mt-24 bg-cal py-20 lg:py-28" aria-labelledby={`${s.id}-t`}>
            <div className="container-lux">
              <hr className="junta mb-16 lg:mb-24" />
              <div className="grid-lux items-center gap-y-12">
                <div className={`col-span-4 md:col-span-5 lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
                  <ScallopImage photo={images[s.image as ImageKey]} locale={locale} shape={flip ? 'rect' : 'arch'} ratio="4:5" sizes="(min-width:1024px) 40vw, 90vw" />
                </div>
                <div className={`col-span-4 md:col-span-3 lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}>
                  <div className="live flex items-center gap-3 text-tabique">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-cal-claro text-fronda">
                      <Icon name={spaceIcon(s.name)} size={30} />
                    </span>
                    <span className="t-caption">0{i + 1} / 04</span>
                  </div>
                  <Reveal delay={0.1}>
                    <h2 id={`${s.id}-t`} className="t-h2 mt-4">
                      {s.name}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.2} as="p" className="mt-6 font-serif text-[24px] italic leading-snug text-fronda">
                    {s.blurb}
                  </Reveal>
                  <Reveal delay={0.3} as="p" className="measure mt-6 text-piedra/85">
                    {s.body}
                  </Reveal>
                  <div className="mt-10 hidden w-1/2 max-w-[220px] md:block">
                    <ScallopImage photo={images[extra[s.id]]} locale={locale} shape="rect" ratio="3:4" sizes="20vw" density={0.6} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="tex-piedra on-dark grain relative overflow-hidden bg-piedra py-28 text-cal lg:py-40" aria-labelledby="materiales">
        <div className="container-lux">
          <Reveal>
            <Eyebrow tone="cantera" icon="ladrillo">{c.materials.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="materiales" className="t-h2 mt-6 max-w-[18ch]">
              {c.materials.title}
            </h2>
          </Reveal>
          <ol className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {c.materials.items.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 0.1} className="border-t border-cantera/30 pt-6">
                <span className="text-cantera">
                  <Icon name={MATERIAL_ICON[i]} size={36} />
                </span>
                <h3 className="mt-3 font-serif text-[36px] font-light italic">{m.name}</h3>
                <p className="mt-3 text-cal/80">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="tex-cal relative bg-cal py-28 lg:py-36" aria-labelledby="monjas">
        <div className="container-lux grid-lux items-center gap-y-10">
          <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-2">
            <Mark className="w-full max-w-[140px]" />
          </div>
          <div className="col-span-3 md:col-span-6 lg:col-span-7 lg:col-start-5">
            <h2 id="monjas" className="t-h2">
              {p.monjas.title}
            </h2>
            <p className="measure mt-6 text-piedra/85">{p.monjas.text}</p>
          </div>
        </div>
      </section>

      <VisitCTA locale={locale} c={c} />
    </>
  );
}
