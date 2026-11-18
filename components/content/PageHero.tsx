import Image from 'next/image';
import { Eyebrow } from '@/components/base/Typography';
import { scallopStyle } from '@/components/media/ScallopImage';
import type { Photo } from '@/lib/images';
import type { Locale } from '@/lib/i18n';

/**
 * Inner-page opener, same three planes as the home hero:
 *   back: a colossal italic word · middle: scalloped arch photo over its tail ·
 *   front: eyebrow, title and intro.
 */
export function PageHero({ locale, eyebrow, title, intro, backWord, photo }: { locale: Locale; eyebrow: string; title: string; intro: string; backWord: string; photo?: Photo }) {
  return (
    <section className="relative isolate overflow-hidden bg-cal pt-[var(--header-h)]">
      <div className="container-lux relative pb-16 pt-6 lg:min-h-[calc(40vw+120px)] lg:pb-20 lg:pt-8">
        {/* back plane */}
        {/* decorative: drawn via ::before so it stays out of the accessibility tree */}
        <p
          aria-hidden="true"
          data-word={backWord}
          className="anim-rise t-colossal pointer-events-none relative z-0 -ml-[0.04em] select-none whitespace-nowrap italic text-cantera/60 before:content-[attr(data-word)]"
          style={{ animationDelay: '0.05s' }}
        />

        {/* middle plane */}
        {photo && (
          <div className="relative z-10 ml-auto -mt-[14vw] w-[62vw] max-w-[420px] md:w-[40vw] lg:absolute lg:left-[46vw] lg:top-[3vw] lg:mt-0 lg:w-[27vw] lg:max-w-[440px]">
            <div className="aspect-[3/4] w-full overflow-hidden" style={scallopStyle('arch', '3:4', 1.1)}>
              <div className="anim-settle h-full w-full origin-bottom">
                <Image
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt[locale]}
                  priority
                  sizes="(min-width:1024px) 30vw, 62vw"
                  placeholder={photo.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={photo.blurDataURL}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: photo.focus }}
                />
              </div>
            </div>
            <p className="t-caption mt-3 text-piedra/70" aria-hidden="true">
              {photo.caption[locale]}
            </p>
          </div>
        )}

        {/* front plane */}
        <div className="grid-lux relative z-20 mt-10 gap-y-8 lg:-mt-[3vw]">
          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <div className="anim-rise" style={{ animationDelay: '0.15s' }}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h1 className="anim-rise mt-6 font-serif text-[clamp(40px,5vw,76px)] font-light leading-[1.04] tracking-[-0.01em]" style={{ animationDelay: '0.25s' }}>
              {title}
            </h1>
          </div>
          <p className="anim-rise col-span-4 self-end text-[17px] text-piedra/85 md:col-span-6 lg:col-span-3 lg:col-start-10 lg:mt-[16vw] lg:text-[18px]" style={{ animationDelay: '0.45s' }}>
            {intro}
          </p>
        </div>
      </div>
    </section>
  );
}
