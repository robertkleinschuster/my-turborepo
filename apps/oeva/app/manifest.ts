import type { MetadataRoute } from 'next'

export const APP_NAME = "OeVA";
export const APP_DEFAULT_TITLE = "OeVA";
export const APP_TITLE_TEMPLATE = "%s - OeVA";
export const APP_DESCRIPTION = "OeVA";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: APP_DESCRIPTION,
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