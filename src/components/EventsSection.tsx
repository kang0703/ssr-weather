'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

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

  // 행사 상세페이지로 이동하는 함수
  const handleEventClick = (event: EventData) => {
    if (event.contentId) {
      // contentId가 있으면 contentId 사용 (API 호출)
      router.push(`/events/${event.contentId}`);
    } else {
      // contentId가 없으면 간단한 해시 ID 사용
      const hashId = generateSimpleHash(event.title + event.startDate);
      sessionStorage.setItem(`event_${hashId}`, JSON.stringify(event));
      router.push(`/events/${hashId}`);
    }
  };

  // 간단한 해시 함수
  const generateSimpleHash = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        // 지역별 행사도 전국 행사와 동일한 API 사용하여 데이터 일관성 보장
        const response = await fetch(`/api/events?region=${region}`);
        if (response.ok) {
          const data = await response.json() as { success: boolean; events: EventData[] };
          if (data.success && data.events) {
            // 지역별로 필터링
            const regionEvents = data.events.filter((event: EventData) => {
              // 지역 정보가 있는 경우 지역별 필터링, 없는 경우 전체 표시
              if (region && region !== 'all') {
                // 행사 위치에서 지역 정보 확인 (간단한 키워드 매칭)
                const eventLocation = event.location?.toLowerCase() || '';
                const regionKeywords = getRegionKeywords(region);
                
                const isMatch = regionKeywords.some(keyword => 
                  eventLocation.includes(keyword.toLowerCase())
                );
                
                return isMatch;
              }
              return true;
            });
            
            setEvents(regionEvents);
            
            // 각 행사를 세션스토리지에 저장 (상세 페이지에서 사용)
            regionEvents.forEach((event: EventData) => {
              if (event.contentId) {
                sessionStorage.setItem(`event_${event.contentId}`, JSON.stringify(event));
              }
            });
          } else {
            setEvents([]);
          }
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

  // 지역별 키워드 매칭 함수 - 최신 명칭 반영
  const getRegionKeywords = (region: string): string[] => {
    const regionMap: { [key: string]: string[] } = {
      'seoul': ['서울특별시'],
      'busan': ['부산광역시'],
      'daegu': ['대구광역시'],
      'incheon': ['인천광역시'],
      'gwangju': ['광주광역시'],
      'daejeon': ['대전광역시'],
      'ulsan': ['울산광역시'],
      'sejong': ['세종특별자치시'],
      'gyeonggi': ['경기도'],
      'chungbuk': ['충청북도'],
      'chungnam': ['충청남도'],
      'jeonbuk': ['전라북도'],
      'jeonnam': ['전라남도'],
      'gyeongbuk': ['경상북도'],
      'gyeongnam': ['경상남도'],
      'gangwon': ['강원특별자치도', '강원'],  // ✅ 수정
      'jeju': ['제주특별자치도', '제주']      // ✅ 확인
    };
    
    return regionMap[region] || [region];
  };

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
                      className="w-full h-32 object-cover rounded-lg"
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