import { NextRequest, NextResponse } from 'next/server';

// API 응답 타입 정의
interface EventItem {
  title?: string;
  eventstartdate?: string;
  eventenddate?: string;
  addr1?: string;
  overview?: string;
  eventintro?: string;
  eventdesc?: string;
  eventcontent?: string;
  description?: string;
  firstimage?: string;
  firstimage2?: string;
  secondimage?: string;
  secondimage2?: string;
  thirdimage?: string;
  thirdimage2?: string;
  contentid?: string;
  tel?: string;
  homepage?: string;
  cat1?: string;
  cat2?: string;
  cat3?: string;
}

interface ApiResponse {
  response?: {
    body?: {
      items?: {
        item?: EventItem[];
      };
    };
  };
}

export async function GET(request: NextRequest, { params }: { params: any }, context?: { env: CloudflareEnv }) {
  try {
    const apiKey = context?.env?.PUBLIC_DATA_API_KEY || process.env.PUBLIC_DATA_API_KEY;
    if (!apiKey) {
      throw new Error('공공데이터 API 키가 설정되지 않았습니다.');
    }

    const baseUrl = 'https://apis.data.go.kr/B551011/KorService2';
    
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const eventStartDate = `${year}${month}01`;
    const eventEndDate = `${year}${month}${day}`;
    
    // A02 카테고리 (인문/문화/예술/역사)만 조회
    const allEvents = [];
    
    // 축제/행사 (searchFestival2) - A02 카테고리
    try {
      const festivalUrl = `${baseUrl}/searchFestival2?serviceKey=${encodeURIComponent(apiKey)}&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=WeatherTravel&_type=json&arrange=C&eventStartDate=${eventStartDate}&eventEndDate=${eventEndDate}`;
      const festivalRes = await fetch(festivalUrl);
      if (festivalRes.ok) {
        const festivalData = await festivalRes.json();
        if (festivalData.response?.body?.items?.item) {
          allEvents.push(...festivalData.response.body.items.item);
        }
      }
    } catch (error) {
      console.warn('축제/행사 조회 실패:', error);
    }
    
    // 중복 제거 및 데이터 변환
    const uniqueEvents = allEvents.filter((event, index, self) => 
      index === self.findIndex(e => e.contentid === event.contentid)
    );
    
    if (uniqueEvents.length > 0) {
      const events = uniqueEvents.map((item: EventItem) => {
        return {
          title: item.title || '제목 없음',
          startDate: item.eventstartdate || '',
          endDate: item.eventenddate || '',
          location: item.addr1 || '위치 정보 없음',
          description: item.overview || '설명 없음',
          imageUrl: item.firstimage || item.firstimage2,
          contentId: item.contentid || '',
          tel: item.tel || '',
          homepage: item.homepage || '',
          category: item.cat1 || '기타',
          cat1: item.cat1 || '',
          cat2: item.cat2 || '',
          cat3: item.cat3 || '',
        };
      });
      
      return Response.json({ success: true, events });
    }
    
    return Response.json({ success: true, events: [] });
  } catch (error) {
    console.error('행사 API 오류:', error);
    return Response.json(
      { success: false, error: '행사 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
