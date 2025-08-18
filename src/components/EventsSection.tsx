'use client';

import { useState, useEffect } from 'react';
import { getEventsByRegion, EventData } from '@/lib/events';

export default function EventsSection() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        // 기본적으로 서울 지역 행사 정보 가져오기
        const eventsData = await getEventsByRegion('seoul');
        setEvents(eventsData);
        setError(null);
      } catch (err) {
        console.error('행사 데이터 가져오기 실패:', err);
        setError('행사 정보를 가져오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">주요 행사/축제</h2>
      
      {events.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>현재 진행 중인 행사가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.slice(0, 5).map((event, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {event.title}
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>📅 {event.startDate} ~ {event.endDate}</p>
                <p>�� {event.location}</p>
                {event.description && (
                  <p className="text-gray-500 line-clamp-2">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          더 많은 행사 보기 →
        </button>
      </div>
    </div>
  );
}