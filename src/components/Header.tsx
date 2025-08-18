'use client';

import { useState } from 'react';
import Link from 'next/link';

const regions = [
  { name: '서울특별시', path: '/seoul' },
  { name: '부산광역시', path: '/busan' },
  { name: '대구광역시', path: '/daegu' },
  { name: '인천광역시', path: '/incheon' },
  { name: '광주광역시', path: '/gwangju' },
  { name: '대전광역시', path: '/daejeon' },
  { name: '울산광역시', path: '/ulsan' },
  { name: '세종시', path: '/sejong' },
  { name: '경기도', path: '/gyeonggi' },
  { name: '충청북도', path: '/chungbuk' },
  { name: '충청남도', path: '/chungnam' },
  { name: '전라남도', path: '/jeonnam' },
  { name: '경상북도', path: '/gyeongbuk' },
  { name: '경상남도', path: '/gyeongnam' },
  { name: '강원도', path: '/gangwon' },
  { name: '제주도', path: '/jeju' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              갈래말래 날씨여행
            </h1>
          </Link>

          {/* 햄버거 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex space-x-8">
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                지역별 날씨
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1 grid grid-cols-2 gap-1">
                  {regions.map((region) => (
                    <Link
                      key={region.path}
                      href={region.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {region.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <div className="grid grid-cols-2 gap-2">
                {regions.map((region) => (
                  <Link
                    key={region.path}
                    href={region.path}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {region.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
```

