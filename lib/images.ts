/**
 * Every photograph on the site lives here. To swap in final photography,
 * replace the file in /public/images (same name) or change `src` below,
 * then run `python3 -I scripts/process_photos.py` to refresh sizes + blur.
 *
 * TODO(final photos): all entries are low-resolution placeholders extracted
 * from the client's sample PDFs (435–1,286 px wide). See README → Photography.
 */
import meta from './images.meta.json';
import type { Locale } from './i18n';

export type Chapter = 'arquitectura' | 'jardines' | 'mesa' | 'noche';

export type SpaceId = 'pilares' | 'pabellon' | 'arbolado' | 'pradera' | 'jornada';
export type StyleId = 'clasico' | 'madera' | 'jardin';

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
  chapter: Chapter;
  /** what is visible in the photograph; used by the gallery filters. Leave unset when unsure. */
  space?: SpaceId;
  style?: StyleId;
  /** focal point for object-position when cropping */
  focus?: string;
};

type Meta = Record<string, { w: number; h: number; blur: string }>;
const m = meta as Meta;

function photo(id: string, p: Omit<Photo, 'id' | 'src' | 'width' | 'height' | 'blurDataURL'>, ext = 'jpg'): Photo {
  const info = m[id];
  return { id, src: `/images/${id}.${ext}`, width: info.w, height: info.h, blurDataURL: info.blur || undefined, ...p };
}

export const images = {
  pabellonCristal: photo('pabellon-cristal', {
    chapter: 'arquitectura',
    space: 'pabellon',
    style: 'madera',
    focus: '50% 55%',
    alt: {
      es: 'Pabellón de cristal con perfil negro; mesa redonda con mantel azul marino y sillas de madera, el jardín al fondo.',
      en: 'Glass pavilion with black frames; a round table with a navy cloth and wooden chairs, the garden beyond.',
    },
    caption: { es: 'Pabellón de Cristal', en: 'Glass Pavilion' },
  }),
  mesaCristal: photo('mesa-cristal', {
    chapter: 'mesa',
    space: 'pabellon',
    style: 'madera',
    alt: {
      es: 'Mesa redonda con mantel rosa de lino, copas y centro de flores dentro del pabellón de cristal.',
      en: 'Round table with pink linen, glassware and a floral centrepiece inside the glass pavilion.',
    },
    caption: { es: 'Mantel rosa de lino · Pabellón', en: 'Pink linen · Pavilion' },
  }),
  salonPiedra: photo('salon-piedra', {
    chapter: 'noche',
    space: 'pilares',
    style: 'madera',
    focus: '50% 60%',
    alt: {
      es: 'Salón con muro de piedra, telas blancas en el techo y luces colgantes sobre una mesa larga de madera.',
      en: 'Hall with a stone wall, white drapes overhead and hanging lights above a long wooden table.',
    },
    caption: { es: 'Muro de piedra y luces colgantes', en: 'Stone wall and hanging lights' },
  }),
  salonPilares: photo('salon-pilares', {
    chapter: 'arquitectura',
    space: 'pilares',
    style: 'clasico',
    focus: '40% 50%',
    alt: {
      es: 'Salón de pilares de tabique aparente con mesas vestidas de blanco y rosa y sillas Tiffany.',
      en: 'Hall of exposed-brick pillars with tables dressed in white and pink and Tiffany chairs.',
    },
    caption: { es: 'Salón de Pilares', en: 'Hall of Pillars' },
  }),
  mesaMadera: photo('mesa-madera', {
    chapter: 'mesa',
    style: 'madera',
    alt: {
      es: 'Mesa de madera oscura con camino de lino, platos sobre bajoplatos de palma y servilletas blancas.',
      en: 'Dark wooden table with a linen runner, plates on palm chargers and white napkins.',
    },
    caption: { es: 'Mesa vintage de madera', en: 'Vintage wooden table' },
  }),
  aveParaiso: photo('ave-paraiso', {
    chapter: 'mesa',
    space: 'pabellon',
    style: 'madera',
    alt: {
      es: 'Mesa con camino naranja, servilletas fucsia, copas de color y un centro de aves del paraíso.',
      en: 'Table with an orange runner, fuchsia napkins, coloured glasses and a bird-of-paradise centrepiece.',
    },
    caption: { es: 'Aves del paraíso', en: 'Birds of paradise' },
  }),
  arbolado: photo('jardin-arboles-1', {
    chapter: 'jardines',
    space: 'arbolado',
    style: 'jardin',
    focus: '50% 40%',
    alt: {
      es: 'El Arbolado: jardín de pasto con árboles maduros y un andador de piedra rojiza.',
      en: 'El Arbolado: a lawn garden with mature trees and a reddish stone path.',
    },
    caption: { es: 'El Arbolado', en: 'El Arbolado' },
  }),
  arboladoRecorte: photo(
    'jardin-arboles-1-recorte',
    {
      chapter: 'jardines',
      alt: { es: '', en: '' },
      caption: { es: 'El Arbolado', en: 'El Arbolado' },
    },
    'png',
  ),
  arboladoFuente: photo('jardin-arboles-2', {
    chapter: 'jardines',
    space: 'arbolado',
    style: 'jardin',
    focus: '50% 55%',
    alt: {
      es: 'Jardín de sombra con una fuente al centro, árboles y una línea de focos colgantes.',
      en: 'Shade garden with a fountain at its centre, trees and a line of hanging bulbs.',
    },
    caption: { es: 'El Arbolado · la fuente', en: 'El Arbolado · the fountain' },
  }),
  pradera: photo('jardin-multiusos-1', {
    chapter: 'jardines',
    space: 'pradera',
    style: 'jardin',
    focus: '50% 60%',
    alt: {
      es: 'La Pradera: un prado largo entre setos y cipreses bajo un cielo despejado.',
      en: 'La Pradera: a long lawn between hedges and cypresses under a clear sky.',
    },
    caption: { es: 'La Pradera', en: 'La Pradera' },
  }),
  praderaRecorte: photo(
    'jardin-multiusos-1-recorte',
    { chapter: 'jardines', alt: { es: '', en: '' }, caption: { es: 'La Pradera', en: 'La Pradera' } },
    'png',
  ),
  praderaSetos: photo('jardin-multiusos-2', {
    chapter: 'jardines',
    space: 'pradera',
    style: 'jardin',
    alt: {
      es: 'Prado abierto bordeado de setos altos y cipreses, con un muro encalado a la derecha.',
      en: 'Open lawn edged by tall hedges and cypresses, with a lime-washed wall on the right.',
    },
    caption: { es: 'La Pradera · los setos', en: 'La Pradera · the hedges' },
  }),
  pabellonAzul: photo('pabellon-mesa-azul', {
    chapter: 'arquitectura',
    space: 'pabellon',
    style: 'clasico',
    alt: {
      es: 'Mesa redonda con mantel blanco y cubremantel azul, sillas Tiffany blancas, piso de piedra y ventanales.',
      en: 'Round table with white cloth and blue overlay, white Tiffany chairs, stone floor and tall windows.',
    },
    caption: { es: 'Sillas Tiffany · Pabellón', en: 'Tiffany chairs · Pavilion' },
  }),
  pabellonCrossback: photo('pabellon-mesa-crossback', {
    chapter: 'arquitectura',
    space: 'pabellon',
    style: 'madera',
    alt: {
      es: 'Mesa con cubremantel azul y sillas de madera Cross Back sobre piso de piedra, frente al jardín.',
      en: 'Table with a blue overlay and wooden Cross Back chairs on a stone floor, facing the garden.',
    },
    caption: { es: 'Sillas Cross Back', en: 'Cross Back chairs' },
  }),
  mesaLarga: photo('pabellon-mesa-larga', {
    chapter: 'mesa',
    space: 'pabellon',
    style: 'madera',
    alt: {
      es: 'Mesa larga de madera con camino de gasa beige y sillas Cross Back dentro del pabellón de cristal.',
      en: 'Long wooden table with a beige gauze runner and Cross Back chairs inside the glass pavilion.',
    },
    caption: { es: 'Mesa larga · Pabellón', en: 'Long table · Pavilion' },
  }),
  platillo: photo('platillo-pierna', {
    chapter: 'mesa',
    alt: {
      es: 'Plato con pierna en salsa y ensalada de lechuga con fresas sobre una mesa de madera.',
      en: 'A plate of pork leg in sauce with a lettuce and strawberry salad on a wooden table.',
    },
    caption: { es: 'Pierna con mix de lechuga y frutos rojos', en: 'Pork leg with greens and red berries' },
  }),
  jornadaNegras: photo('jornada-negras', {
    chapter: 'arquitectura',
    space: 'jornada',
    alt: {
      es: 'Área techada montada tipo escuela con sillas negras acojinadas frente a una pantalla.',
      en: 'Covered area set classroom-style with black padded chairs facing a screen.',
    },
    caption: { es: 'Jornada · sillas negras acojinadas', en: 'Workday · black padded chairs' },
  }),
  jornadaTiffany: photo('jornada-tiffany', {
    chapter: 'arquitectura',
    space: 'jornada',
    style: 'clasico',
    alt: {
      es: 'Área techada montada tipo escuela con sillas Tiffany blancas frente a una pantalla.',
      en: 'Covered area set classroom-style with white Tiffany chairs facing a screen.',
    },
    caption: { es: 'Jornada · sillas Tiffany', en: 'Workday · Tiffany chairs' },
  }),
} satisfies Record<string, Photo>;

export type ImageKey = keyof typeof images;

export const galleryChapters: { id: Chapter; photos: Photo[] }[] = [
  { id: 'arquitectura', photos: [images.pabellonCristal, images.salonPilares, images.pabellonAzul, images.pabellonCrossback, images.jornadaTiffany] },
  { id: 'jardines', photos: [images.arbolado, images.pradera, images.arboladoFuente, images.praderaSetos] },
  { id: 'mesa', photos: [images.mesaMadera, images.mesaCristal, images.aveParaiso, images.mesaLarga, images.platillo] },
  { id: 'noche', photos: [images.salonPiedra] },
];
