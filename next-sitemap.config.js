/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.weathertour.org',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://www.weathertour.org/sitemap.xml',
    ],
  },
  exclude: ['/api/*', '/admin/*'],
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // 지역별 페이지 우선순위 조정
    if (path.startsWith('/seoul') || path.startsWith('/busan') || 
        path.startsWith('/daegu') || path.startsWith('/incheon')) {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.95,
        lastmod: new Date().toISOString(),
      }
    }
    
    // 이벤트 페이지 우선순위 조정
    if (path.startsWith('/events/')) {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
