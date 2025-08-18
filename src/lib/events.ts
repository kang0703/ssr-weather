export interface EventData {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export async function getEventsByRegion(region: string, env?: CloudflareEnv): Promise<EventData[]> {
  const apiKey = env?.PUBLIC_DATA_API_KEY || process.env.PUBLIC_DATA_API_KEY;
  const baseUrl = 'https://apis.data.go.kr/B551011/KorService2';
  
  try {
    // 공공데이터포털 API 호출
    const url = `${baseUrl}/searchFestival1?serviceKey=${apiKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=WeatherTravel&_type=json&listYN=Y&arrange=A&areaCode=${getAreaCode(region)}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('행사 정보를 가져오는데 실패했습니다.');
    }
    
    const data = await response.json();
    
    if (data.response?.body?.items?.item) {
      return data.response.body.items.item.map((item: any) => ({
        title: item.title || '제목 없음',
        startDate: item.eventstartdate || '',
        endDate: item.eventenddate || '',
        location: item.addr1 || '위치 정보 없음',
        description: item.overview || '설명 없음',
        imageUrl: item.firstimage || item.firstimage2,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('행사 API 오류:', error);
    return [];
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