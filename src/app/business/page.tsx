import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "비즈니스 문의 - 갈래말래 날씨여행",
  description: "갈래말래 날씨여행과의 비즈니스 협력 및 문의사항을 안내합니다.",
};

export default function BusinessPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">비즈니스 문의</h1>
        <p className="text-xl text-gray-600">
          갈래말래 날씨여행과 함께 성장할 수 있는 다양한 협력 기회를 제공합니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">협력 분야</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">데이터 파트너십</h3>
              <p className="text-gray-600 text-sm">
                날씨 데이터, 행사 정보, 지역 관광 정보 등을 공유하고 
                상호 시너지를 창출할 수 있는 파트너십을 모색합니다.
              </p>
            </div>
            
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">기술 협력</h3>
              <p className="text-gray-600 text-sm">
                API 연동, 기술 공유, 개발 협력을 통한 
                혁신적인 서비스 개발을 함께 진행합니다.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">마케팅 협력</h3>
              <p className="text-gray-600 text-sm">
                크로스 프로모션, 공동 마케팅 캠페인, 
                브랜드 협력을 통한 시장 확장을 도모합니다.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">문의 양식</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                문의자 명 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="담당자명을 입력해주세요"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                문의자 이메일 *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="이메일을 입력해주세요"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                문의자 연락처
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="연락처를 입력해주세요"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                문의 내용 *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="협력에 대한 구체적인 내용을 작성해주세요"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              문의하기
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">기타 연락 방법</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">이메일</h3>
            <p className="text-sm text-gray-600">business@weather-travel.com</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">전화</h3>
            <p className="text-sm text-gray-600">02-1234-5678</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">주소</h3>
            <p className="text-sm text-gray-600">서울특별시 강남구</p>
          </div>
        </div>
      </div>
    </div>
  );
}
