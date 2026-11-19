'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import { ButtonLink, TextLink } from '@/components/base/Button';
import { AmbientVideo } from '@/components/media/AmbientVideo';
import { href, type Locale } from '@/lib/i18n';
import { images } from '@/lib/images';
import type { Content } from '@/content';

/**
 * Three planes, all large:
 *   1. back   — the pavilion, full bleed, slowly settling
 *   2. middle — a second photograph (El Arbolado) overlapping the headline
 *   3. front  — the colossal headline and the actions
 */
export function Hero({ locale, c }: { locale: Locale; c: Content['home']['hero'] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const k = reduce ? 0 : 1;
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', `${10 * k}%`]);
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', `${-12 * k}%`]);
  const frontY = useTransform(scrollYProgress, [0, 1], ['0%', `${-6 * k}%`]);

  const bg = images.pabellonCristal;
  const inset = images.arbolado;
  const rise = (delay: number) => ({ className: 'anim-rise', style: { animationDelay: `${delay}s` } });

  return (
    <section ref={ref} className="on-dark relative isolate overflow-hidden bg-piedra pt-[var(--header-h)] text-cal" aria-labelledby="hero-title">
      <div className="relative min-h-[calc(100svh-var(--header-h))]">
        {/* PLANE 1 · the room */}
        <m.div style={{ y: bgY }} className="absolute inset-x-0 -top-[6%] bottom-[-6%] z-0">
          <div className="anim-settle h-full w-full origin-center">
            <Image
              src={bg.src}
              width={bg.width}
              height={bg.height}
              alt={bg.alt[locale]}
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={bg.blurDataURL}
              className="h-full w-full object-cover"
              style={{ objectPosition: '50% 58%' }}
            />
          </div>
          {/* ambient loop made from the venue's photographs; fades in after load */}
          <div className="absolute inset-0 hidden md:block">
            <AmbientVideo src="/video/hero-loop.mp4" />
          </div>
        </m.div>
        {/* legibility: one even veil plus a deeper one behind the headline */}
        <div aria-hidden="true" className="absolute inset-0 z-[1] bg-piedra/35" />
        <div aria-hidden="true" className="absolute inset-0 z-[1] bg-gradient-to-t from-piedra/90 via-piedra/30 to-transparent" />
        <div aria-hidden="true" className="absolute inset-y-0 left-0 z-[1] w-2/3 bg-gradient-to-r from-piedra/60 to-transparent" />

        <div className="container-lux relative z-10 flex min-h-[calc(100svh-var(--header-h))] flex-col justify-end pb-10 pt-10 lg:pb-14">
          <p {...rise(0.05)} className="anim-rise t-eyebrow absolute left-[var(--margin)] top-6 flex items-center gap-3 text-cal/90 lg:top-10">
            <span aria-hidden="true" className="h-px w-10 bg-cal/70" />
            {c.eyebrow}
          </p>

          {/* PLANE 2 · second photograph, overlapping the headline */}
          <m.div
            style={{ y: midY }}
            className="relative z-10 mb-[-14vw] ml-auto mt-14 lg:mt-0 w-[64vw] max-w-[420px] md:mb-[-8vw] md:w-[34vw] lg:absolute lg:bottom-[16vh] lg:right-[var(--margin)] lg:mb-0 lg:w-[37vw] lg:max-w-[680px]"
          >
            <div className="anim-fade shadow-lux-lg aspect-[5/6] w-full overflow-hidden" style={{ animationDelay: '0.4s' }}>
              <div className="anim-settle h-full w-full origin-bottom">
                <Image src={inset.src} width={inset.width} height={inset.height} alt={inset.alt[locale]} priority sizes="(min-width:1024px) 30vw, 64vw" placeholder="blur" blurDataURL={inset.blurDataURL} className="h-full w-full object-cover" />
              </div>
            </div>
            <p className="t-caption mt-3 text-right text-cal/85">{inset.caption[locale]}</p>
          </m.div>

          {/* PLANE 3 · headline + actions */}
          <m.div style={{ y: frontY }} className="relative z-20">
            <h1 id="hero-title" className="[text-shadow:0_2px_4px_rgb(0_0_0/0.25),0_8px_24px_rgb(0_0_0/0.25)]">
              <span style={rise(0.15).style} className="anim-rise t-colossal block">
                {c.line1}
              </span>{' '}
              <span style={rise(0.3).style} className="anim-rise t-colossal block pl-[4vw] italic">
                {c.line2}
              </span>{' '}
              <span style={rise(0.45).style} className="anim-rise mt-3 block pl-[4vw] font-serif text-[clamp(26px,3vw,48px)] font-light italic leading-tight lg:mt-5">
                {c.line3}
              </span>
            </h1>
            <div style={rise(0.7).style} className="anim-rise mt-8 flex max-w-[34rem] flex-col gap-6 lg:mt-10">
              <p className="text-[17px] leading-relaxed text-cal/90 lg:text-[19px]">{c.lede}</p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href={href(locale, 'visita')} icon="calendario" tone="cal">
                  {c.cta}
                </ButtonLink>
                <TextLink href={href(locale, 'lugar')} className="text-cal">
                  {c.secondary}
                </TextLink>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
