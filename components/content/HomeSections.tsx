import Image from 'next/image';
import Link from 'next/link';
import { TextLink } from '@/components/base/Button';
import { Eyebrow } from '@/components/base/Typography';
import { Mark } from '@/components/brand/Logo';
import { Icon, type IconName } from '@/components/base/Icon';
import { SpacesDiagram } from '@/components/content/Graphics';
import { Drift } from '@/components/motion/Drift';
import { Reveal, Unveil } from '@/components/motion/Reveal';
import { ScallopImage } from '@/components/media/ScallopImage';
import { href, type Locale } from '@/lib/i18n';
import { images, type ImageKey } from '@/lib/images';
import type { Content } from '@/content';

const MANIFESTO_ICONS: IconName[] = ['arco', 'ladrillo', 'pabellon', 'catarina', 'mesa', 'hoja'];

/* ---------------------------------------------------------------- 2 */
export function Manifesto({ c }: { c: Content['home']['manifesto'] }) {
  return (
    <section className="relative bg-cal py-28 lg:py-44" aria-labelledby="manifiesto">
      <div className="container-lux grid-lux">
        <div className="col-span-4 md:col-span-8 lg:col-span-2">
          <Reveal>
            <Eyebrow>
              <span id="manifiesto">{c.eyebrow}</span>
            </Eyebrow>
          </Reveal>
        </div>
        <div className="col-span-4 mt-10 md:col-span-8 lg:col-span-8 lg:col-start-4 lg:mt-0">
          {c.lines.map((line, i) => (
            <Reveal key={i} delay={i * 0.12} duration={0.9} className={`group relative ${i > 0 ? 'mt-6 lg:mt-8' : ''}`}>
              {/* a drawn marginal note per line: brick, pavilion, tree, catarina, table, leaf */}
              <span className="absolute -left-12 top-2 hidden text-tabique lg:block xl:-left-16">
                <Icon name={MANIFESTO_ICONS[i % MANIFESTO_ICONS.length]} size={30} />
              </span>
              <p className={`font-serif text-[clamp(32px,4.3vw,68px)] font-normal leading-[1.08] tracking-[-0.01em] text-piedra ${i === c.lines.length - 1 ? 'italic text-fronda' : ''}`}>{line}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 3 */
export function SpacesShowcase({ locale, c, spaces, groups }: { locale: Locale; c: Content['home']['lugar']; spaces: Content['spaces']; groups: Content['spacesGroups'] }) {
  const [first, ...rest] = spaces;
  return (
    <section className="relative bg-cal pb-28 lg:pb-40" aria-labelledby="el-lugar">
      <div className="container-lux">
        <div className="grid-lux items-end gap-y-6">
          <div className="col-span-4 md:col-span-6 lg:col-span-7">
            <Reveal>
              <Eyebrow icon="arco">{c.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="el-lugar" className="t-h2 mt-6 max-w-[16ch]">
                {c.title}
              </h2>
            </Reveal>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-3 lg:col-start-10 lg:justify-self-end">
            <TextLink href={href(locale, 'lugar')}>{c.link}</TextLink>
          </div>
        </div>
      </div>

      <div className="container-lux mt-12">
        <SpacesDiagram spaces={spaces} g={groups} base={href(locale, 'lugar')} />
      </div>

      {/* desktop: one wide hero card + three tall cards; mobile: large snap rail */}
      <div className="container-lux mt-14 hidden lg:block">
        <SpaceCard locale={locale} s={first} n={1} ratio="21:9" big />
        <div className="mt-8 grid grid-cols-3 gap-8">
          {rest.map((s, i) => (
            <SpaceCard key={s.id} locale={locale} s={s} n={i + 2} ratio="4:5" />
          ))}
        </div>
      </div>
      <ul className="rail mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--margin)] pb-10 pt-2 lg:hidden" aria-label={c.eyebrow}>
        {spaces.map((s, i) => (
          <li key={s.id} className="w-[88vw] max-w-[420px] shrink-0 snap-start">
            <SpaceCard locale={locale} s={s} n={i + 1} ratio="4:5" />
          </li>
        ))}
      </ul>
    </section>
  );
}

function SpaceCard({ locale, s, n, ratio, big }: { locale: Locale; s: Content['spaces'][number]; n: number; ratio: '21:9' | '4:5'; big?: boolean }) {
  return (
    <Link href={href(locale, 'lugar', s.id)} className="img-hover group block">
      <ScallopImage photo={images[s.image as ImageKey]} locale={locale} ratio={ratio} sizes={big ? '100vw' : '(min-width:1024px) 33vw, 88vw'}>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-piedra/85 via-piedra/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-cal lg:p-10">
          <p className="t-caption text-cal/80">0{n}</p>
          <h3 className={`mt-2 font-serif font-light leading-[0.98] tracking-[-0.015em] [text-shadow:0_2px_4px_rgb(0_0_0/0.25),0_8px_24px_rgb(0_0_0/0.25)] ${big ? 'text-[clamp(44px,7vw,110px)]' : 'text-[clamp(34px,3.6vw,56px)]'}`}>{s.name}</h3>
          <p className={`mt-3 max-w-[40ch] text-cal/90 ${big ? 'text-[18px]' : 'text-[15px] leading-snug'}`}>{s.blurb}</p>
        </div>
      </ScallopImage>
    </Link>
  );
}

/* ---------------------------------------------------------------- 4 */
export function EditorialTriptych({ locale, c }: { locale: Locale; c: Content['home']['editorial'] }) {
  const wide = images.salonPilares;
  const land = images.pradera;
  const port = images.mesaMadera;
  return (
    <section className="relative bg-cal pb-28 lg:pb-44" aria-labelledby="editorial">
      <figure>
        <div className="relative aspect-[4/5] w-full md:aspect-[21/9]">
          <Unveil className="h-full w-full">
            <Drift>
              <Image src={wide.src} width={wide.width} height={wide.height} alt={wide.alt[locale]} sizes="100vw" placeholder="blur" blurDataURL={wide.blurDataURL} className="h-full w-full object-cover" style={{ objectPosition: '50% 45%' }} />
            </Drift>
          </Unveil>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-piedra/90 via-piedra/45 to-piedra/40" />
          <div className="on-dark container-lux absolute inset-x-0 bottom-0 pb-8 text-cal lg:pb-14">
            <Eyebrow tone="cal" icon="camara">{c.eyebrow}</Eyebrow>
            <h2 id="editorial" className="t-display mt-4 max-w-[18ch] italic [text-shadow:0_2px_4px_rgb(0_0_0/0.25),0_8px_24px_rgb(0_0_0/0.25)]">
              {c.title}
            </h2>
          </div>
        </div>
        <figcaption className="container-lux t-caption mt-4 flex justify-between text-piedra/70">
          <span>{wide.caption[locale]}</span>
        </figcaption>
      </figure>
      <div className="container-lux mt-20 lg:mt-28">
        <div className="grid-lux items-end gap-y-16">
          <figure className="col-span-4 md:col-span-5 lg:col-span-8">
            <div className="shadow-lux relative aspect-[3/2] w-full overflow-hidden">
              <Unveil className="h-full w-full">
                <Drift>
                  <Image src={land.src} width={land.width} height={land.height} alt={land.alt[locale]} sizes="(min-width:1024px) 58vw, 100vw" placeholder="blur" blurDataURL={land.blurDataURL} className="h-full w-full object-cover" style={{ objectPosition: '50% 65%' }} />
                </Drift>
              </Unveil>
            </div>
            <figcaption className="t-caption mt-4 text-piedra/70">{land.caption[locale]}</figcaption>
          </figure>
          <figure className="col-span-4 md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9 lg:-mb-24">
            <ScallopImage photo={port} locale={locale} shape="arch" ratio="4:5" sizes="(min-width:1024px) 30vw, 70vw" density={0.8} />
            <figcaption className="t-caption mt-4 text-piedra/70">{port.caption[locale]}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 7 */
export function GalleryMosaic({ locale, c }: { locale: Locale; c: Content['home']['galeria'] }) {
  const tiles: { key: ImageKey; cls: string; ratio: '4:5' | '3:4' | '3:2' | '16:9' }[] = [
    { key: 'aveParaiso', cls: 'col-span-4 md:col-span-8 lg:col-span-7', ratio: '3:2' },
    { key: 'arboladoFuente', cls: 'col-span-4 md:col-span-4 lg:col-span-5 lg:mt-28', ratio: '4:5' },
    { key: 'pabellonCrossback', cls: 'col-span-4 md:col-span-4 lg:col-span-4', ratio: '3:4' },
    { key: 'salonPiedra', cls: 'col-span-4 md:col-span-4 lg:col-span-4 lg:mt-14', ratio: '3:4' },
    { key: 'platillo', cls: 'col-span-4 md:col-span-4 lg:col-span-4 lg:mt-28', ratio: '3:4' },
    { key: 'praderaSetos', cls: 'col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3', ratio: '16:9' },
  ];
  return (
    <section className="relative bg-cal py-28 lg:py-40" aria-labelledby="galeria-home">
      <div className="container-lux">
        <div className="grid-lux items-end gap-y-6">
          <div className="col-span-4 md:col-span-6 lg:col-span-8">
            <Reveal>
              <Eyebrow icon="camara">{c.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="galeria-home" className="t-h2 mt-6">
                {c.title}
              </h2>
            </Reveal>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-3 lg:col-start-10 lg:justify-self-end">
            <TextLink href={href(locale, 'galeria')}>{c.link}</TextLink>
          </div>
        </div>
        <div className="grid-lux mt-14 gap-y-10 lg:mt-20">
          {tiles.map((t) => (
            <figure key={t.key} className={t.cls}>
              <ScallopImage photo={images[t.key]} locale={locale} ratio={t.ratio} sizes="(min-width:1024px) 50vw, 100vw" />
              <figcaption className="t-caption mt-3 text-piedra/70">{images[t.key].caption[locale]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 8 */
export function Philosophy({ c }: { c: Content['home']['filosofia'] }) {
  return (
    <section className="on-dark grain relative overflow-hidden bg-piedra py-28 text-cal lg:py-44" aria-labelledby="filosofia">
      <div className="container-lux grid-lux items-center gap-y-14">
        <Reveal className="col-span-2 md:col-span-3 lg:col-span-4 lg:col-start-2" duration={1.2}>
          <div className="live relative">
            <Mark tone="light" className="w-full max-w-[340px]" />
            <span className="absolute -right-2 top-[38%] text-catarina">
              <Icon name="catarina" size={30} />
            </span>
          </div>
        </Reveal>
        <div className="col-span-4 md:col-span-5 lg:col-span-5 lg:col-start-7">
          <Reveal>
            <Eyebrow tone="cantera" icon="hoja">{c.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="filosofia" className="t-display mt-6 italic">
              {c.title}
            </h2>
          </Reveal>
          {c.body.map((p, i) => (
            <Reveal key={i} delay={0.2 + i * 0.1} as="p" className="measure mt-8 text-cal/85">
              {p}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
