'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import { ButtonLink, TextLink } from '@/components/base/Button';
import { Mark } from '@/components/brand/Logo';
import { Walker } from '@/components/content/Graphics';
import { href, type Locale } from '@/lib/i18n';
import { images } from '@/lib/images';
import type { Content } from '@/content';

/**
 * Three planes:
 *   1. back   — colossal headline (the h1)
 *   2. middle — the subject: a scalloped arch onto El Arbolado, whose tree
 *               crowns break out of the frame and over the headline
 *   3. front  — lede, buttons and a slowly turning seal
 */
export function Hero({
  locale,
  c,
  archMask,
  sealMask,
}: {
  locale: Locale;
  c: Content['home']['hero'];
  archMask: string;
  sealMask: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // depth: the headline lags, the subject and the front plane lead. Flat when reduced.
  const k = reduce ? 0 : 1;
  const typeY = useTransform(scrollYProgress, [0, 1], ['0%', `${18 * k}%`]);
  const subjectY = useTransform(scrollYProgress, [0, 1], ['0%', `${-8 * k}%`]);
  const frontY = useTransform(scrollYProgress, [0, 1], ['0%', `${-22 * k}%`]);

  const photo = images.arbolado;
  const cut = images.arboladoRecorte;

  // entrance runs in CSS so it starts at first paint, before hydration
  const rise = (delay: number) => ({ className: 'anim-rise', style: { animationDelay: `${delay}s` } });

  const mask = { WebkitMaskImage: archMask, maskImage: archMask, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' } as const;
  const seal = { WebkitMaskImage: sealMask, maskImage: sealMask, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' } as const;

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-cal pt-[var(--header-h)]" aria-labelledby="hero-title">
      <div className="container-lux relative min-h-[calc(100svh-var(--header-h))] pb-14 lg:pb-16">
        {/* eyebrow row */}
        <div {...rise(0.05)} className="anim-rise relative z-30 flex items-center justify-between pt-6 lg:pt-8">
          <p className="t-eyebrow flex items-center gap-3 text-tabique">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-catarina" />
            {c.eyebrow}
          </p>
        </div>

        {/* PLANE 1 · colossal headline */}
        <m.h1 id="hero-title" style={{ y: typeY }} className="relative z-0 mt-6 lg:mt-[4vh]">
          <span style={rise(0.15).style} className="anim-rise t-colossal block text-piedra">
            {c.line1}
          </span>{' '}
          <span style={rise(0.3).style} className="anim-rise t-colossal block pl-[6vw] italic text-fronda lg:pl-[8.5vw]">
            {c.line2}
          </span>{' '}
          <span style={rise(0.45).style} className="anim-rise mt-2 block pl-[6vw] font-serif text-[clamp(24px,2.6vw,40px)] font-light italic leading-tight text-piedra lg:mt-4 lg:pl-[9vw]">
            {c.line3}
          </span>
        </m.h1>

        {/* PLANE 2 · subject */}
        <m.div
          style={{ y: subjectY }}
          className="pointer-events-none relative z-10 mx-auto -mt-[2vw] w-[70vw] max-w-[440px] md:-mt-[8vw] md:mr-[4vw] md:w-[46vw] lg:absolute lg:right-[calc(var(--margin)+8vw)] lg:top-[calc(13vh)] lg:mx-0 lg:mt-0 lg:w-[29vw] lg:max-w-[500px] xl:right-[calc(var(--margin)+9vw)]"
        >
          {/* arch frame (photo inside, scalloped) */}
          <div className="relative aspect-[1/1.3] w-full">
            {/* no opacity entrance here: this image is the LCP element */}
            <div className="absolute inset-0 overflow-hidden" style={mask}>
              <div className="absolute bottom-0 left-1/2 w-[135%] -translate-x-1/2">
                <div className="anim-settle origin-bottom">
                <Image
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt[locale]}
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  className="block h-auto w-full"
                />
                </div>
              </div>
            </div>
            {/* dappled light drifting over the lawn */}
            <div aria-hidden="true" className="dapple pointer-events-none absolute inset-0" style={mask} />
            {/* the crowns, cut from the sky, rising out of the frame */}
            <div
              className="absolute bottom-0 left-1/2 w-[135%] -translate-x-1/2"
              style={{
                // only the main crown escapes the arch, through its top
                WebkitMaskImage: 'linear-gradient(to bottom, #000 0 29%, transparent 37%), linear-gradient(to right, transparent 37%, #000 44%, #000 82%, transparent 87%)',
                maskImage: 'linear-gradient(to bottom, #000 0 29%, transparent 37%), linear-gradient(to right, transparent 37%, #000 44%, #000 82%, transparent 87%)',
                WebkitMaskComposite: 'source-in',
                maskComposite: 'intersect',
              }}
            >
              <div>
                <div className="anim-settle origin-bottom">
                  <Image src={cut.src} width={cut.width} height={cut.height} alt="" priority sizes="(min-width: 1024px) 40vw, 100vw" className="block h-auto w-full" />
                </div>
              </div>
            </div>
          </div>
          <p className="t-caption mt-4 text-right text-piedra/70" aria-hidden="true">
            {photo.caption[locale]} · Atlixco
          </p>

          {/* PLANE 3 · seal */}
          <div
            className="anim-fade pointer-events-none absolute -bottom-6 -left-10 z-20 h-[112px] w-[112px] md:-left-14 lg:-left-16 lg:h-[136px] lg:w-[136px]"
            style={{ animationDelay: '1.3s' }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-fronda" style={seal} />
            <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full">
              <defs>
                <path id="seal-circle" d="M60 60m-41 0a41 41 0 1 1 82 0a41 41 0 1 1 -82 0" />
              </defs>
              <text className="fill-cal font-mono uppercase" style={{ fontSize: 8.4, letterSpacing: '0.18em' }}>
                <textPath href="#seal-circle">{c.seal.repeat(2)}</textPath>
              </text>
            </svg>
            <div className="absolute inset-[36%]">
              <Mark tone="light" className="h-full w-full" />
            </div>
          </div>
        </m.div>

        {/* the catarina — the "monja" of the name — crossing the garden */}
        <Walker className="bottom-2 left-[var(--margin)] z-30 hidden lg:block" />

        {/* PLANE 3 · lede + actions */}
        <m.div style={{ y: frontY }} className="relative z-20 mt-14 max-w-[30rem] lg:absolute lg:bottom-16 lg:left-[var(--margin)] lg:mt-0">
          <p style={rise(0.7).style} className="anim-rise text-[17px] leading-relaxed text-piedra/85 lg:text-[18px]">
            {c.lede}
          </p>
          <div style={rise(0.85).style} className="anim-rise mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={href(locale, 'visita')} icon="calendario">
              {c.cta}
            </ButtonLink>
            <TextLink href={href(locale, 'lugar')}>{c.secondary}</TextLink>
          </div>
        </m.div>
      </div>
    </section>
  );
}
