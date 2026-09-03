import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Atelier — Personal Routine & Sanctuary',
    short_name: 'Atelier',
    description: 'Seu santuário visual de rotina, looks, refeições e estudos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDF2F4',
    theme_color: '#FDF2F4',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
