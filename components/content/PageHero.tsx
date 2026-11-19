import Image from 'next/image';
import { Eyebrow } from '@/components/base/Typography';
import type { Photo } from '@/lib/images';
import type { Locale } from '@/lib/i18n';

/**
 * Inner-page opener: a large photograph across the full width with the title
 * set very large over the picture.
 */
export function PageHero({ locale, eyebrow, title, intro, photo }: { locale: Locale; eyebrow: string; title: string; intro: string; backWord?: string; photo?: Photo }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-piedra pt-[var(--header-h)] text-cal">
      <div className="relative flex min-h-[min(84svh,860px)] flex-col justify-end">
        {photo && (
          <>
            <div className="absolute inset-0 z-0">
              <div className="anim-settle h-full w-full origin-center">
                <Image
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt[locale]}
                  priority
                  sizes="100vw"
                  placeholder={photo.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={photo.blurDataURL}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: photo.focus ?? '50% 55%' }}
                />
              </div>
            </div>
            <div aria-hidden="true" className="absolute inset-0 z-[1] bg-piedra/35" />
            <div aria-hidden="true" className="absolute inset-0 z-[1] bg-gradient-to-t from-piedra/90 via-piedra/35 to-transparent" />
          </>
        )}
        <div className="container-lux relative z-10 pb-12 pt-24 lg:pb-16">
          <div className="anim-rise" style={{ animationDelay: '0.15s' }}>
            <Eyebrow tone="cal" dot={false}>
              <span aria-hidden="true" className="h-px w-10 bg-cal/70" />
              {eyebrow}
            </Eyebrow>
          </div>
          <h1 className="anim-rise mt-6 max-w-[16ch] font-serif text-[clamp(48px,8.4vw,132px)] font-light leading-[0.98] tracking-[-0.02em] [text-shadow:0_2px_4px_rgb(0_0_0/0.25),0_8px_24px_rgb(0_0_0/0.25)]" style={{ animationDelay: '0.25s' }}>
            {title}
          </h1>
          <p className="anim-rise mt-8 max-w-[44ch] text-[17px] leading-relaxed text-cal/90 lg:text-[20px]" style={{ animationDelay: '0.45s' }}>
            {intro}
          </p>
        </div>
      </div>
    </section>
  );
}
