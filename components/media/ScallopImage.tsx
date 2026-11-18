import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { scallopMask, type ScallopShape } from '@/lib/scallop';
import type { Photo } from '@/lib/images';
import type { Locale } from '@/lib/i18n';
import { Unveil } from '@/components/motion/Reveal';

const ratios = { '21:9': 21 / 9, '3:2': 3 / 2, '4:5': 4 / 5, '3:4': 3 / 4, '1:1': 1, '2:3': 2 / 3, '5:7': 5 / 7 } as const;
export type Ratio = keyof typeof ratios;

/** Mask style for any element: same scallop language everywhere. */
export function scallopStyle(shape: ScallopShape, ratio: Ratio | number, density = 1): CSSProperties {
  const r = typeof ratio === 'number' ? ratio : ratios[ratio];
  const mask = scallopMask(shape, r, density);
  return { WebkitMaskImage: mask, maskImage: mask, WebkitMaskSize: '100% 100%', maskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' };
}

export function ScallopImage({
  photo,
  locale,
  shape = 'rect',
  ratio = '4:5',
  sizes = '(min-width: 1024px) 33vw, 100vw',
  density = 1,
  priority = false,
  unveil = true,
  veil,
  decorative = false,
  className = '',
  imgClassName = '',
  children,
}: {
  photo: Photo;
  locale: Locale;
  shape?: ScallopShape;
  ratio?: Ratio;
  sizes?: string;
  density?: number;
  priority?: boolean;
  unveil?: boolean;
  veil?: string;
  decorative?: boolean;
  className?: string;
  imgClassName?: string;
  children?: ReactNode;
}) {
  const img = (
    <Image
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt={decorative ? '' : photo.alt[locale]}
      sizes={sizes}
      priority={priority}
      placeholder={photo.blurDataURL ? 'blur' : 'empty'}
      blurDataURL={photo.blurDataURL}
      className={`h-full w-full object-cover ${imgClassName}`}
      style={{ objectPosition: photo.focus ?? '50% 50%' }}
    />
  );
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: String(ratios[ratio]), ...scallopStyle(shape, ratio, density) }}>
      {unveil && !priority ? (
        <Unveil className="h-full w-full" veil={veil}>
          {img}
        </Unveil>
      ) : (
        img
      )}
      {children}
    </div>
  );
}
