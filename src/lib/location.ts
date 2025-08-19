export interface CityInfo {
  name: string;
  region: string;
  lat: number;
  lon: number;
}

export const KOREAN_CITIES: CityInfo[] = [
  { name: '서울특별시', region: 'seoul', lat: 37.5665, lon: 126.9780 },
  { name: '부산광역시', region: 'busan', lat: 35.1796, lon: 129.0756 },
  { name: '대구광역시', region: 'daegu', lat: 35.8714, lon: 128.6014 },
  { name: '인천광역시', region: 'incheon', lat: 37.4563, lon: 126.7052 },
  { name: '광주광역시', region: 'gwangju', lat: 35.1595, lon: 126.8526 },
  { name: '대전광역시', region: 'daejeon', lat: 36.3504, lon: 127.3845 },
  { name: '울산광역시', region: 'ulsan', lat: 35.5384, lon: 129.3114 },
  { name: '세종시', region: 'sejong', lat: 36.4800, lon: 127.2890 },
  { name: '경기도', region: 'gyeonggi', lat: 37.4138, lon: 127.5183 },
  { name: '충청북도', region: 'chungbuk', lat: 36.8000, lon: 127.7000 },
  { name: '충청남도', region: 'chungnam', lat: 36.6000, lon: 126.8000 },
  { name: '전라북도', region: 'jeonbuk', lat: 35.7175, lon: 127.1530 },
  { name: '전라남도', region: 'jeonnam', lat: 34.8679, lon: 126.9910 },
  { name: '경상북도', region: 'gyeongbuk', lat: 36.4919, lon: 128.8889 },
  { name: '경상남도', region: 'gyeongnam', lat: 35.4606, lon: 128.2132 },
  { name: '강원도', region: 'gangwon', lat: 37.8228, lon: 128.1555 },
  { name: '제주도', region: 'jeju', lat: 33.4996, lon: 126.5312 }
];

/**
 * 좌표를 기반으로 가장 가까운 한국 도시를 찾습니다.
 */
export function findNearestKoreanCity(lat: number, lon: number): CityInfo {
  let nearestCity = KOREAN_CITIES[0]; // 기본값: 서울
  let minDistance = Infinity;

  for (const city of KOREAN_CITIES) {
    const distance = calculateDistance(lat, lon, city.lat, city.lon);
    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = city;
    }
  }

  return nearestCity;
}

/**
 * 두 좌표 간의 거리를 계산합니다 (Haversine formula).
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // 지구의 반지름 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * 지역 코드를 한글 이름으로 변환합니다.
 */
export function getRegionName(region: string): string {
  const city = KOREAN_CITIES.find(c => c.region === region);
  return city ? city.name : '알 수 없는 지역';
}

/**
 * 지역 코드를 좌표로 변환합니다.
 */
export function getRegionCoordinates(region: string): { lat: number; lon: number } | null {
  const city = KOREAN_CITIES.find(c => c.region === region);
  return city ? { lat: city.lat, lon: city.lon } : null;
}
