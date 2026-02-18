import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://auditmydenial.com'
  
  // 1. Static Pages
  const routes = [
    '',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  // 2. Programmatic SEO Pages (The "Sniper" targets)
  // In a real app, we'd fetch this list from the DB.
  const auditTargets = [
    { carrier: 'Aetna', drug: 'Ozempic' },
    { carrier: 'Aetna', drug: 'Wegovy' },
    { carrier: 'UnitedHealthcare', drug: 'Ozempic' },
    { carrier: 'Unknown', drug: 'MRI' },
  ]

  const audits = auditTargets.map((target) => ({
    url: `${baseUrl}/audit/${encodeURIComponent(target.carrier)}/${encodeURIComponent(target.drug)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...audits]
}
