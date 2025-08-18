export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">갈래말래 날씨여행</h3>
            <p className="text-gray-600 text-sm">
              날씨와 함께하는 행사/축제 정보를 제공하는 웹사이트입니다.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">서비스</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>실시간 날씨 정보</li>
              <li>5일 날씨 예보</li>
              <li>지역별 행사/축제</li>
              <li>날씨별 추천 행사</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">문의</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>비즈니스 문의</li>
              <li>기술 지원</li>
              <li>제휴 문의</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © 2024 갈래말래 날씨여행. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}