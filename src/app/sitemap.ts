import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.weathertour.org'
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/patch-notes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ]

  // 중복 제거: 고유한 region만 사용
  const uniqueRegions = [
    'seoul', 'busan', 'daegu', 'incheon', 'gwangju', 
    'daejeon', 'ulsan', 'sejong', 'gyeonggi', 'chungbuk', 
    'chungnam', 'jeonbuk', 'jeonnam', 'gyeongbuk', 
    'gyeongnam', 'gangwon', 'jeju'
  ]

  const regionPages = uniqueRegions.map((region) => ({
    url: `${baseUrl}/${region}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...regionPages]
}
