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
  { name: '전라북도', path: '/jeonbuk' },
  { name: '전라남도', path: '/jeonnam' },
  { name: '경상북도', path: '/gyeongbuk' },
  { name: '경상남도', path: '/gyeongnam' },
  { name: '강원도', path: '/gangwon' },
  { name: '제주도', path: '/jeju' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a className="flex items-center cursor-pointer" href="/">
            <h1 className="text-xl font-bold text-gray-900">갈래말래 날씨여행</h1>
          </a>
          
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          
          <nav className="hidden md:flex space-x-8">
            <a 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer" 
              href="/events"
            >
              전국 행사
            </a>
            
            <div className="relative">
              <button 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center gap-1"
                onClick={() => setIsRegionMenuOpen(!isRegionMenuOpen)}
                onMouseEnter={() => setIsRegionMenuOpen(true)}
                onMouseLeave={() => setIsRegionMenuOpen(false)}
              >
                지역별 날씨
                <svg className={`w-4 h-4 transition-transform ${isRegionMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg transition-all duration-200 z-50 ${
                isRegionMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                <div className="py-1 grid grid-cols-2 gap-1">
                  {regions.map((region) => (
                    <a 
                      key={region.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" 
                      href={region.path}
                      onClick={() => setIsRegionMenuOpen(false)}
                    >
                      {region.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
        
        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* 전국행사 섹션 */}
              <div className="border-b border-gray-200 pb-3">
                <a className="block px-3 py-3 text-gray-800 hover:text-blue-600 text-base font-semibold cursor-pointer hover:bg-blue-50 rounded-md transition-colors" href="/events">
                  전국 행사
                </a>
              </div>
              
              {/* 지역별 날씨 섹션 */}
              <div className="pt-2">
                <p className="text-gray-800 text-base font-semibold mb-3 px-3">지역별 날씨</p>
                <div className="grid grid-cols-2 gap-2">
                  {regions.map((region) => (
                    <a 
                      key={region.path}
                      className="block px-3 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer text-sm rounded-md border border-gray-200 hover:border-gray-300 transition-colors" 
                      href={region.path}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {region.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

