import LocationBasedWeather from '@/components/LocationBasedWeather';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          갈래말래 날씨여행
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <LocationBasedWeather />
        </div>
      </div>
    </main>
  );
}
