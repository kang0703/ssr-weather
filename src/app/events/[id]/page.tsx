import { notFound } from 'next/navigation';
import EventDetail from '@/components/EventDetail';

interface EventDetailPageProps {
  params: {
    id: string;
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
