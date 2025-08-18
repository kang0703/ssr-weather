'use client';

import { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from '@/lib/weather';

export default function WeatherSection() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // 현재 위치 가져오기 (기본값: 서울)
        const lat = 37.5665;
        const lon = 126.9780;

        // API 라우트를 통해 데이터 가져오기
        const [weatherRes, forecastRes] = await Promise.all([
          fetch(`/api/weather?lat=${lat}&lon=${lon}&type=current`),
          fetch(`/api/weather?lat=${lat}&lon=${lon}&type=forecast`)
        ]);

        if (weatherRes.ok && forecastRes.ok) {
          const weatherData = await weatherRes.json();
          const forecastData = await forecastRes.json();
          
          setWeather(weatherData);
          setForecast(forecastData);
        }
      } catch (error) {
        console.error('날씨 데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div className="bg-white rounded-lg shadow-lg p-6">로딩 중...</div>;
  }

  if (!weather) {
    return <div className="bg-white rounded-lg shadow-lg p-6">날씨 정보를 가져올 수 없습니다.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">현재 날씨</h2>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600">{weather.temperature}°C</div>
        <div className="text-lg text-gray-600">{weather.description}</div>
        <div className="text-sm text-gray-500 mt-2">
          체감온도: {weather.feels_like}°C | 습도: {weather.humidity}% | 풍속: {weather.wind_speed}m/s
        </div>
      </div>
      
      {forecast.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">5일 예보</h3>
          <div className="grid grid-cols-5 gap-2">
            {forecast.map((day, index) => (
              <div key={index} className="text-center p-2 bg-gray-50 rounded">
                <div className="text-sm font-medium">{day.date}</div>
                <div className="text-lg font-bold text-blue-600">{day.temp_max}°</div>
                <div className="text-sm text-gray-500">{day.temp_min}°</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}