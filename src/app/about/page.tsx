import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 - 갈래말래 날씨여행",
  description: "갈래말래 날씨여행에 대한 소개와 서비스 정보를 확인하세요.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">갈래말래 날씨여행</h1>
        <p className="text-xl text-gray-600">
          날씨와 함께하는 행사/축제 정보를 제공하는 웹사이트입니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">서비스 소개</h2>
          <p className="text-gray-600 mb-4">
            갈래말래 날씨여행은 날씨 정보와 지역별 행사/축제 정보를 결합하여 
            사용자에게 최적의 여행 계획을 제안하는 서비스입니다.
          </p>
          <p className="text-gray-600">
            실시간 날씨 데이터와 정확한 예보를 바탕으로, 
            날씨에 맞는 행사와 축제를 추천해드립니다.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">주요 기능</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              실시간 날씨 정보 제공
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              5일 날씨 예보 서비스
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              지역별 행사/축제 정보
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              날씨별 맞춤 행사 추천
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              전국 16개 지역 정보 제공
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">기술 스택</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">프론트엔드</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Next.js 14.2.5</li>
              <li>• React 18.3.1</li>
              <li>• TypeScript 5.3.0</li>
              <li>• Tailwind CSS 4.1.1</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">백엔드</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Cloudflare Workers</li>
              <li>• OpenWeatherMap API</li>
              <li>• 공공데이터포털 API</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">배포</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Cloudflare Pages</li>
              <li>• Wrangler 4.21.0</li>
              <li>• SSR 지원</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">연락처</h2>
        <p className="text-gray-600">
          서비스에 대한 문의사항이 있으시면 언제든 연락주세요.
        </p>
        <div className="mt-4">
          <a 
            href="/business" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            비즈니스 문의하기
          </a>
        </div>
      </div>
    </div>
  );
}
