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

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            협력 분야
          </span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* 데이터 파트너십 */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-blue-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                데이터 파트너십
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                날씨 데이터, 행사 정보, 지역 관광 정보 등을 공유하고 
                <span className="font-semibold text-blue-600"> 상호 시너지</span>를 창출할 수 있는 
                파트너십을 모색합니다.
              </p>
            </div>
          </div>

          {/* 기술 협력 */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                기술 협력
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                API 연동, 기술 공유, 개발 협력을 통한 
                <span className="font-semibold text-green-600"> 혁신적인 서비스</span> 개발을 
                함께 진행합니다.
              </p>
            </div>
          </div>

          {/* 마케팅 협력 */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-purple-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                마케팅 협력
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                크로스 프로모션, 공동 마케팅 캠페인, 
                <span className="font-semibold text-purple-600"> 브랜드 협력</span>을 통한 
                시장 확장을 도모합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 text-center shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">연락 방법</h2>
        <div className="flex justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-3 text-xl">이메일</h3>
            <p className="text-lg text-gray-700 font-medium">kcmschool@naver.com</p>
            <p className="text-sm text-gray-600 mt-2">비즈니스 협력 문의사항은 이메일로 연락주세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
