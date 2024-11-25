import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fluency',
    short_name: 'Fluency',
    description: 'Aprenda inglês de forma rápida e eficiente',
    start_url: '/',
    display: 'standalone',
    background_color: '#eafdf8',
    theme_color: '#333333',
    icons: [
      {
        src: '/happy_lira.jpg',
        sizes: '192x192',
        type: 'image/jpg',
      },
      {
        src: '/happy_lira.jpg',
        sizes: '512x512',
        type: 'image/jpg',
      },
    ],
  };
}
