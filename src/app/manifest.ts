import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    "name": "כוח אריאל- פטרול",
    "short_name": "פטרול",
    "description": "אפליקציה לניהול פטרולים. כוח אריאל שדה תימן",
    "start_url": "../login",
    "display": "standalone",
    "background_color": "#0f0529",
    "theme_color": "#0f0529",
    "icons": [
        {
            "src": "/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        },
        {
            "src": "/icons/icon-32x32.png",
            "sizes": "32x32",
            "type": "image/png"
        }
    ]
}
}