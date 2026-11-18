'use client';

import * as m from 'motion/react-m';
import { useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

/** opacity + 24px rise, once, when it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  y = 24,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'p' | 'span' | 'section';
}) {
  // same element on server and client; reduced motion keeps the fade, drops the rise
  const reduce = useReducedMotion();
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Tag>
  );
}

/**
 * Unveils an image frame: the content rises out of a clip from the bottom,
 * the way a curtain lifts. Used on scalloped crops.
 */
export function Unveil({
  children,
  className = '',
  delay = 0,
  veil = 'var(--cal)',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  veil?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div className={`relative ${className}`} initial="hidden" whileInView="shown" viewport={{ once: true, margin: '0px 0px -12% 0px' }}>
      <m.div
        className="h-full w-full"
        variants={{ hidden: { scale: reduce ? 1 : 1.08 }, shown: { scale: 1 } }}
        transition={{ duration: 2.2, delay, ease }}
      >
        {children}
      </m.div>
      <m.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-top"
        style={{ background: veil }}
        variants={reduce ? { hidden: { opacity: 1 }, shown: { opacity: 0 } } : { hidden: { scaleY: 1 }, shown: { scaleY: 0 } }}
        transition={{ duration: reduce ? 0.6 : 1.4, delay, ease }}
      />
    </m.div>
  );
}
