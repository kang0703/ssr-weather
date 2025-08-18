import WeatherSection from '@/components/WeatherSection';
import EventsSection from '@/components/EventsSection';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          갈래말래 날씨여행
        </h1>
        <p className="text-xl text-gray-600">
          날씨와 함께하는 행사/축제 정보를 확인해보세요
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WeatherSection />
        <EventsSection />
      </div>
    </div>
  );
}
