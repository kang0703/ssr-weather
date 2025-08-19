'use client';

import { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from '@/lib/weather';
import { findNearestKoreanCity, KOREAN_CITIES, calculateDistance } from '@/lib/location';
import EventsSection from './EventsSection';
import WeatherIcon from './WeatherIcon';

interface LocationData {
  lat: number;
  lon: number;
  cityName: string;
  nearestCityName: string;
}

export default function LocationBasedWeather() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // 지역명을 API region 파라미터로 변환하는 함수
  const getRegionFromCityName = (cityName: string): string => {
    // lib/location.ts의 KOREAN_CITIES와 일치하는 매핑
    const cityToRegion: { [key: string]: string } = {
      '서울특별시': 'seoul',
      '부산광역시': 'busan',
      '대구광역시': 'daegu',
      '인천광역시': 'incheon',
      '광주광역시': 'gwangju',
      '대전광역시': 'daejeon',
      '울산광역시': 'ulsan',
      '세종시': 'sejong',
      '경기도': 'gyeonggi',
      '충청북도': 'chungbuk',
      '충청남도': 'chungnam',
      '전라북도': 'jeonbuk',
      '전라남도': 'jeonnam',
      '경상북도': 'gyeongbuk',
      '경상남도': 'gyeongnam',
      '강원도': 'gangwon',
      '제주도': 'jeju',
    };
    
    // 정확한 매칭 시도
    if (cityToRegion[cityName]) {
      return cityToRegion[cityName];
    }
    
    // 부분 매칭 시도 (도시명에서 지역명 추출)
    for (const [city, region] of Object.entries(cityToRegion)) {
      if (cityName.includes(city) || city.includes(cityName)) {
        return region;
      }
    }
    
    // 기본값
    return 'seoul';
  };

  // 지역명을 계층적으로 표시하는 함수 추가
  const getHierarchicalLocationName = (cityName: string): string => {
    // 광역시/특별시는 그대로 표시
    if (cityName.includes('특별시') || cityName.includes('광역시') || cityName === '세종시') {
      return cityName;
    }
    
    // 도 단위 지역은 "도 시/군" 형태로 표시
    const regionMapping: { [key: string]: string } = {
      '수원시': '경기도 수원시',
      '고양시': '경기도 고양시',
      '성남시': '경기도 성남시',
      '용인시': '경기도 용인시',
      '부천시': '경기도 부천시',
      '안산시': '경기도 안산시',
      '안양시': '경기도 안양시',
      '평택시': '경기도 평택시',
      '시흥시': '경기도 시흥시',
      '김포시': '경기도 김포시',
      '광명시': '경기도 광명시',
      '군포시': '경기도 군포시',
      '오산시': '경기도 오산시',
      '하남시': '경기도 하남시',
      '이천시': '경기도 이천시',
      '안성시': '경기도 안성시',
      '의왕시': '경기도 의왕시',
      '양평군': '경기도 양평군',
      '여주시': '경기도 여주시',
      '과천시': '경기도 과천시',
      '남양주시': '경기도 남양주시',
      '파주시': '경기도 파주시',
      '양주시': '경기도 양주시',
      '구리시': '경기도 구리시',
      '포천시': '경기도 포천시',
      '동두천시': '경기도 동두천시',
      '가평군': '경기도 가평군',
      '연천군': '경기도 연천군',
      
      // 충청북도
      '청주시': '충청북도 청주시',
      '충주시': '충청북도 충주시',
      '제천시': '충청북도 제천시',
      '보은군': '충청북도 보은군',
      '옥천군': '충청북도 옥천군',
      '영동군': '충청북도 영동군',
      '증평군': '충청북도 증평군',
      '진천군': '충청북도 진천군',
      '괴산군': '충청북도 괴산군',
      '음성군': '충청북도 음성군',
      '단양군': '충청북도 단양군',
      
      // 충청남도
      '천안시': '충청남도 천안시',
      '공주시': '충청남도 공주시',
      '보령시': '충청남도 보령시',
      '아산시': '충청남도 아산시',
      '서산시': '충청남도 서산시',
      '논산시': '충청남도 논산시',
      '계룡시': '충청남도 계룡시',
      '당진시': '충청남도 당진시',
      '금산군': '충청남도 금산군',
      '부여군': '충청남도 부여군',
      '서천군': '충청남도 서천군',
      '청양군': '충청남도 청양군',
      '홍성군': '충청남도 홍성군',
      '예산군': '충청남도 예산군',
      '태안군': '충청남도 태안군',
      
      // 전라북도
      '전주시': '전라북도 전주시',
      '군산시': '전라북도 군산시',
      '익산시': '전라북도 익산시',
      '정읍시': '전라북도 정읍시',
      '남원시': '전라북도 남원시',
      '김제시': '전라북도 김제시',
      '완주군': '전라북도 완주군',
      '진안군': '전라북도 진안군',
      '무주군': '전라북도 무주군',
      '장수군': '전라북도 장수군',
      '임실군': '전라북도 임실군',
      '순창군': '전라북도 순창군',
      '고창군': '전라북도 고창군',
      '부안군': '전라북도 부안군',
      
      // 전라남도
      '목포시': '전라남도 목포시',
      '여수시': '전라남도 여수시',
      '순천시': '전라남도 순천시',
      '나주시': '전라남도 나주시',
      '광양시': '전라남도 광양시',
      '담양군': '전라남도 담양군',
      '곡성군': '전라남도 곡성군',
      '구례군': '전라남도 구례군',
      '고흥군': '전라남도 고흥군',
      '보성군': '전라남도 보성군',
      '화순군': '전라남도 화순군',
      '장흥군': '전라남도 장흥군',
      '강진군': '전라남도 강진군',
      '해남군': '전라남도 해남군',
      '영암군': '전라남도 영암군',
      '무안군': '전라남도 무안군',
      '함평군': '전라남도 함평군',
      '영광군': '전라남도 영광군',
      '장성군': '전라남도 장성군',
      '완도군': '전라남도 완도군',
      '진도군': '전라남도 진도군',
      '신안군': '전라남도 신안군',
      
      // 경상북도
      '포항시': '경상북도 포항시',
      '경주시': '경상북도 경주시',
      '김천시': '경상북도 김천시',
      '안동시': '경상북도 안동시',
      '구미시': '경상북도 구미시',
      '영주시': '경상북도 영주시',
      '영천시': '경상북도 영천시',
      '상주시': '경상북도 상주시',
      '문경시': '경상북도 문경시',
      '경산시': '경상북도 경산시',
      '군위군': '경상북도 군위군',
      '의성군': '경상북도 의성군',
      '청송군': '경상북도 청송군',
      '영양군': '경상북도 영양군',
      '영덕군': '경상북도 영덕군',
      '청도군': '경상북도 청도군',
      '고령군': '경상북도 고령군',
      '성주군': '경상북도 성주군',
      '칠곡군': '경상북도 칠곡군',
      '예천군': '경상북도 예천군',
      '봉화군': '경상북도 봉화군',
      '울진군': '경상북도 울진군',
      '울릉군': '경상북도 울릉군',
      
      // 경상남도
      '창원시': '경상남도 창원시',
      '진주시': '경상남도 진주시',
      '통영시': '경상남도 통영시',
      '사천시': '경상남도 사천시',
      '김해시': '경상남도 김해시',
      '밀양시': '경상남도 밀양시',
      '거제시': '경상남도 거제시',
      '양산시': '경상남도 양산시',
      '의령군': '경상남도 의령군',
      '함안군': '경상남도 함안군',
      '창녕군': '경상남도 창녕군',
      '경남고성군': '경상남도 고성군', // 경상남도 고성군
      '남해군': '경상남도 남해군',
      '하동군': '경상남도 하동군',
      '산청군': '경상남도 산청군',
      '함양군': '경상남도 함양군',
      '거창군': '경상남도 거창군',
      '합천군': '경상남도 합천군',
      
      // 강원도
      '춘천시': '강원도 춘천시',
      '원주시': '강원도 원주시',
      '강릉시': '강원도 강릉시',
      '동해시': '강원도 동해시',
      '태백시': '강원도 태백시',
      '속초시': '강원도 속초시',
      '삼척시': '강원도 삼척시',
      '홍천군': '강원도 홍천군',
      '횡성군': '강원도 횡성군',
      '영월군': '강원도 영월군',
      '평창군': '강원도 평창군',
      '정선군': '강원도 정선군',
      '철원군': '강원도 철원군',
      '화천군': '강원도 화천군',
      '양구군': '강원도 양구군',
      '인제군': '강원도 인제군',
      '강원고성군': '강원도 고성군', // 강원도 고성군
      '양양군': '강원도 양양군',
      
      // 제주도
      '제주시': '제주도 제주시',
      '서귀포시': '제주도 서귀포시'
    };
    
    return regionMapping[cityName] || cityName;
  };

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      setPermissionDenied(false);

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude: lat, longitude: lon } = position.coords;
            
            const nearestCity = findNearestKoreanCity(lat, lon);
            
            const locationData: LocationData = {
              lat,
              lon,
              cityName: '현재 위치',
              nearestCityName: nearestCity.name
            };
            setLocation(locationData);

            await fetchWeatherData(lat, lon);
          },
          (positionError) => {
            console.warn('위치 정보를 가져올 수 없음:', positionError);
            
            if (positionError.code === 1) {
              setPermissionDenied(true);
              setError('위치 접근이 거부되었습니다. 위치 권한을 허용해주세요.');
            } else if (positionError.code === 2) {
              setError('위치를 찾을 수 없습니다. GPS가 활성화되어 있는지 확인해주세요.');
            } else if (positionError.code === 3) {
              setError('위치 요청 시간이 초과되었습니다. 다시 시도해주세요.');
            } else {
              setError('위치 정보를 가져오는데 실패했습니다.');
            }
            setLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
          }
        );
      } else {
        setError('이 브라우저는 위치 정보를 지원하지 않습니다.');
        setLoading(false);
      }
    } catch (error) {
      console.error('위치 정보 가져오기 실패:', error);
      setError('위치 정보를 가져오는데 실패했습니다.');
      setLoading(false);
    }
  };

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`/api/weather?lat=${lat}&lon=${lon}&type=current`),
        fetch(`/api/weather?lat=${lat}&lon=${lon}&type=forecast`)
      ]);

      if (weatherRes.ok && forecastRes.ok) {
        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();
        
        setWeather(weatherData as WeatherData);
        setForecast(forecastData as ForecastData[]);
      } else {
        const weatherError = await weatherRes.json().catch(() => ({}));
        const forecastError = await forecastRes.json().catch(() => ({}));
        throw new Error(`API 요청 실패: ${(weatherError as any).error || (forecastError as any).error}`);
      }
    } catch (error) {
      console.error('날씨 데이터 가져오기 실패:', error);
      setError('날씨 정보를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleLocationRefresh = () => {
    getCurrentLocation();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">위치 정보를 가져오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">위치 정보 오류</h2>
          <div className="text-red-600 mb-4">
            <p>{error}</p>
          </div>
          
          {permissionDenied && (
            <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-700">
                브라우저 설정에서 위치 접근 권한을 허용해주세요.
              </p>
            </div>
          )}
          
          <button 
            onClick={handleLocationRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">현재 날씨</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">📍 {location.cityName}</span>
            <button 
              onClick={handleLocationRefresh}
              className="text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer"
            >
              새로고침
            </button>
          </div>
        </div>
        
        <div className="text-center">
          {/* 현재 위치 정보 표시 */}
          <div className="mb-4">
            <div className="text-lg font-medium text-gray-700 mb-2">
              📍 {getHierarchicalLocationName(location.nearestCityName)}
            </div>
          </div>
          
          {weather && (
            <>
              <div className="flex items-center justify-center mb-4">
                <WeatherIcon icon={weather.icon} size={80} className="mr-4" />
                <div>
                  <div className="text-4xl font-bold text-blue-600">{weather.temperature}°C</div>
                  <div className="text-lg text-gray-600">{weather.description}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                체감온도: {weather.feels_like}°C | 습도: {weather.humidity}% | 풍속: {weather.wind_speed}m/s
              </div>
            </>
          )}
          
          {forecast.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">5일 예보</h3>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-5 gap-2 min-w-[665px]">
                  {forecast.map((day, index) => (
                    <div key={index} className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm font-medium">{day.date}</div>
                      <WeatherIcon icon={day.icon} size={32} className="mx-auto my-1 flex items-center justify-center" />
                      <div className="text-xs text-gray-600 mb-2">{day.description}</div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-red-500 font-medium">최고</span>
                          <div className="text-lg font-bold text-red-600">{day.temp_max}°</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-blue-500 font-medium">최저</span>
                          <div className="text-sm text-blue-600">{day.temp_min}°</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 현재 위치 기반 행사/축제 정보 */}
      {location && (
        <EventsSection 
          region={getRegionFromCityName(location.nearestCityName)}
          cityName={getHierarchicalLocationName(location.nearestCityName)}
        />
      )}
    </div>
  );
}
