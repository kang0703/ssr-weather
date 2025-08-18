import { NextRequest } from 'next/server';

// API 응답 타입 정의
interface EventItem {
  title?: string;
  eventstartdate?: string;
  eventenddate?: string;
  addr1?: string;
  overview?: string;
  firstimage?: string;
  firstimage2?: string;
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
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region') || 'seoul';

  console.log('Events API 호출됨:', { region });
  console.log('환경변수 확인:', { 
    hasEnv: !!context?.env, 
    hasApiKey: !!context?.env?.PUBLIC_DATA_API_KEY 
  });

  try {
    // 환경별로 API 키 가져오기
    const apiKey = context?.env?.PUBLIC_DATA_API_KEY || process.env.PUBLIC_DATA_API_KEY;
    if (!apiKey) {
      throw new Error('공공데이터 API 키가 설정되지 않았습니다.');
    }

    const baseUrl = 'https://apis.data.go.kr/B551011/KorService2';
    const areaCode = getAreaCode(region);
    
    // searchFestival1 → searchFestival2로 변경
    // 날짜 파라미터 추가
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const eventStartDate = `${year}${month}01`; // 이번 달 1일
    const eventEndDate = `${year}${month}${day}`; // 오늘
    
    const url = `${baseUrl}/searchFestival2?serviceKey=${encodeURIComponent(apiKey)}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=WeatherTravel&_type=json&arrange=C&eventStartDate=${eventStartDate}&eventEndDate=${eventEndDate}`;
    
    console.log('공공데이터 API 호출:', url);
    
    const response = await fetch(url);
    console.log('API 응답 상태:', response.status);
    
    if (!response.ok) {
      throw new Error(`API 응답 실패: ${response.status}`);
    }
    
    const data = await response.json() as ApiResponse;
    console.log('API 응답 데이터:', data);
    
    if (data.response?.body?.items?.item) {
      const events = data.response.body.items.item.map((item: EventItem) => ({
        title: item.title || '제목 없음',
        startDate: item.eventstartdate || '',
        endDate: item.eventenddate || '',
        location: item.addr1 || '위치 정보 없음',
        description: item.overview || '설명 없음',
        imageUrl: item.firstimage || item.firstimage2,
      }));
      
      console.log('변환된 행사 개수:', events.length);
      return Response.json(events);
    }
    
    return Response.json([]);
  } catch (error) {
    console.error('행사 API 오류:', error);
    return Response.json({ error: '행사 정보를 가져오는데 실패했습니다.' }, { status: 500 });
  }
}

function getAreaCode(region: string): string {
  const areaCodes: { [key: string]: string } = {
    'seoul': '1',
    'busan': '6',
    'daegu': '4',
    'incheon': '2',
    'gwangju': '5',
    'daejeon': '3',
    'ulsan': '7',
    'sejong': '8',
    'gyeonggi': '31',
    'chungbuk': '33',
    'chungnam': '34',
    'jeonnam': '38',
    'gyeongbuk': '35',
    'gyeongnam': '36',
    'gangwon': '32',
    'jeju': '39',
  };
  
  return areaCodes[region] || '1';
}
