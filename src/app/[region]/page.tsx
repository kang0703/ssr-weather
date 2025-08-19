import { notFound } from 'next/navigation';
import { KOREAN_CITIES, getRegionName } from '@/lib/location';
import RegionWeather from '@/components/RegionWeather';

interface RegionPageProps {
  params: {
    region: string;
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
