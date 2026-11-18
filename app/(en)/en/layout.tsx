import type { ReactNode } from 'react';
import '../../globals.css';
import { SiteShell } from '@/components/layout/SiteShell';
import { layoutMetadata } from '@/lib/seo';

export const metadata = layoutMetadata('en');

export default function RootLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
