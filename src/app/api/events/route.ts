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

// 변환된 이벤트 데이터 타입 추가
interface TransformedEvent {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  imageUrl?: string;
  contentId: string;
  tel: string;
  homepage: string;
  category: string;
  cat1: string;
  cat2: string;
  cat3: string;
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

// 지역별 검색을 위한 지역 코드 매핑
function getRegionCode(region: string): string {
  const regionCodeMap: { [key: string]: string } = {
    'seoul': '1',      // 서울특별시
    'busan': '2',      // 부산광역시
    'daegu': '3',      // 대구광역시
    'incheon': '4',    // 인천광역시
    'gwangju': '5',    // 광주광역시
    'daejeon': '6',    // 대전광역시
    'ulsan': '7',      // 울산광역시
    'sejong': '8',     // 세종특별자치시
    'gyeonggi': '31',  // 경기도
    'chungbuk': '33',  // 충청북도
    'chungnam': '34',  // 충청남도
    'jeonbuk': '35',   // 전라북도
    'jeonnam': '36',   // 전라남도
    'gyeongbuk': '37', // 경상북도
    'gyeongnam': '38', // 경상남도
    'gangwon': '32',   // 강원도
    'jeju': '39'       // 제주특별자치도
  };
  
  return regionCodeMap[region] || '';
}

// 타입 가드 함수
function isApiResponse(data: unknown): data is ApiResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'response' in data &&
    typeof (data as any).response === 'object' &&
    (data as any).response !== null &&
    'body' in (data as any).response &&
    typeof ((data as any).response as any).body === 'object' &&
    ((data as any).response as any).body !== null &&
    'items' in (((data as any).response as any).body as any) &&
    typeof ((((data as any).response as any).body as any).items as any) === 'object' &&
    (((data as any).response as any).body as any).items !== null &&
    'item' in (((((data as any).response as any).body as any).items as any) as any)
  );
}

// 지역별 키워드 매칭 함수 개선
const getRegionKeywords = (region: string): string[] => {
  const regionMap: { [key: string]: string[] } = {
    'seoul': ['서울특별시', '서울'],
    'busan': ['부산광역시', '부산'],
    'daegu': ['대구광역시', '대구'],
    'incheon': ['인천광역시', '인천'],
    'gwangju': ['광주광역시', '광주'],
    'daejeon': ['대전광역시', '대전'],
    'ulsan': ['울산광역시', '울산'],
    'sejong': ['세종특별자치시', '세종'],
    'gyeonggi': ['경기도', '경기'],
    'chungbuk': ['충청북도', '충북'],
    'chungnam': ['충청남도', '충남'],
    'jeonbuk': ['전라북도', '전북'],
    'jeonnam': ['전라남도', '전남'],
    'gyeongbuk': ['경상북도', '경북'],
    'gyeongnam': ['경상남도', '경남'],
    'gangwon': ['강원도', '강원'],
    'jeju': ['제주특별자치도', '제주도', '제주']
  };
  
  return regionMap[region] || [region];
};

export async function GET(request: NextRequest, { params }: { params: any }, context?: { env: CloudflareEnv }) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');
    
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
    const allEvents: EventItem[] = [];
    
    // 항상 전체 데이터를 가져오고, region 파라미터는 클라이언트에서 사용
    const festivalUrl = `${baseUrl}/searchFestival2?serviceKey=${encodeURIComponent(apiKey)}&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=WeatherTravel&_type=json&arrange=C&eventStartDate=${eventStartDate}&eventEndDate=${eventEndDate}`;
    
    try {
      const festivalRes = await fetch(festivalUrl);
      if (festivalRes.ok) {
        const festivalData = await festivalRes.json();
        if (isApiResponse(festivalData) && festivalData.response?.body?.items?.item) {
          allEvents.push(...festivalData.response.body.items.item);
        }
      }
    } catch (error) {
      // 축제/행사 조회 실패 시 무시
    }
    
    // 중복 제거 및 데이터 변환
    const uniqueEvents = allEvents.filter((event, index, self) => 
      index === self.findIndex(e => e.contentid === event.contentid)
    );
    
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
    
    // 필터링 로직 개선
    const regionEvents = events.filter((event: TransformedEvent) => {
      if (region && region !== 'all') {
        const eventLocation = event.location?.toLowerCase() || '';
        const regionKeywords = getRegionKeywords(region);
        
        // 더 정확한 매칭: 전체 주소에서 지역명이 정확히 포함되어야 함
        const isMatch = regionKeywords.some(keyword => {
          const lowerKeyword = keyword.toLowerCase();
          
          // "대구광역시" → "대구광역시" (정확한 매칭)
          if (eventLocation.includes(lowerKeyword)) {
            return true;
          }
          
          // "대구" → "대구광역시" (축약형 매칭)
          if (lowerKeyword.length <= 4 && eventLocation.includes(lowerKeyword)) {
            return true;
          }
          
          return false;
        });
        
        return isMatch;
      }
      return true;
    });
    
    if (regionEvents.length > 0) {
      return Response.json({ 
        success: true, 
        events: regionEvents,
        requestedRegion: region // 클라이언트에서 사용할 수 있도록
      });
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
