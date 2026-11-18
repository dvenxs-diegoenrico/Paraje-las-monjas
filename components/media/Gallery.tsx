'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import type { Photo } from '@/lib/images';
import type { Locale } from '@/lib/i18n';
import { useFocusTrap } from '@/components/navigation/useFocusTrap';
import { Icon, type IconName } from '@/components/base/Icon';

const CHAPTER_ICON: Record<string, IconName> = { arquitectura: 'arco', jardines: 'arbol', mesa: 'mesa', noche: 'luna' };

type Chapter = { id: string; name: string; intro: string; photos: Photo[]; masks: string[] };
type Labels = { prev: string; next: string; close: string; openImage: string };

const ease = [0.22, 1, 0.36, 1] as const;
const layouts = ['lg:col-span-5', 'lg:col-span-4 lg:mt-24', 'lg:col-span-3 lg:mt-48', 'lg:col-span-4 lg:col-start-2', 'lg:col-span-5 lg:mt-16'];

/** Editorial gallery by chapter + full-screen lightbox (←/→/Esc, swipe, focus trap). */
export function Gallery({ chapters, locale, labels }: { chapters: Chapter[]; locale: Locale; labels: Labels }) {
  const flat = chapters.flatMap((ch) => ch.photos.map((p) => ({ p, chapter: ch.name })));
  const [index, setIndex] = useState<number | null>(null);
  const offsets = chapters.map((_, i) => chapters.slice(0, i).reduce((n, c) => n + c.photos.length, 0));

  return (
    <>
      {chapters.map((ch, ci) => (
        <section key={ch.id} id={ch.id} className="scroll-mt-24 py-16 lg:py-24" aria-labelledby={`${ch.id}-t`}>
          <div className="container-lux">
            <hr className="junta mb-12" />
            <div className="grid-lux gap-y-4">
              <div className="live col-span-1 flex flex-col items-start gap-2 text-tabique lg:col-span-1">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-cal-claro text-fronda">
                  <Icon name={CHAPTER_ICON[ch.id] ?? 'camara'} size={26} />
                </span>
                <span className="t-caption">0{ci + 1}</span>
              </div>
              <h2 id={`${ch.id}-t`} className="t-h2 col-span-3 md:col-span-4 lg:col-span-5">
                {ch.name}
              </h2>
              <p className="col-span-4 text-piedra/85 md:col-span-3 lg:col-span-4 lg:col-start-8">{ch.intro}</p>
            </div>
            <ul className="grid-lux mt-12 gap-y-10">
              {ch.photos.map((p, i) => {
                const idx = offsets[ci] + i;
                return (
                  <li key={p.id} className={`col-span-2 md:col-span-4 ${layouts[i % layouts.length]}`}>
                    <button type="button" onClick={() => setIndex(idx)} className="img-hover group block w-full text-left">
                      <span className="sr-only">{labels.openImage}: </span>
                      <span className="block overflow-hidden" style={{ aspectRatio: i % 3 === 1 ? '3 / 4' : '4 / 5', WebkitMaskImage: ch.masks[i], maskImage: ch.masks[i], WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }}>
                        <Image src={p.src} width={p.width} height={p.height} alt={p.alt[locale]} sizes="(min-width:1024px) 40vw, 50vw" placeholder={p.blurDataURL ? 'blur' : 'empty'} blurDataURL={p.blurDataURL} className="h-full w-full object-cover" style={{ objectPosition: p.focus }} />
                      </span>
                      <span className="t-caption mt-3 block text-piedra/70">{p.caption[locale]}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}
      <Lightbox items={flat} index={index} setIndex={setIndex} locale={locale} labels={labels} />
    </>
  );
}

function Lightbox({
  items,
  index,
  setIndex,
  locale,
  labels,
}: {
  items: { p: Photo; chapter: string }[];
  index: number | null;
  setIndex: (n: number | null) => void;
  locale: Locale;
  labels: Labels;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  const open = index !== null;
  const close = useCallback(() => setIndex(null), [setIndex]);
  const go = useCallback((d: number) => index !== null && setIndex((index + d + items.length) % items.length), [index, items.length, setIndex]);
  useFocusTrap(ref, open, close);

  const item = index !== null ? items[index] : null;
  return (
    <AnimatePresence>
      {item && (
        <m.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={item.p.caption[locale]}
          className="fixed inset-0 z-[70] flex flex-col bg-piedra text-cal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
          }}
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <div className="container-lux flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <p className="t-caption text-cantera" aria-live="polite">
              {item.chapter} · {String(index! + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </p>
            <button type="button" onClick={close} data-autofocus className="t-nav inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-3">
              {labels.close}
              <span aria-hidden="true">✕</span>
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 lg:px-24">
            <AnimatePresence mode="wait" initial={false}>
              <m.figure key={item.p.id} className="flex h-full max-h-full flex-col items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }}>
                <Image src={item.p.src} width={item.p.width} height={item.p.height} alt={item.p.alt[locale]} sizes="100vw" className="h-auto max-h-[calc(100svh-var(--header-h)*2)] w-auto max-w-full object-contain" />
                <figcaption className="t-caption mt-4 text-cantera">{item.p.caption[locale]}</figcaption>
              </m.figure>
            </AnimatePresence>
            <button type="button" onClick={() => go(-1)} className="t-nav absolute left-2 top-1/2 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center lg:left-8" aria-label={labels.prev}>
              ←
            </button>
            <button type="button" onClick={() => go(1)} className="t-nav absolute right-2 top-1/2 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center lg:right-8" aria-label={labels.next}>
              →
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
