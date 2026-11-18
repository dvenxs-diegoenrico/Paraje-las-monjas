import Image from 'next/image';
import Link from 'next/link';
import { TextLink } from '@/components/base/Button';
import { Eyebrow } from '@/components/base/Typography';
import { Valance } from '@/components/base/Valance';
import { Mark } from '@/components/brand/Logo';
import { Drift } from '@/components/motion/Drift';
import { Reveal, Unveil } from '@/components/motion/Reveal';
import { ScallopImage, scallopStyle } from '@/components/media/ScallopImage';
import { href, type Locale } from '@/lib/i18n';
import { images, type ImageKey } from '@/lib/images';
import type { Content } from '@/content';

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
            <Reveal key={i} delay={i * 0.12} duration={0.9} as="p" className={`t-h2 text-piedra ${i > 0 ? 'mt-6 lg:mt-8' : ''} ${i === c.lines.length - 1 ? 'italic text-fronda' : ''}`}>
              {line}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 3 */
export function SpacesShowcase({ locale, c, spaces }: { locale: Locale; c: Content['home']['lugar']; spaces: Content['spaces'] }) {
  const [first, ...rest] = spaces;
  return (
    <section className="relative bg-cal pb-28 lg:pb-40" aria-labelledby="el-lugar">
      <div className="container-lux">
        <div className="grid-lux items-end gap-y-6">
          <div className="col-span-4 md:col-span-6 lg:col-span-7">
            <Reveal>
              <Eyebrow>{c.eyebrow}</Eyebrow>
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

      {/* desktop: one large arch + three small; mobile: scroll-snap rail */}
      <div className="container-lux mt-14 hidden lg:block">
        <div className="grid-lux items-start">
          <Link href={href(locale, 'lugar', first.id)} className="img-hover group col-span-5 block">
            <ScallopImage photo={images[first.image as ImageKey]} locale={locale} shape="arch" ratio="4:5" sizes="40vw" />
            <SpaceLabel n={1} name={first.name} blurb={first.blurb} />
          </Link>
          <div className="col-span-6 col-start-7 grid grid-cols-3 gap-x-6 pt-[22vh]">
            {rest.map((s, i) => (
              <Link key={s.id} href={href(locale, 'lugar', s.id)} className={`img-hover group block ${i === 1 ? 'mt-24' : i === 2 ? 'mt-12' : ''}`}>
                <ScallopImage photo={images[s.image as ImageKey]} locale={locale} shape={i === 1 ? 'arch' : 'rect'} ratio="3:4" sizes="16vw" density={0.75} />
                <SpaceLabel n={i + 2} name={s.name} blurb={s.blurb} small />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ul className="rail mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--margin)] pb-2 lg:hidden" aria-label={c.eyebrow}>
        {spaces.map((s, i) => (
          <li key={s.id} className="w-[78vw] max-w-[360px] shrink-0 snap-start">
            <Link href={href(locale, 'lugar', s.id)} className="block">
              <ScallopImage photo={images[s.image as ImageKey]} locale={locale} shape={i % 2 === 0 ? 'arch' : 'rect'} ratio="4:5" sizes="80vw" density={0.8} />
              <SpaceLabel n={i + 1} name={s.name} blurb={s.blurb} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SpaceLabel({ n, name, blurb, small }: { n: number; name: string; blurb: string; small?: boolean }) {
  return (
    <div className="mt-5">
      <p className="t-caption text-tabique">0{n}</p>
      <h3 className={`mt-1 font-serif ${small ? 'text-[24px]' : 'text-[32px]'} leading-tight`}>
        <span className="link-grow group-hover:[background-size:100%_1px]">{name}</span>
      </h3>
      <p className={`mt-2 text-piedra/80 ${small ? 'text-[15px] leading-snug' : ''}`}>{blurb}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- 4 */
export function EditorialTriptych({ locale, c }: { locale: Locale; c: Content['home']['editorial'] }) {
  const wide = images.salonPilares;
  const land = images.pradera;
  const port = images.mesaMadera;
  return (
    <section className="relative bg-cal pb-28 lg:pb-44" aria-labelledby="editorial">
      <div className="container-lux">
        <Reveal>
          <Eyebrow>{c.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 id="editorial" className="t-h2 mt-6 max-w-[20ch]">
            {c.title}
          </h2>
        </Reveal>
      </div>
      <figure className="mt-14 lg:mt-20">
        <div className="scallop-top relative aspect-[4/5] w-full md:aspect-[21/9]">
          <Unveil className="h-full w-full">
            <Drift>
              <Image src={wide.src} width={wide.width} height={wide.height} alt={wide.alt[locale]} sizes="100vw" placeholder="blur" blurDataURL={wide.blurDataURL} className="h-full w-full object-cover" style={{ objectPosition: '50% 45%' }} />
            </Drift>
          </Unveil>
        </div>
        <figcaption className="container-lux t-caption mt-4 flex justify-between text-piedra/70">
          <span>{wide.caption[locale]}</span>
          <span aria-hidden="true">21:9</span>
        </figcaption>
      </figure>
      <div className="container-lux mt-20 lg:mt-28">
        <div className="grid-lux items-end gap-y-16">
          <figure className="col-span-4 md:col-span-5 lg:col-span-7">
            <div className="relative aspect-[3/2] w-full" style={scallopStyle('rect', '3:2', 1.4)}>
              <Unveil className="h-full w-full">
                <Drift>
                  <Image src={land.src} width={land.width} height={land.height} alt={land.alt[locale]} sizes="(min-width:1024px) 58vw, 100vw" placeholder="blur" blurDataURL={land.blurDataURL} className="h-full w-full object-cover" style={{ objectPosition: '50% 65%' }} />
                </Drift>
              </Unveil>
            </div>
            <figcaption className="t-caption mt-4 text-piedra/70">{land.caption[locale]} · 3:2</figcaption>
          </figure>
          <figure className="col-span-3 col-start-2 md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9 lg:-mb-24">
            <ScallopImage photo={port} locale={locale} shape="arch" ratio="4:5" sizes="(min-width:1024px) 30vw, 70vw" density={0.8} />
            <figcaption className="t-caption mt-4 text-piedra/70">{port.caption[locale]} · 4:5</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 7 */
export function GalleryMosaic({ locale, c }: { locale: Locale; c: Content['home']['galeria'] }) {
  const tiles: { key: ImageKey; cls: string; shape: 'rect' | 'arch'; ratio: '4:5' | '3:4' | '3:2' | '1:1' }[] = [
    { key: 'aveParaiso', cls: 'col-span-2 md:col-span-3 lg:col-span-4', shape: 'arch', ratio: '3:4' },
    { key: 'arboladoFuente', cls: 'col-span-2 md:col-span-5 lg:col-span-5 lg:col-start-6 lg:mt-24', shape: 'rect', ratio: '4:5' },
    { key: 'pabellonCrossback', cls: 'col-span-2 md:col-span-3 lg:col-span-2 lg:col-start-11 lg:mt-56', shape: 'rect', ratio: '3:4' },
    { key: 'salonPiedra', cls: 'col-span-2 md:col-span-3 lg:col-span-3 lg:col-start-2 lg:-mt-10', shape: 'rect', ratio: '4:5' },
    { key: 'platillo', cls: 'col-span-2 md:col-span-2 lg:col-span-3 lg:col-start-6 lg:mt-20', shape: 'arch', ratio: '3:4' },
    { key: 'praderaSetos', cls: 'col-span-4 md:col-span-3 lg:col-span-3 lg:col-start-10 lg:-mt-16', shape: 'rect', ratio: '4:5' },
  ];
  return (
    <section className="relative bg-cal py-28 lg:py-40" aria-labelledby="galeria-home">
      <div className="container-lux">
        <div className="grid-lux items-end gap-y-6">
          <div className="col-span-4 md:col-span-6 lg:col-span-8">
            <Reveal>
              <Eyebrow>{c.eyebrow}</Eyebrow>
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
        <div className="grid-lux mt-14 gap-y-6 lg:mt-20">
          {tiles.map((t) => (
            <figure key={t.key} className={t.cls}>
              <ScallopImage photo={images[t.key]} locale={locale} shape={t.shape} ratio={t.ratio} sizes="(min-width:1024px) 33vw, 50vw" density={0.7} />
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
    <section className="on-dark relative bg-piedra py-28 text-cal lg:py-44" aria-labelledby="filosofia">
      <Valance color="var(--piedra)" />
      <div className="container-lux grid-lux items-center gap-y-14">
        <Reveal className="col-span-2 md:col-span-3 lg:col-span-4 lg:col-start-2" duration={1.2}>
          <Mark tone="light" className="w-full max-w-[340px]" />
        </Reveal>
        <div className="col-span-4 md:col-span-5 lg:col-span-5 lg:col-start-7">
          <Reveal>
            <Eyebrow tone="cantera">{c.eyebrow}</Eyebrow>
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
