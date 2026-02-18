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
  const auditTargets = [
    // Aetna Targets
    { carrier: 'Aetna', drug: 'Ozempic' },
    { carrier: 'Aetna', drug: 'Wegovy' },
    { carrier: 'Aetna', drug: 'Mounjaro' },
    { carrier: 'Aetna', drug: 'Zepbound' },
    { carrier: 'Aetna', drug: 'Trulicity' },
    
    // UnitedHealthcare (UHC)
    { carrier: 'UnitedHealthcare', drug: 'Ozempic' },
    { carrier: 'UnitedHealthcare', drug: 'Wegovy' },
    { carrier: 'UnitedHealthcare', drug: 'Mounjaro' },
    { carrier: 'UnitedHealthcare', drug: 'Zepbound' },
    
    // BCBS
    { carrier: 'BCBS', drug: 'Ozempic' },
    { carrier: 'BCBS', drug: 'Wegovy' },
    { carrier: 'BCBS', drug: 'Mounjaro' },
    { carrier: 'BCBS', drug: 'Humira' },
    { carrier: 'BCBS', drug: 'Stelara' },
    
    // Cigna
    { carrier: 'Cigna', drug: 'Ozempic' },
    { carrier: 'Cigna', drug: 'Wegovy' },
    { carrier: 'Cigna', drug: 'Enbrel' },
    { carrier: 'Cigna', drug: 'Skyrizi' },
    
    // Humana
    { carrier: 'Humana', drug: 'Ozempic' },
    { carrier: 'Humana', drug: 'Wegovy' },
    { carrier: 'Humana', drug: 'Tremfya' },
    
    // Specialty / General
    { carrier: 'Unknown', drug: 'MRI' },
    { carrier: 'Unknown', drug: 'Radiology' },
    { carrier: 'Medicare', drug: 'Ozempic' },
    { carrier: 'Kaiser', drug: 'Ozempic' }
  ]

  const audits = auditTargets.map((target) => ({
    url: `${baseUrl}/audit/${target.carrier}/${target.drug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...audits]
}
