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
            
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                지역별 날씨
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1 grid grid-cols-2 gap-1">
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/seoul">서울특별시</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/busan">부산광역시</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/daegu">대구광역시</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/incheon">인천광역시</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/gwangju">광주광역시</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/daejeon">대전광역시</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/ulsan">울산광역시</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/sejong">세종시</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/gyeonggi">경기도</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/chungbuk">충청북도</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/chungnam">충청남도</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/jeonbuk">전라북도</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/jeonnam">전라남도</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/gyeongbuk">경상북도</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/gyeongnam">경상남도</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/gangwon">강원도</a>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" href="/jeju">제주도</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
        
        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium cursor-pointer" href="/events">
                전국 행사
              </a>
              {/* 모바일에서는 지역별 날씨를 간단하게 표시 */}
              <div className="px-3 py-2">
                <p className="text-gray-600 text-sm font-medium mb-2">지역별 날씨</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <a className="block px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer" href="/seoul">서울</a>
                  <a className="block px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer" href="/busan">부산</a>
                  <a className="block px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer" href="/daegu">대구</a>
                  <a className="block px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer" href="/incheon">인천</a>
                  {/* 더 많은 지역은 필요시 추가 */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

