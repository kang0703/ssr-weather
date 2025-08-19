'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EventData } from '@/lib/events';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "전국 행사 & 축제 - 갈래말래 날씨여행",
  description: "전국 곳곳의 다양한 행사와 축제를 한눈에 확인하세요. 날씨와 함께하는 행사 정보를 제공합니다.",
  keywords: "행사, 축제, 전국 행사, 지역 축제, 이벤트, 갈래말래",
  openGraph: {
    title: "전국 행사 & 축제 - 갈래말래 날씨여행",
    description: "전국 곳곳의 다양한 행사와 축제를 한눈에 확인하세요.",
    type: "website",
    locale: "ko_KR",
    url: "https://www.weathertour.org/events",
  },
  alternates: {
    canonical: "https://www.weathertour.org/events",
  },
};

export default function AllEventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  // 날짜 포맷 함수 (EventsSection과 동일)
  const formatDate = (dateString: string): string => {
    if (!dateString || dateString.length !== 8) return '날짜 정보 없음';
    
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/events');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})) as { details?: string };
        throw new Error(errorData.details || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json() as { success: boolean; events: EventData[] };
      
      if (data.success && data.events) {
        setEvents(data.events);
        
        // 각 행사를 세션스토리지에 저장
        data.events.forEach((event: EventData) => {
          if (event.contentId) {
            sessionStorage.setItem(`event_${event.contentId}`, JSON.stringify(event));
          }
        });
      } else {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
      }
    } catch (err) {
      console.error('전국 행사 조회 실패:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleEventClick = (event: EventData) => {
    if (event.contentId) {
      sessionStorage.setItem(`event_${event.contentId}`, JSON.stringify(event));
      window.location.href = `/events/${event.contentId}`;
    }
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">행사 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-bold">오류 발생</p>
              <p>{error}</p>
              <button 
                onClick={fetchAllEvents}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 섹션 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              전국 행사 & 축제
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              전국 곳곳의 다양한 행사와 축제를 한눈에 확인하세요
            </p>
            
            {/* 검색 */}
            <div className="flex justify-center items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="행사명 또는 지역으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 행사 목록 - EventsSection과 동일한 디자인 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            전국 주요 행사/축제
          </h2>
          
          {filteredEvents.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>검색 결과가 없습니다.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.slice(0, showAll ? filteredEvents.length : 6).map((event, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-105"
                    onClick={() => handleEventClick(event)}
                  >
                    {event.imageUrl && (
                      <div className="mb-3">
                        <img 
                          src={event.imageUrl} 
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>📅 {formatDate(event.startDate)} ~ {formatDate(event.endDate)}</p>
                      <p>📍 {event.location || '위치 정보 없음'}</p>
                      {event.description && event.description !== '설명 없음' && event.description.trim() !== '' && (
                        <p className="text-gray-500 line-clamp-2">{event.description}</p>
                      )}
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <p className="text-xs text-blue-600 font-medium">자세히 보기 →</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                {filteredEvents.length > 6 && (
                  <button 
                    onClick={showAll ? handleShowLess : handleShowMore}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {showAll ? '간단히 보기' : `더 많은 행사 보기 (${filteredEvents.length - 6}개 더)`}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* 결과 개수 표시 */}
        <div className="mt-8 text-center text-gray-600">
          총 {filteredEvents.length}개의 행사를 찾았습니다.
        </div>
      </div>
    </div>
  );
}
