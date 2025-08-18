import { NextRequest } from 'next/server';
import { getEventsByRegion } from '@/lib/events';

export async function GET(request: NextRequest, { params }: { params: any }, { env }: { env: CloudflareEnv }) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region');

  if (!region) {
    return Response.json({ error: '지역 정보가 필요합니다.' }, { status: 400 });
  }

  try {
    const events = await getEventsByRegion(region, env);
    return Response.json(events);
  } catch (error) {
    console.error('행사 API 오류:', error);
    return Response.json({ error: '행사 정보를 가져오는데 실패했습니다.' }, { status: 500 });
  }
}
