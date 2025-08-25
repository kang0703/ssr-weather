import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.weathertour.org'
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
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

  // 지역별 페이지 - 더 구체적인 정보 포함
  const regionPages = [
    { region: 'seoul', name: '서울특별시', priority: 0.95 },
    { region: 'busan', name: '부산광역시', priority: 0.95 },
    { region: 'daegu', name: '대구광역시', priority: 0.95 },
    { region: 'incheon', name: '인천광역시', priority: 0.95 },
    { region: 'gwangju', name: '광주광역시', priority: 0.95 },
    { region: 'daejeon', name: '대전광역시', priority: 0.95 },
    { region: 'ulsan', name: '울산광역시', priority: 0.95 },
    { region: 'sejong', name: '세종시', priority: 0.95 },
    { region: 'gyeonggi', name: '경기도', priority: 0.9 },
    { region: 'chungbuk', name: '충청북도', priority: 0.9 },
    { region: 'chungnam', name: '충청남도', priority: 0.9 },
    { region: 'jeonbuk', name: '전라북도', priority: 0.9 },
    { region: 'jeonnam', name: '전라남도', priority: 0.9 },
    { region: 'gyeongbuk', name: '경상북도', priority: 0.9 },
    { region: 'gyeongnam', name: '경상남도', priority: 0.9 },
    { region: 'gangwon', name: '강원도', priority: 0.9 },
    { region: 'jeju', name: '제주도', priority: 0.9 },
  ].map(({ region, name, priority }) => ({
    url: `${baseUrl}/${region}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority,
  }))

  return [...staticPages, ...regionPages]
}
