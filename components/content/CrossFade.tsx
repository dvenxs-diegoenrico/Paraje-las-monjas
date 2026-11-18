'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Slow cross-fade between two (or more) server-rendered images.
 * Pauses off-screen and for reduced motion (shows the first image).
 */
export function CrossFade({ slides, interval = 5200, className = '' }: { slides: ReactNode[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !visible) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [reduce, visible, interval, slides.length]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {slides.map((s, n) => (
        <div
          key={n}
          aria-hidden={n !== i}
          className="absolute inset-0 transition-opacity duration-[1800ms] ease-lux"
          style={{ opacity: n === i ? 1 : 0 }}
        >
          {s}
        </div>
      ))}
    </div>
  );
}
