import { NextRequest } from 'next/server';
import { getCurrentWeather, getWeatherForecast } from '@/lib/weather';

export async function GET(request: NextRequest, { params }: { params: any }, context?: { env: CloudflareEnv }) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const type = searchParams.get('type');

  if (!lat || !lon) {
    return Response.json({ error: '위도와 경도가 필요합니다.' }, { status: 400 });
  }

  try {
    if (type === 'forecast') {
      const forecast = await getWeatherForecast(parseFloat(lat), parseFloat(lon), context?.env);
      return Response.json(forecast);
    } else {
      const weather = await getCurrentWeather(parseFloat(lat), parseFloat(lon), context?.env);
      return Response.json(weather);
    }
  } catch (error) {
    return Response.json({ error: '날씨 정보를 가져오는데 실패했습니다.' }, { status: 500 });
  }
}
