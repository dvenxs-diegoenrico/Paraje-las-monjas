import { PageHero } from '@/components/content/PageHero';
import { OfferCard } from '@/components/content/OfferCard';
import { Credits, Montajes } from '@/components/content/Montajes';
import { VisitCTA } from '@/components/conversion/VisitCTA';
import { ScallopImage } from '@/components/media/ScallopImage';
import { Reveal } from '@/components/motion/Reveal';
import { getContent } from '@/content';
import { Icon, type IconName } from '@/components/base/Icon';

const KIND_ICON: Record<string, IconName> = { bodas: 'brindis', 'bodas-intimas': 'mesa', familia: 'personas', jornadas: 'proyector' };
import type { Locale } from '@/lib/i18n';
import { images, type ImageKey } from '@/lib/images';

export function CelebracionesPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const p = c.celebraciones;
  const byId = Object.fromEntries(c.offers.items.map((o) => [o.id, o]));
  return (
    <>
      <PageHero locale={locale} eyebrow={p.eyebrow} title={p.title} intro={p.intro} backWord={locale === 'es' ? 'celebrar' : 'celebrate'} photo={images.mesaCristal} />
      <nav aria-label={p.eyebrow} className="container-lux">
        <ul className="t-nav flex flex-wrap gap-x-8 gap-y-2 border-y border-cantera/40 py-4">
          {p.kinds.map((k) => (
            <li key={k.id}>
              <a href={`#${k.id}`} className="group inline-flex min-h-[44px] items-center gap-2">
                <Icon name={KIND_ICON[k.id]} size={20} className="text-tabique" />
                <span className="link-grow">{k.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {p.kinds.map((k, i) => (
        <section key={k.id} id={k.id} className="scroll-mt-24 bg-cal py-20 lg:py-28" aria-labelledby={`${k.id}-t`}>
          <div className="container-lux grid-lux gap-y-12">
            <div className="col-span-4 md:col-span-3 lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="live flex items-center gap-3 text-tabique">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-cal-claro text-fronda">
                    <Icon name={KIND_ICON[k.id]} size={30} />
                  </span>
                  <span className="t-caption">0{i + 1}</span>
                </div>
                <Reveal>
                  <h2 id={`${k.id}-t`} className="t-h2 mt-3">
                    {k.name}
                  </h2>
                </Reveal>
                <Reveal delay={0.1} as="p" className="mt-6 text-piedra/85">
                  {k.text}
                </Reveal>
                <div className="mt-10 w-2/3 max-w-[300px]">
                  <ScallopImage photo={images[k.image as ImageKey]} locale={locale} shape={i % 2 ? 'rect' : 'arch'} ratio="3:4" sizes="25vw" density={0.8} />
                </div>
              </div>
            </div>
            <div className="col-span-4 flex flex-col gap-6 md:col-span-5 lg:col-span-7 lg:col-start-6">
              {k.offers.map((id) => (
                <Reveal key={id}>
                  <OfferCard offer={byId[id]} c={c} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
      <Montajes locale={locale} c={c} />
      <Credits c={c} />
      <VisitCTA locale={locale} c={c} />
    </>
  );
}
