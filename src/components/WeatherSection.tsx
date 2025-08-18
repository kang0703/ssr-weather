'use client';

import { useState, useEffect } from 'react';
import { getCurrentWeather, getWeatherForecast, WeatherData, ForecastData } from '@/lib/weather';

export default function WeatherSection() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        setLoading(true);
        
        // 현재 위치 가져오기 (기본값: 서울)
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        
        // 현재 날씨와 예보 동시에 가져오기
        const [currentWeather, weatherForecast] = await Promise.all([
          getCurrentWeather(latitude, longitude),
          getWeatherForecast(latitude, longitude)
        ]);
        
        setWeather(currentWeather);
        setForecast(weatherForecast);
        setError(null);
      } catch (err) {
        console.error('날씨 데이터 가져오기 실패:', err);
        setError('날씨 정보를 가져오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherData();
  }, []);

  function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        // 위치 정보를 지원하지 않는 경우 서울 좌표 사용
        resolve({
          coords: { latitude: 37.5665, longitude: 126.9780 } as GeolocationCoordinates,
          timestamp: Date.now()
        } as GeolocationPosition);
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, () => {
        // 위치 정보 접근이 거부된 경우 서울 좌표 사용
        resolve({
          coords: { latitude: 37.5665, longitude: 126.9780 } as GeolocationCoordinates,
          timestamp: Date.now()
        } as GeolocationPosition);
      });
    });
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">현재 날씨</h2>
      
      {weather && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{weather.location}</h3>
              <p className="text-gray-600">{weather.description}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900">{weather.temperature}°C</div>
              <div className="text-sm text-gray-500">체감 {weather.feels_like}°C</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">습도</span>
              <span className="font-medium">{weather.humidity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">풍속</span>
              <span className="font-medium">{weather.wind_speed}m/s</span>
            </div>
          </div>
        </div>
      )}
      
      {forecast.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">5일 예보</h3>
          <div className="grid grid-cols-5 gap-2">
            {forecast.map((day, index) => (
              <div key={index} className="text-center p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-600 mb-1">{day.date}</div>
                <div className="text-sm font-medium">
                  <div className="text-red-500">{day.temp_max}°</div>
                  <div className="text-blue-500">{day.temp_min}°</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}