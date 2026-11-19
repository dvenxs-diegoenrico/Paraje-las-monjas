'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Muted ambient loop that fades in over a still. It only loads when it will be
 * welcome: wide screens, no reduced-motion preference, no data-saver, and only
 * after the page has finished loading, so it never competes with the LCP image.
 */
export function AmbientVideo({ src, poster, className = '' }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const ok =
      window.matchMedia('(min-width: 768px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !conn?.saveData &&
      !/2g/.test(conn?.effectiveType ?? '');
    if (!ok) return;
    const v = ref.current;
    if (!v) return;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      v.src = src;
      v.play().catch(() => undefined);
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const go = () => (idle ? idle(start) : setTimeout(start, 600));
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
    // pause while the tab is hidden or the hero is off-screen
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => undefined) : v.pause()), { threshold: 0.05 });
    io.observe(v);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setReady(true)}
      className={`pointer-events-none h-full w-full object-cover transition-opacity duration-[2400ms] ease-lux ${ready ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  );
}
