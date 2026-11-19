'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import * as m from 'motion/react-m';
import type { ReactNode } from 'react';

let navigated = false;

/** Slow 700ms fade between pages (never on the first, server-rendered paint). */
export function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    const t = setTimeout(() => {
      navigated = true;
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);
  return (
    <m.div key={pathname} initial={navigated ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </m.div>
  );
}
