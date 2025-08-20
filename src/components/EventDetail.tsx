'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EventData } from '@/lib/events';

interface EventDetailProps {
  eventId: string;
}

export default function EventDetail({ eventId }: EventDetailProps) {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 날짜 형식을 읽기 쉽게 변환하는 함수
  const formatDate = (dateString: string): string => {
    if (!dateString || dateString.length !== 8) return '날짜 정보 없음';
    
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    
    return `${year}년 ${month}월 ${day}일`;
  };

  // 기간 계산 함수
  const calculateDuration = (startDate: string, endDate: string): string => {
    if (!startDate || !endDate || startDate.length !== 8 || endDate.length !== 8) {
      return '기간 정보 없음';
    }
    
    const start = new Date(
      parseInt(startDate.substring(0, 4)),
      parseInt(startDate.substring(4, 6)) - 1,
      parseInt(startDate.substring(6, 8))
    );
    
    const end = new Date(
      parseInt(endDate.substring(0, 4)),
      parseInt(endDate.substring(4, 6)) - 1,
      parseInt(endDate.substring(6, 8))
    );
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return `${diffDays}일간`;
  };

  // 날짜/시간 형식을 읽기 쉽게 변환하는 함수
  const formatDateTime = (dateTimeString: string): string => {
    if (!dateTimeString || dateTimeString.length !== 14) return '날짜 정보 없음';
    
    const year = dateTimeString.substring(0, 4);
    const month = dateTimeString.substring(4, 6);
    const day = dateTimeString.substring(6, 8);
    const hour = dateTimeString.substring(8, 10);
    const minute = dateTimeString.substring(10, 12);
    
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  };

  // 카테고리 코드를 이름으로 변환하는 함수
  function getCategoryName(catCode: string): string {
    const categoryMap: { [key: string]: string } = {
      'A02': '관광지',
      'A0202': '자연관광지',
      'A02020700': '유원지',
      'A0203': '역사관광지',
      'A0204': '휴양관광지',
      'A0205': '체험관광지',
      'A0206': '산업관광지',
      'A0207': '건축/조형물',
      'A0208': '문화시설',
      'A0209': '축제',
      'A0210': '공연/행사',
      'A0211': '레포츠',
      'A0212': '쇼핑',
      'A0213': '음식',
      'A0214': '숙박',
      'A0215': '교통',
      'A0216': '의료',
      'A0217': '기타'
    };
    
    return categoryMap[catCode] || catCode;
  }

  // useEffect 부분만 수정
  useEffect(() => {
    async function fetchEventDetail() {
      try {
        setLoading(true);
        
        // eventId가 숫자인지 확인 (contentId인지 판단)
        const isContentId = /^\d+$/.test(eventId);
        
        if (isContentId) {
          // 숫자인 경우 contentId로 간주하지만, API 호출하지 않고 세션스토리지에서 바로 가져오기
          const storedEvent = sessionStorage.getItem(`event_${eventId}`);
          
          if (storedEvent) {
            const eventData = JSON.parse(storedEvent);
            setEvent(eventData);
          } else {
            // 세션스토리지에 없으면 에러 처리
            throw new Error('세션스토리지에서 행사 정보를 찾을 수 없습니다.');
          }
        } else {
          // 숫자가 아닌 경우 해시 ID로 간주하여 세션스토리지에서 데이터 가져오기
          const storedEvent = sessionStorage.getItem(`event_${eventId}`);
          
          if (storedEvent) {
            const eventData = JSON.parse(storedEvent);
            setEvent(eventData);
          } else {
            throw new Error('세션스토리지에서 행사 정보를 찾을 수 없습니다.');
          }
        }
        
        setError(null);
      } catch (err) {
        setError('행사 정보를 가져오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchEventDetail();
  }, [eventId]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">오류 발생</h2>
          <p className="text-gray-600 mb-6">{error || '행사 정보를 찾을 수 없습니다.'}</p>
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={handleGoBack}
            className="flex items-center space-x-2 hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>뒤로가기</span>
          </button>
          <h1 className="text-2xl font-bold">행사 상세정보</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* 이미지 섹션 */}
      {event.imageUrl && (
        <div className="relative h-64 md:h-96">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}

      {/* 내용 섹션 */}
      <div className="p-6 space-y-6">
        {/* 제목 */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
        </div>

        {/* 기본 정보 - 컴팩트한 디자인 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h3 className="text-lg font-bold text-white">📋 행사 기본 정보</h3>
          </div>
          
          {/* 정보 목록 */}
          <div className="divide-y divide-gray-100">
            {/* 기간 정보 */}
            <div className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">행사 기간</h4>
                <p className="text-gray-600 text-sm">
                  {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
                </p>
              </div>
              <div className="ml-4">
                <span className="inline-flex items-center px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {calculateDuration(event.startDate, event.endDate)}
                </span>
              </div>
            </div>

            {/* 위치 정보 */}
            <div className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">행사 장소</h4>
                <p className="text-gray-600 text-sm">{event.location}</p>
              </div>
              <div className="ml-4 flex space-x-2">
                <button
                  onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(event.location)}`, '_blank')}
                  className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors"
                >
                  🗺️ 지도
                </button>
              </div>
            </div>

            {/* 연락처 정보 */}
            {event.tel && (
              <div className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">문의 연락처</h4>
                  <p className="text-gray-600 text-sm font-mono">{event.tel}</p>
                </div>
                <div className="ml-4 flex space-x-2">
                  <button
                    onClick={() => {
                      if (event.tel && event.tel.trim() !== '') {
                        navigator.clipboard.writeText(event.tel);
                        alert('전화번호가 복사되었습니다!');
                      } else {
                        alert('전화번호 정보가 없습니다.');
                      }
                    }}
                    className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    📋 복사
                  </button>
                  <button
                    onClick={() => {
                      if (event.tel && event.tel.trim() !== '') {
                        window.open(`tel:${event.tel}`);
                      } else {
                        alert('전화번호 정보가 없습니다.');
                      }
                    }}
                    className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    📞 전화
                  </button>
                </div>
              </div>
            )}

            {/* 홈페이지 정보 */}
            {event.homepage && (
              <div className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">공식 홈페이지</h4>
                  <p className="text-gray-600 text-sm break-all">{event.homepage}</p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => {
                      if (event.homepage && event.homepage.trim() !== '') {
                        window.open(event.homepage, '_blank');
                      } else {
                        alert('홈페이지 정보가 없습니다.');
                      }
                    }}
                    className="inline-flex items-center px-3 py-1.5 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-lg hover:bg-cyan-200 transition-colors"
                  >
                    🔗 방문
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 상세 설명 */}
        {event.description && event.description !== '설명 없음' && event.description.trim() !== '' && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">상세 정보</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                {event.description}
              </p>
            </div>
            
            {/* 추가 정보 표시 */}
            {event.createdTime && (
              <div className="mt-4 text-xs text-gray-500">
                <p>등록일: {formatDateTime(event.createdTime)}</p>
                {event.modifiedTime && <p>수정일: {formatDateTime(event.modifiedTime)}</p>}
              </div>
            )}
          </div>
        )}

        {/* 추가 이미지들 */}
        {event.images && event.images.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">추가 이미지</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {event.images.slice(0, 8).map((imageUrl, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={`${event.title} 이미지 ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 지도 섹션 추가 (좌표 정보가 있는 경우) */}
        {event.mapX && event.mapY && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">위치 정보</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                📍 {event.location}
                {event.zipCode && ` (${event.zipCode})`}
              </p>
              <p className="text-xs text-gray-500">
                좌표: {event.mapX}, {event.mapY}
              </p>
              <button
                onClick={() => window.open(`https://www.google.com/maps?q=${event.mapY},${event.mapX}`, '_blank')}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                🗺️ Google Maps에서 보기
              </button>
            </div>
          </div>
        )}

        {/* 추가 정보 섹션에 새로운 정보들 표시 */}
        {/* 이용 정보 섹션 */}
        {(event.maxCapacity || event.minAge || event.maxAge || event.dressCode || event.prohibitedItems || event.reservationInfo) && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">이용 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.maxCapacity && (
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-indigo-900">최대 수용인원</p>
                  <p className="text-indigo-700">{event.maxCapacity}</p>
                </div>
              )}
              {event.minAge && event.maxAge && (
                <div className="bg-teal-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-teal-900">연령 제한</p>
                  <p className="text-teal-700">{event.minAge}세 ~ {event.maxAge}세</p>
                </div>
              )}
              {event.dressCode && (
                <div className="bg-cyan-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-cyan-900">복장 규정</p>
                  <p className="text-cyan-700">{event.dressCode}</p>
                </div>
              )}
              {event.prohibitedItems && (
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-amber-900">금지물품</p>
                  <p className="text-amber-700">{event.prohibitedItems}</p>
                </div>
              )}
              {event.reservationInfo && (
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-emerald-900">예약정보</p>
                  <p className="text-emerald-700">{event.reservationInfo}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 접근성 정보 섹션 */}
        {(event.elevatorInfo || event.restroomInfo || event.nursingRoomInfo || event.wheelchairInfo || event.petInfo || event.babyCarriageInfo) && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">접근성 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.elevatorInfo && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">엘리베이터</p>
                  <p className="text-blue-700">{event.elevatorInfo}</p>
                </div>
              )}
              {event.wheelchairInfo && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-900">휠체어</p>
                  <p className="text-green-700">{event.wheelchairInfo}</p>
                </div>
              )}
              {event.petInfo && (
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-purple-900">반려동물</p>
                  <p className="text-purple-700">{event.petInfo}</p>
                </div>
              )}
              {event.babyCarriageInfo && (
                <div className="bg-pink-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-pink-900">유모차</p>
                  <p className="text-pink-700">{event.babyCarriageInfo}</p>
                </div>
              )}
              {event.restroomInfo && (
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-orange-900">화장실</p>
                  <p className="text-orange-700">{event.restroomInfo}</p>
                </div>
              )}
              {event.nursingRoomInfo && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-red-900">수유실</p>
                  <p className="text-red-700">{event.nursingRoomInfo}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 교통 정보 섹션 */}
        {(event.nearestStation || event.busRoutes || event.taxiInfo || event.carRoute || event.parking || event.publicTransport) && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">교통 정보</h3>
            <div className="space-y-3">
              {event.nearestStation && (
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">가장 가까운 역: {event.nearestStation}</span>
                </div>
              )}
              {event.busRoutes && (
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">버스 노선: {event.busRoutes}</span>
                </div>
              )}
              {event.taxiInfo && (
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">택시: {event.taxiInfo}</span>
                </div>
              )}
              {event.parking && (
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">주차: {event.parking}</span>
                </div>
              )}
              {event.publicTransport && (
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">대중교통: {event.publicTransport}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 비용 정보 섹션 */}
        {(event.adultFee || event.childFee || event.groupDiscount || event.freeDay || event.parkingFee) && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">비용 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.adultFee && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">성인 요금</p>
                  <p className="text-blue-700">{event.adultFee}</p>
                </div>
              )}
              {event.childFee && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-900">어린이 요금</p>
                  <p className="text-green-700">{event.childFee}</p>
                </div>
              )}
              {event.groupDiscount && (
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-purple-900">단체 할인</p>
                  <p className="text-purple-700">{event.groupDiscount}</p>
                </div>
              )}
              {event.freeDay && (
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-orange-900">무료일</p>
                  <p className="text-orange-700">{event.freeDay}</p>
                </div>
              )}
              {event.parkingFee && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-red-900">주차요금</p>
                  <p className="text-red-700">{event.parkingFee}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 운영 정보 섹션 */}
        {(event.operatingHours || event.closedDays || event.lastEntry || event.peakHours || event.quietHours) && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">운영 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.operatingHours && (
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-indigo-900">운영시간</p>
                  <p className="text-indigo-700">{event.operatingHours}</p>
                </div>
              )}
              {event.closedDays && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-red-900">휴무일</p>
                  <p className="text-red-700">{event.closedDays}</p>
                </div>
              )}
              {event.lastEntry && (
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-amber-900">마지막 입장</p>
                  <p className="text-amber-700">{event.lastEntry}</p>
                </div>
              )}
              {event.peakHours && (
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-orange-900">혼잡 시간</p>
                  <p className="text-orange-700">{event.peakHours}</p>
                </div>
              )}
              {event.quietHours && (
                <div className="bg-teal-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-teal-900">한적한 시간</p>
                  <p className="text-teal-700">{event.quietHours}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 소셜미디어 섹션 */}
        {(event.instagram || event.facebook || event.youtube || event.blog) && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">소셜미디어</h3>
            <div className="flex space-x-4">
              {event.instagram && (
                <a href={event.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.947.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <p className="text-xs text-center mt-1">Instagram</p>
                </a>
              )}
              {event.facebook && (
                <a href={event.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12.073z"/>
                    </svg>
                  </div>
                  <p className="text-xs text-center mt-1">Facebook</p>
                </a>
              )}
              {event.youtube && (
                <a href={event.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 transition-colors">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <p className="text-xs text-center mt-1">YouTube</p>
                </a>
              )}
              {event.blog && (
                <a href={event.blog} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition-colors">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <p className="text-xs text-center mt-1">Blog</p>
                </a>
              )}
            </div>
          </div>
        )}

        {/* 연락처 추가 정보 섹션 */}
        {(event.emergencyPhone || event.managerPhone || event.email) && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">추가 연락처</h3>
            <div className="space-y-3">
              {event.emergencyPhone && (
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">비상연락처: {event.emergencyPhone}</span>
                </div>
              )}
              {event.managerPhone && (
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">담당자: {event.managerPhone}</span>
                </div>
              )}
              {event.email && (
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">이메일: <a href={`mailto:${event.email}`} className="text-blue-600 hover:underline">{event.email}</a></span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="border-t pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGoBack}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              목록으로 돌아가기
            </button>
            {event.homepage && (
              <button
                onClick={() => {
                  if (event.homepage && event.homepage.trim() !== '') {
                    window.open(event.homepage, '_blank');
                  } else {
                    alert('홈페이지 정보가 없습니다.');
                  }
                }}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                홈페이지 방문
              </button>
            )}
            <button
              onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(event.location)}`, '_blank')}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              지도에서 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
