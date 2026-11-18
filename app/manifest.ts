import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Paraje Las Monjas',
    short_name: 'Las Monjas',
    start_url: '/',
    display: 'browser',
    background_color: '#EEE8DD',
    theme_color: '#EEE8DD',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
