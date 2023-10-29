import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OeVA',
    short_name: 'OeVA',
    description: 'OeVA',
    start_url: '/app',
    scope: '/app',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        "src": "icon/192x192",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "icon/512x512",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
  }
}