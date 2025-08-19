import { notFound } from 'next/navigation';
import { KOREAN_CITIES, getRegionName } from '@/lib/location';
import RegionWeather from '@/components/RegionWeather';
import { Metadata } from 'next';

interface RegionPageProps {
  params: {
    region: string;
  };
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const regionName = getRegionName(params.region);
  
  return {
    title: `${regionName} 날씨 및 행사 정보 - 갈래말래 날씨여행`,
    description: `${regionName}의 실시간 날씨 정보, 5일 예보, 지역 행사 및 축제 정보를 확인하세요.`,
    keywords: `${regionName}, 날씨, 행사, 축제, ${regionName} 날씨, ${regionName} 행사, 갈래말래`,
    openGraph: {
      title: `${regionName} 날씨 및 행사 정보`,
      description: `${regionName}의 실시간 날씨와 행사 정보를 확인하세요.`,
      type: "website",
      locale: "ko_KR",
      url: `https://www.weathertour.org/${params.region}`,
      siteName: "갈래말래 날씨여행",
    },
    twitter: {
      card: "summary_large_image",
      title: `${regionName} 날씨 및 행사 정보`,
      description: `${regionName}의 실시간 날씨와 행사 정보를 확인하세요.`,
    },
    alternates: {
      canonical: `https://www.weathertour.org/${params.region}`,
    },
  };
}

export async function generateStaticParams() {
  return KOREAN_CITIES.map((city) => ({
    region: city.region,
  }));
}

export default function RegionPage({ params }: RegionPageProps) {
  const { region } = params;
  
  // 유효한 지역인지 확인
  const isValidRegion = KOREAN_CITIES.some(city => city.region === region);
  
  if (!isValidRegion) {
    notFound();
  }

  const regionName = getRegionName(region);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <RegionWeather region={region} regionName={regionName} />
        </div>
      </div>
    </div>
  );
}
