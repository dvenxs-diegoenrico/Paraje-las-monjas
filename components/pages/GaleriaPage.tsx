import { PageHero } from '@/components/content/PageHero';
import { VisitCTA } from '@/components/conversion/VisitCTA';
import { Gallery } from '@/components/media/Gallery';
import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { galleryChapters, images } from '@/lib/images';
import { scallopMask } from '@/lib/scallop';
import { Icon, type IconName } from '@/components/base/Icon';

const CH_ICON: Record<string, IconName> = { arquitectura: 'arco', jardines: 'arbol', mesa: 'mesa', noche: 'luna' };

export function GaleriaPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const p = c.galeriaPage;
  const chapters = galleryChapters.map((ch) => ({
    id: ch.id,
    name: p.chapters[ch.id].name,
    intro: p.chapters[ch.id].intro,
    photos: ch.photos,
    masks: ch.photos.map((_, i) => scallopMask(i % 2 === 0 ? 'arch' : 'rect', i % 3 === 1 ? 3 / 4 : 4 / 5, 0.8)),
  }));
  return (
    <>
      <PageHero locale={locale} eyebrow={p.eyebrow} title={p.title} intro={p.intro} backWord={locale === 'es' ? 'galería' : 'gallery'} photo={images.aveParaiso} />
      <nav aria-label={p.eyebrow} className="container-lux">
        <ol className="t-nav flex flex-wrap gap-x-8 gap-y-2 border-y border-cantera/40 py-4">
          {chapters.map((ch, i) => (
            <li key={ch.id}>
              <a href={`#${ch.id}`} className="group inline-flex min-h-[44px] items-center gap-2">
                <Icon name={CH_ICON[ch.id]} size={20} className="text-tabique" />
                <span className="link-grow">{ch.name}</span>
                <span className="t-caption text-piedra/70">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <Gallery chapters={chapters} locale={locale} labels={{ prev: c.a11y.prev, next: c.a11y.next, close: c.a11y.close, openImage: c.a11y.openImage }} />
      <VisitCTA locale={locale} c={c} />
    </>
  );
}
