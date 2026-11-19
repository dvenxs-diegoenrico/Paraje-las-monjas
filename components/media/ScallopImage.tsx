import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Photo } from '@/lib/images';
import type { Locale } from '@/lib/i18n';
import { Unveil } from '@/components/motion/Reveal';

const ratios = { '21:9': 21 / 9, '3:2': 3 / 2, '4:5': 4 / 5, '3:4': 3 / 4, '1:1': 1, '2:3': 2 / 3, '5:7': 5 / 7, '16:9': 16 / 9 } as const;
export type Ratio = keyof typeof ratios;

/** A photograph in a plain rectangular frame with the four-layer shadow. */
export function ScallopImage({
  photo,
  locale,
  ratio = '4:5',
  sizes = '(min-width: 1024px) 33vw, 100vw',
  priority = false,
  unveil = true,
  veil,
  decorative = false,
  shadow = true,
  className = '',
  imgClassName = '',
  children,
}: {
  photo: Photo;
  locale: Locale;
  /** kept so existing call sites compile; frames are always rectangular */
  shape?: 'arch' | 'rect' | 'top' | 'circle';
  ratio?: Ratio;
  sizes?: string;
  density?: number;
  priority?: boolean;
  unveil?: boolean;
  veil?: string;
  decorative?: boolean;
  shadow?: boolean;
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
    <div className={`relative overflow-hidden ${shadow ? 'shadow-lux' : ''} ${className}`} style={{ aspectRatio: String(ratios[ratio]) }}>
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
