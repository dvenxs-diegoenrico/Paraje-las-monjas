'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';

/**
 * Scroll drift for an image inside its frame. The child is oversized by
 * `amount` and travels at most that far (≤ 8%). Off on touch/mobile and for
 * reduced motion.
 */
export function Drift({ children, amount = 8, className = '' }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const set = () => setEnabled(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount / 2}%`, `${amount / 2}%`]);
  const on = enabled && !reduce;
  return (
    <div ref={ref} className={`relative h-full w-full overflow-hidden ${className}`}>
      <m.div className="absolute inset-x-0" style={on ? { y, top: `-${amount / 2}%`, bottom: `-${amount / 2}%` } : { top: 0, bottom: 0 }}>
        {children}
      </m.div>
    </div>
  );
}
