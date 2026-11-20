import type { MouseEvent } from 'react';

/** On the home page the logo scrolls back to the top instead of re-navigating. */
export function scrollHomeToTop(e: MouseEvent, pathname: string | null, home: string) {
  if (pathname !== home) return; // Next scrolls to the top after navigating
  e.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  document.getElementById('contenido')?.focus({ preventScroll: true });
}
