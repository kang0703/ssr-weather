'use client';

import { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from '@/lib/weather';
import { findNearestKoreanCity } from '@/lib/location';
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

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      setPermissionDenied(false);

      // 브라우저의 Geolocation API를 사용하여 현재 위치 가져오기
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude: lat, longitude: lon } = position.coords;
            
            console.log('현재 위치 좌표:', { lat, lon });
            
            // 가장 가까운 한국 도시 찾기
            const nearestCity = findNearestKoreanCity(lat, lon);
            console.log('가장 가까운 도시:', nearestCity);
            
            // 기본값으로 현재 위치 설정
            const locationData: LocationData = {
              lat,
              lon,
              cityName: '현재 위치',
              nearestCityName: nearestCity.name
            };
            setLocation(locationData);

            // 날씨 데이터 가져오기
            await fetchWeatherData(lat, lon);
          },
          (positionError) => {
            console.warn('위치 정보를 가져올 수 없음:', positionError);
            
            if (positionError.code === 1) {
              // 사용자가 위치 접근을 거부한 경우
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
            maximumAge: 300000 // 5분
          }
        );
      } else {
        // Geolocation API를 지원하지 않는 경우
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
      console.log('날씨 데이터 요청:', { lat, lon });

      // API 라우트를 통해 데이터 가져오기
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`/api/weather?lat=${lat}&lon=${lon}&type=current`),
        fetch(`/api/weather?lat=${lat}&lon=${lon}&type=forecast`)
      ]);

      console.log('날씨 API 응답 상태:', { weather: weatherRes.status, forecast: forecastRes.status });

      if (weatherRes.ok && forecastRes.ok) {
        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();
        
        console.log('날씨 데이터 받음:', { weather: weatherData, forecast: forecastData });
        
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
              📍 {location.nearestCityName}
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
              <div className="grid grid-cols-5 gap-2">
                {forecast.map((day, index) => (
                  <div key={index} className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-sm font-medium">{day.date}</div>
                    <WeatherIcon icon={day.icon} size={32} className="mx-auto my-1" />
                    <div className="text-lg font-bold text-blue-600">{day.temp_max}°</div>
                    <div className="text-sm text-gray-500">{day.temp_min}°</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 현재 위치 기반 행사/축제 정보 */}
      {location && (
        <EventsSection 
          region={getRegionFromCityName(location.nearestCityName)}
          cityName={location.nearestCityName}
        />
      )}
    </div>
  );
}
