import LocationBasedWeather from '@/components/LocationBasedWeather';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "갈래말래 날씨여행 - 날씨와 행사 정보",
  description: "실시간 날씨 정보와 전국 행사/축제 정보를 제공하는 웹사이트입니다. 16개 지역의 날씨와 맞춤 행사를 확인하세요.",
  keywords: "날씨, 행사, 축제, 여행, 지역별 날씨, 날씨 예보, 한국 날씨, 갈래말래",
  openGraph: {
    title: "갈래말래 날씨여행 - 날씨와 행사 정보",
    description: "실시간 날씨 정보와 전국 행사/축제 정보를 제공하는 웹사이트입니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "갈래말래 날씨여행",
    url: "https://www.weathertour.org/",
  },
  twitter: {
    card: "summary_large_image",
    title: "갈래말래 날씨여행 - 날씨와 행사 정보",
    description: "실시간 날씨 정보와 전국 행사/축제 정보를 제공하는 웹사이트입니다.",
  },
  alternates: {
    canonical: "https://www.weathertour.org/",
  },
};

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
