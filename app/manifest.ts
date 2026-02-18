import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AuditMyDenial™ Verification Engine',
    short_name: 'AuditMyDenial',
    description: 'Algorithmic verification for medical insurance denials.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#F59E0B',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
