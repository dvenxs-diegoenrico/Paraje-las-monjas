import { Analytics } from '@vercel/analytics/next';
import { DM_Mono, Hanken_Grotesk, Newsreader } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { StickyMobileBar } from '@/components/conversion/StickyMobileBar';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { PageFade } from '@/components/motion/PageFade';
import { InViewObserver } from '@/components/motion/InViewObserver';
import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { venueJsonLd } from '@/lib/seo';

// The `latin` subset already covers Spanish and English (á é í ó ú ñ ü ¿ ¡ « »).
// latin-ext is left out on purpose: next/font preloads every listed subset and
// it cost ~90 KB on the critical path for glyphs the copy never uses.
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-newsreader',
});
const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: 'variable', display: 'swap', variable: '--font-hanken' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--font-dm-mono', preload: false });

// Preview switch for the natural textures: ?texturas=1 turns them on for this
// browser session (?texturas=0 turns them off). Set TEXTURES_DEFAULT to true to ship them.
const TEXTURES_DEFAULT = false;
const TEX_SCRIPT = `(function(d){d.classList.add('js');var on=${TEXTURES_DEFAULT};try{var q=new URLSearchParams(location.search).get('texturas');if(q!==null)sessionStorage.setItem('texturas',q);var s=sessionStorage.getItem('texturas');if(s!==null)on=s==='1';}catch(e){}if(on)d.classList.add('tex-on');})(document.documentElement)`;

/** Shared root document for both language trees. */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const c = getContent(locale);
  const nav = { nav: c.nav, a11y: c.a11y, whatsappMessage: c.whatsappMessage };
  return (
    <html lang={c.htmlLang} suppressHydrationWarning className={`${newsreader.variable} ${hanken.variable} ${dmMono.variable}`}>
      <body className="bg-cal text-piedra">
        {/* lets CSS hide not-yet-drawn graphics only when JS will reveal them */}
        <script dangerouslySetInnerHTML={{ __html: TEX_SCRIPT }} />
        <a href="#contenido" className="t-nav fixed left-4 top-4 z-[60] -translate-y-24 bg-piedra px-5 py-4 text-cal transition-transform focus:translate-y-0">
          {c.a11y.skip}
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(venueJsonLd(locale)) }} />
        <MotionProvider>
          <Header locale={locale} c={nav} />
          <main id="contenido" tabIndex={-1} className="outline-none">
            <PageFade>{children}</PageFade>
          </main>
          <Footer locale={locale} c={c} />
          <StickyMobileBar locale={locale} c={nav} />
        </MotionProvider>
        <InViewObserver />
        <Analytics />
      </body>
    </html>
  );
}
