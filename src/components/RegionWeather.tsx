'use client';

import { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from '@/lib/weather';
import { getRegionRepresentativeCoordinates, getRegionCities } from '@/lib/location';
import EventsSection from './EventsSection';
import WeatherIcon from './WeatherIcon';

interface RegionWeatherProps {
  region: string;
  regionName: string;
}

export default function RegionWeather({ region, regionName }: RegionWeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRegionWeather();
  }, [region]);

  const fetchRegionWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      // 지역별 대표 좌표 사용
      const coordinates = getRegionRepresentativeCoordinates(region);
      if (!coordinates) {
        throw new Error('지역 좌표를 찾을 수 없습니다.');
      }

      const { lat, lon } = coordinates;
      
      // API 라우트를 통해 데이터 가져오기
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

  const handleRefresh = () => {
    fetchRegionWeather();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{regionName} 날씨 정보를 가져오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">날씨 정보 오류</h2>
            <div className="text-red-600 mb-4">
              <p>{error}</p>
            </div>
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {regionName} 날씨여행
        </h1>
        <p className="text-lg text-gray-600">
          {regionName}의 현재 날씨와 행사 정보를 확인해보세요
        </p>
      </div>

      {/* 날씨 정보 섹션 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">현재 날씨</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">📍 {regionName}</span>
            <button 
              onClick={handleRefresh}
              className="text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer"
            >
              새로고침
            </button>
          </div>
        </div>
        
        <div className="text-center">
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

      {/* 지역별 행사/축제 정보 */}
      <EventsSection region={region} cityName={regionName} />
    </div>
  );
}
