import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">갈래말래 날씨여행</h3>
            <p className="text-gray-600 text-sm">
              날씨와 함께하는 행사/축제 정보를 제공하는 웹사이트입니다.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">회사</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-gray-600 hover:text-blue-600 transition-colors">
                  비즈니스 문의
                </Link>
              </li>
              <li>
                <Link href="/patch-notes" className="text-gray-600 hover:text-blue-600 transition-colors">
                  패치노트
                </Link>
              </li>
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