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
        const response = await fetch('/api/events');
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
                return regionKeywords.some(keyword => eventLocation.includes(keyword));
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

  // 지역별 키워드 매칭 함수
  const getRegionKeywords = (region: string): string[] => {
    const regionMap: { [key: string]: string[] } = {
      'seoul': ['서울', '강남', '강북', '강동', '강서', '관악', '광진', '구로', '금천', '노원', '도봉', '동대문', '동작', '마포', '서대문', '서초', '성동', '성북', '송파', '양천', '영등포', '용산', '은평', '종로', '중구', '중랑'],
      'busan': ['부산', '강서', '금정', '남구', '동구', '동래', '부산진', '북구', '사상', '사하', '서구', '수영', '연제', '영도', '중구', '해운대', '기장'],
      'daegu': ['대구', '남구', '달서', '달성', '동구', '북구', '서구', '수성', '중구'],
      'incheon': ['인천', '계양', '남구', '남동', '동구', '부평', '서구', '연수', '중구', '강화', '옹진'],
      'gwangju': ['광주', '광산', '남구', '동구', '북구', '서구'],
      'daejeon': ['대전', '대덕', '동구', '서구', '유성', '중구'],
      'ulsan': ['울산', '남구', '동구', '북구', '울주', '중구'],
      'sejong': ['세종'],
      'gyeonggi': ['경기', '수원', '성남', '의정부', '안양', '부천', '광명', '평택', '과천', '오산', '시흥', '군포', '의왕', '하남', '용인', '파주', '이천', '안성', '김포', '화성', '광주', '여주', '양평', '고양', '안산', '양주', '구리', '남양주', '오산', '시흥', '군포', '의왕', '하남', '용인', '파주', '이천', '안성', '김포', '화성', '광주', '여주', '양평', '고양', '안산', '양주', '구리', '남양주'],
      'chungbuk': ['충북', '청주', '충주', '제천', '보은', '옥천', '영동', '증평', '진천', '괴산', '음성', '단양'],
      'chungnam': ['충남', '천안', '공주', '보령', '아산', '서산', '논산', '계룡', '당진', '금산', '부여', '서천', '청양', '홍성', '예산', '태안'],
      'jeonbuk': ['전북', '전주', '군산', '익산', '정읍', '남원', '김제', '완주', '진안', '무주', '장수', '임실', '순창', '고창', '부안'],
      'jeonnam': ['전남', '목포', '여수', '순천', '나주', '광양', '담양', '곡성', '구례', '고흥', '보성', '화순', '장흥', '강진', '해남', '영암', '무안', '함평', '영광', '장성', '완도', '진도'],
      'gyeongbuk': ['경북', '포항', '경주', '김천', '안동', '구미', '영주', '영천', '상주', '문경', '경산', '군위', '의성', '청송', '영양', '영덕', '청도', '고령', '성주', '칠곡', '예천', '봉화', '울진', '울릉'],
      'gyeongnam': ['경남', '창원', '진주', '통영', '사천', '김해', '밀양', '거제', '양산', '의령', '함안', '창녕', '고성', '남해', '하동', '산청', '함양', '거창', '합천'],
      'gangwon': ['강원', '춘천', '원주', '강릉', '태백', '속초', '삼척', '홍천', '횡성', '영월', '평창', '정선', '철원', '화천', '양구', '인제', '고성', '양양', '동해'],
      'jeju': ['제주', '제주시', '서귀포']
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