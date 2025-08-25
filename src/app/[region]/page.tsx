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
  
  if (!regionName) {
    return {
      title: '지역을 찾을 수 없습니다 - 갈래말래 날씨여행',
      description: '요청하신 지역을 찾을 수 없습니다.',
    };
  }
  
  return {
    title: `${regionName} 날씨 및 행사 정보 - 갈래말래 날씨여행`,
    description: `${regionName}의 실시간 날씨 정보, 5일 예보, 지역 행사 및 축제 정보를 확인하세요.`,
    keywords: `${regionName}, 날씨, 행사, 축제, ${regionName} 날씨, ${regionName} 행사, 갈래말래, 한국 날씨`,
    openGraph: {
      title: `${regionName} 날씨 및 행사 정보`,
      description: `${regionName}의 실시간 날씨와 행사 정보를 확인하세요.`,
      type: "website",
      locale: "ko_KR",
      url: `https://www.weathertour.org/${params.region}`,
      siteName: "갈래말래 날씨여행",
      images: [
        {
          url: `https://www.weathertour.org/api/og?title=${encodeURIComponent(regionName)} 날씨`,
          width: 1200,
          height: 630,
          alt: `${regionName} 날씨 정보`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${regionName} 날씨 및 행사 정보`,
      description: `${regionName}의 실시간 날씨와 행사 정보를 확인하세요.`,
    },
    alternates: {
      canonical: `https://www.weathertour.org/${params.region}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  // 더 안전한 방식으로 지역 생성
  const regions = [
    'seoul', 'busan', 'daegu', 'incheon', 'gwangju', 
    'daejeon', 'ulsan', 'sejong', 'gyeonggi', 'chungbuk', 
    'chungnam', 'jeonbuk', 'jeonnam', 'gyeongbuk', 
    'gyeongnam', 'gangwon', 'jeju'
  ];
  
  return regions.map((region) => ({
    region,
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
