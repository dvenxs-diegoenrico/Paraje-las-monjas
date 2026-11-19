import { PageHero } from '@/components/content/PageHero';
import { VisitCTA } from '@/components/conversion/VisitCTA';
import { Gallery } from '@/components/media/Gallery';
import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { galleryChapters, images } from '@/lib/images';

export function GaleriaPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const p = c.galeriaPage;
  const chapters = galleryChapters.map((ch) => ({
    id: ch.id,
    name: p.chapters[ch.id].name,
    intro: p.chapters[ch.id].intro,
    photos: ch.photos,
  }));
  return (
    <>
      <PageHero locale={locale} eyebrow={p.eyebrow} title={p.title} intro={p.intro} backWord={locale === 'es' ? 'galería' : 'gallery'} photo={images.aveParaiso} />
      <Gallery chapters={chapters} locale={locale} labels={{ prev: c.a11y.prev, next: c.a11y.next, close: c.a11y.close, openImage: c.a11y.openImage }} filters={p.filters} navLabel={p.eyebrow} />
      <VisitCTA locale={locale} c={c} />
    </>
  );
}
