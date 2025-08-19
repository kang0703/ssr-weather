import { notFound } from 'next/navigation';
import EventDetail from '@/components/EventDetail';
import { Metadata } from 'next';

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  // 기본 메타데이터 (API 호출 없이 간단하게)
  return {
    title: `행사 상세 정보 - 갈래말래 날씨여행`,
    description: `행사 및 축제 상세 정보를 확인하세요. 날짜, 위치, 상세 내용을 제공합니다.`,
    keywords: `행사, 축제, 상세정보, 이벤트, 갈래말래`,
    openGraph: {
      title: "행사 상세 정보 - 갈래말래 날씨여행",
      description: "행사 및 축제 상세 정보를 확인하세요.",
      type: "article",
      locale: "ko_KR",
      url: `https://www.weathertour.org/events/${params.id}`,
    },
    alternates: {
      canonical: `https://www.weathertour.org/events/${params.id}`,
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = params;
  
  if (!id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <EventDetail eventId={id} />
      </div>
    </div>
  );
}
