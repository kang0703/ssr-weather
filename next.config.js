/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 성능 최적화
  experimental: {
    optimizeCss: true,
  },
  // 압축 설정
  compress: true,
  // poweredByHeader 제거
  poweredByHeader: false,
  // 환경변수
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://www.weathertour.org',
  },
};

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
initOpenNextCloudflareForDev();

module.exports = nextConfig;
