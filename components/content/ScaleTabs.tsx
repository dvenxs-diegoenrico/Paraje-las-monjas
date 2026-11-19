'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import type { Content } from '@/content';
import { Icon } from '@/components/base/Icon';
import { spaceIcon } from '@/components/content/spaceIcon';

const ease = [0.22, 1, 0.36, 1] as const;

/** 50 · 150 · 300 — illustrative scenarios, never floor plans. */
export function ScaleTabs({ scales, label, footnote, spacesLabel, offerLabel, legend }: { scales: Content['scales']; label: string; footnote: string; spacesLabel: string; offerLabel: string; legend: string }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const n = scales.length;
    let next = active;
    if (e.key === 'ArrowRight') next = (active + 1) % n;
    else if (e.key === 'ArrowLeft') next = (active - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const s = scales[active];
  return (
    <div>
      <p className="t-caption text-tabique">{label}</p>
      <div role="tablist" aria-label={label} className="mt-4 flex border-b border-cantera/30" onKeyDown={onKey}>
        {scales.map((sc, i) => (
          <button
            key={sc.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`relative -mb-px flex min-h-[64px] flex-1 items-baseline justify-center gap-2 border-b pb-3 font-serif text-[44px] font-light leading-none transition-colors duration-500 lg:text-[64px] ${
              active === i ? 'border-piedra text-piedra' : 'border-transparent text-piedra/60 hover:text-piedra/80'
            }`}
          >
            <span aria-hidden="true" className={`h-1.5 w-1.5 self-center rounded-full bg-catarina transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'}`} />
            {sc.guests}
          </button>
        ))}
      </div>
      {/* each dot is ten guests: the scale is seen before it is read */}
      <div aria-hidden="true" className="mt-8">
        <div className="dot-grid grid grid-cols-[repeat(15,minmax(0,1fr))] gap-2 sm:gap-3">
          {Array.from({ length: 30 }, (_, i) => {
            const on = i < s.guests / 10;
            return (
              <span
                key={i}
                className={`aspect-square rounded-full ${on ? 'scale-100 bg-fronda' : 'scale-50 bg-cantera/60'}`}
                style={{ transitionDelay: `${(on ? i : 30 - i) * 18}ms` }}
              />
            );
          })}
        </div>
        <p className="t-caption mt-3 flex items-center gap-2 text-piedra/70">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-fronda" /> {legend}
        </p>
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className="relative min-h-[260px] pt-10">
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.6, ease }}>
            <h3 className="font-serif text-[32px] leading-tight lg:text-[40px]">{s.title}</h3>
            <p className="measure mt-4 text-piedra/85">{s.text}</p>
            <dl className="t-data mt-8 grid gap-4 md:grid-cols-2">
              <div>
                <dt className="text-tabique">{spacesLabel}</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {s.spaces.map((sp) => (
                    <span key={sp} className="inline-flex items-center gap-2 shadow-lux rounded-full bg-cal-claro py-1 pl-1 pr-3">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-fronda text-cal">
                        <Icon name={spaceIcon(sp)} size={16} draw={false} />
                      </span>
                      {sp}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-tabique">{offerLabel}</dt>
                <dd className="mt-1">{s.offer}</dd>
              </div>
            </dl>
          </m.div>
        </AnimatePresence>
      </div>
      <p className="t-caption mt-6 text-piedra/70">{footnote}</p>
    </div>
  );
}
