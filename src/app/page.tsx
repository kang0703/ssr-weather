import { getCurrentWeather, getWeatherForecast } from '@/lib/weather';
import { getEventsByRegion } from '@/lib/events';
import WeatherSection from '@/components/WeatherSection';
import EventsSection from '@/components/EventsSection';

// 기본 위치 (서울)
const DEFAULT_LAT = 37.5665;
const DEFAULT_LON = 126.9780;
const DEFAULT_REGION = 'seoul';

export default async function HomePage() {
  // 서버 컴포넌트에서는 직접 API 함수를 호출할 수 없으므로
  // API 라우트를 통해 호출하거나, 다른 방법을 사용해야 합니다
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          갈래말래 날씨여행
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WeatherSection />
          <EventsSection />
        </div>
      </div>
    </main>
  );
}
