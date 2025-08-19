'use client';

import { useState, useEffect } from 'react';
import { EventData } from '@/lib/events';

interface EventsSectionProps {
  region?: string;
  cityName?: string;
}

export default function EventsSection({ region = 'seoul', cityName = '서울' }: EventsSectionProps) {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // 날짜 형식을 읽기 쉽게 변환하는 함수
  const formatDate = (dateString: string): string => {
    if (!dateString || dateString.length !== 8) return '날짜 정보 없음';
    
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    
    return `${year}.${month}.${day}`;
  };

  // 도 단위 지역명만 추출하는 함수
  const getRegionOnlyName = (cityName: string): string => {
    // "경기도 구리시" → "경기도"
    // "충청남도 천안시" → "충청남도"
    // "서울특별시" → "서울특별시"
    
    if (cityName.includes('특별시') || cityName.includes('광역시') || cityName === '세종시') {
      return cityName;
    }
    
    // "도"가 포함된 경우 도 단위까지만 추출
    if (cityName.includes('도')) {
      const parts = cityName.split(' ');
      if (parts.length >= 2 && parts[0].includes('도')) {
        return parts[0]; // "경기도", "충청북도" 등
      }
    }
    
    return cityName;
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const response = await fetch(`/api/events?region=${region}`);
        if (response.ok) {
          const eventsData = await response.json();
          setEvents(eventsData as EventData[]);
          setError(null);
        } else {
          throw new Error('API 요청 실패');
        }
      } catch (err) {
        console.error('행사 데이터 가져오기 실패:', err);
        setError('행사 정보를 가져오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [region]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {getRegionOnlyName(cityName)} 주요 행사/축제
      </h2>
      
      {events.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>현재 진행 중인 행사가 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.slice(0, showAll ? events.length : 6).map((event, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                {event.imageUrl && (
                  <div className="mb-3">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                  {event.title}
                </h3>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>📅 {formatDate(event.startDate)} ~ {formatDate(event.endDate)}</p>
                  <p>📍 {event.location || '위치 정보 없음'}</p>
                  {event.description && event.description !== '설명 없음' && event.description.trim() !== '' && (
                    <p className="text-gray-500 line-clamp-2">{event.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            {events.length > 6 && (
              <button 
                onClick={showAll ? handleShowLess : handleShowMore}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {showAll ? '간단히 보기' : `더 많은 행사 보기 (${events.length - 6}개 더)`}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}