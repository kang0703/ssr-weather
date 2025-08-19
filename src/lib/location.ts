export interface CityInfo {
  name: string;
  region: string;
  lat: number;
  lon: number;
}

export const KOREAN_CITIES: CityInfo[] = [
  // 광역시 및 특별시
  { name: '서울특별시', region: 'seoul', lat: 37.5665, lon: 126.9780 },
  { name: '부산광역시', region: 'busan', lat: 35.1796, lon: 129.0756 },
  { name: '대구광역시', region: 'daegu', lat: 35.8714, lon: 128.6014 },
  { name: '인천광역시', region: 'incheon', lat: 37.4563, lon: 126.7052 },
  { name: '광주광역시', region: 'gwangju', lat: 35.1595, lon: 126.8526 },
  { name: '대전광역시', region: 'daejeon', lat: 36.3504, lon: 127.3845 },
  { name: '울산광역시', region: 'ulsan', lat: 35.5384, lon: 129.3114 },
  { name: '세종시', region: 'sejong', lat: 36.4800, lon: 127.2890 },
  
  // 경기도 주요 도시들
  { name: '수원시', region: 'gyeonggi', lat: 37.2636, lon: 127.0286 },
  { name: '고양시', region: 'gyeonggi', lat: 37.6584, lon: 126.8320 },
  { name: '성남시', region: 'gyeonggi', lat: 37.4449, lon: 127.1389 },
  { name: '용인시', region: 'gyeonggi', lat: 37.2411, lon: 127.1776 },
  { name: '부천시', region: 'gyeonggi', lat: 37.5035, lon: 126.7660 },
  { name: '안산시', region: 'gyeonggi', lat: 37.3219, lon: 126.8309 },
  { name: '안양시', region: 'gyeonggi', lat: 37.3943, lon: 126.9568 },
  { name: '평택시', region: 'gyeonggi', lat: 36.9920, lon: 127.1128 },
  { name: '시흥시', region: 'gyeonggi', lat: 37.3799, lon: 126.8031 },
  { name: '김포시', region: 'gyeonggi', lat: 37.6153, lon: 126.7155 },
  { name: '광명시', region: 'gyeonggi', lat: 37.4792, lon: 126.8649 },
  { name: '군포시', region: 'gyeonggi', lat: 37.3616, lon: 126.9352 },
  { name: '오산시', region: 'gyeonggi', lat: 37.1498, lon: 127.0772 },
  { name: '하남시', region: 'gyeonggi', lat: 37.5392, lon: 127.2148 },
  { name: '이천시', region: 'gyeonggi', lat: 37.2720, lon: 127.4350 },
  { name: '안성시', region: 'gyeonggi', lat: 37.0080, lon: 127.2797 },
  { name: '의왕시', region: 'gyeonggi', lat: 37.3449, lon: 126.9482 },
  { name: '양평군', region: 'gyeonggi', lat: 37.4912, lon: 127.4875 },
  { name: '여주시', region: 'gyeonggi', lat: 37.2984, lon: 127.6370 },
  { name: '과천시', region: 'gyeonggi', lat: 37.4291, lon: 126.9879 },
  { name: '남양주시', region: 'gyeonggi', lat: 37.6364, lon: 127.2160 },
  { name: '파주시', region: 'gyeonggi', lat: 37.8154, lon: 126.7947 },
  { name: '양주시', region: 'gyeonggi', lat: 37.8324, lon: 127.0462 },
  { name: '구리시', region: 'gyeonggi', lat: 37.5943, lon: 127.1296 },
  { name: '포천시', region: 'gyeonggi', lat: 37.8949, lon: 127.2002 },
  { name: '동두천시', region: 'gyeonggi', lat: 37.9036, lon: 127.0606 },
  { name: '가평군', region: 'gyeonggi', lat: 37.8315, lon: 127.5105 },
  { name: '연천군', region: 'gyeonggi', lat: 38.0966, lon: 127.0747 },
  
  // 충청북도 주요 도시들
  { name: '청주시', region: 'chungbuk', lat: 36.6424, lon: 127.4890 },
  { name: '충주시', region: 'chungbuk', lat: 36.9910, lon: 127.9260 },
  { name: '제천시', region: 'chungbuk', lat: 37.1326, lon: 128.1910 },
  { name: '보은군', region: 'chungbuk', lat: 36.4894, lon: 127.7290 },
  { name: '옥천군', region: 'chungbuk', lat: 36.3064, lon: 127.5710 },
  { name: '영동군', region: 'chungbuk', lat: 36.1750, lon: 127.7760 },
  { name: '증평군', region: 'chungbuk', lat: 36.7850, lon: 127.5810 },
  { name: '진천군', region: 'chungbuk', lat: 36.8550, lon: 127.4350 },
  { name: '괴산군', region: 'chungbuk', lat: 36.8150, lon: 127.7910 },
  { name: '음성군', region: 'chungbuk', lat: 36.9350, lon: 127.6900 },
  { name: '단양군', region: 'chungbuk', lat: 36.9850, lon: 128.3650 },
  
  // 충청남도 주요 도시들
  { name: '천안시', region: 'chungnam', lat: 36.8150, lon: 127.1139 },
  { name: '공주시', region: 'chungnam', lat: 36.4464, lon: 127.1190 },
  { name: '보령시', region: 'chungnam', lat: 36.3334, lon: 126.6129 },
  { name: '아산시', region: 'chungnam', lat: 36.7890, lon: 127.0019 },
  { name: '서산시', region: 'chungnam', lat: 36.7840, lon: 126.4500 },
  { name: '논산시', region: 'chungnam', lat: 36.1870, lon: 127.0990 },
  { name: '계룡시', region: 'chungnam', lat: 36.2740, lon: 127.2490 },
  { name: '당진시', region: 'chungnam', lat: 36.8930, lon: 126.6280 },
  { name: '금산군', region: 'chungnam', lat: 36.1080, lon: 127.4880 },
  { name: '부여군', region: 'chungnam', lat: 36.2750, lon: 126.9090 },
  { name: '서천군', region: 'chungnam', lat: 36.0800, lon: 126.6910 },
  { name: '청양군', region: 'chungnam', lat: 36.4530, lon: 126.8020 },
  { name: '홍성군', region: 'chungnam', lat: 36.6010, lon: 126.6610 },
  { name: '예산군', region: 'chungnam', lat: 36.6810, lon: 126.8450 },
  { name: '태안군', region: 'chungnam', lat: 36.7450, lon: 126.2980 },
  
  // 전라북도 주요 도시들
  { name: '전주시', region: 'jeonbuk', lat: 35.8242, lon: 127.1480 },
  { name: '군산시', region: 'jeonbuk', lat: 35.9670, lon: 126.7360 },
  { name: '익산시', region: 'jeonbuk', lat: 35.9480, lon: 126.9570 },
  { name: '정읍시', region: 'jeonbuk', lat: 35.5690, lon: 126.8560 },
  { name: '남원시', region: 'jeonbuk', lat: 35.4160, lon: 127.3900 },
  { name: '김제시', region: 'jeonbuk', lat: 35.8030, lon: 126.8810 },
  { name: '완주군', region: 'jeonbuk', lat: 35.9040, lon: 127.1620 },
  { name: '진안군', region: 'jeonbuk', lat: 35.7910, lon: 127.4250 },
  { name: '무주군', region: 'jeonbuk', lat: 35.9310, lon: 127.6610 },
  { name: '장수군', region: 'jeonbuk', lat: 35.6470, lon: 127.5210 },
  { name: '임실군', region: 'jeonbuk', lat: 35.6170, lon: 127.2860 },
  { name: '순창군', region: 'jeonbuk', lat: 35.3740, lon: 127.1370 },
  { name: '고창군', region: 'jeonbuk', lat: 35.4350, lon: 126.7020 },
  { name: '부안군', region: 'jeonbuk', lat: 35.7310, lon: 126.7320 },
  
  // 전라남도 주요 도시들
  { name: '목포시', region: 'jeonnam', lat: 34.8110, lon: 126.3920 },
  { name: '여수시', region: 'jeonnam', lat: 34.7600, lon: 127.6620 },
  { name: '순천시', region: 'jeonnam', lat: 34.9500, lon: 127.4870 },
  { name: '나주시', region: 'jeonnam', lat: 35.0160, lon: 126.7100 },
  { name: '광양시', region: 'jeonnam', lat: 34.9400, lon: 127.6950 },
  { name: '담양군', region: 'jeonnam', lat: 35.3210, lon: 126.9850 },
  { name: '곡성군', region: 'jeonnam', lat: 35.2820, lon: 127.2970 },
  { name: '구례군', region: 'jeonnam', lat: 35.2020, lon: 127.4630 },
  { name: '고흥군', region: 'jeonnam', lat: 34.6120, lon: 127.2850 },
  { name: '보성군', region: 'jeonnam', lat: 34.7320, lon: 127.0810 },
  { name: '화순군', region: 'jeonnam', lat: 35.0590, lon: 126.9860 },
  { name: '장흥군', region: 'jeonnam', lat: 34.6810, lon: 126.9070 },
  { name: '강진군', region: 'jeonnam', lat: 34.6420, lon: 126.7670 },
  { name: '해남군', region: 'jeonnam', lat: 34.5730, lon: 126.5980 },
  { name: '영암군', region: 'jeonnam', lat: 34.8000, lon: 126.6960 },
  { name: '무안군', region: 'jeonnam', lat: 34.9900, lon: 126.4810 },
  { name: '함평군', region: 'jeonnam', lat: 35.0650, lon: 126.5190 },
  { name: '영광군', region: 'jeonnam', lat: 35.2770, lon: 126.5120 },
  { name: '장성군', region: 'jeonnam', lat: 35.3020, lon: 126.7850 },
  { name: '완도군', region: 'jeonnam', lat: 34.3110, lon: 126.7550 },
  { name: '진도군', region: 'jeonnam', lat: 34.4860, lon: 126.2630 },
  { name: '신안군', region: 'jeonnam', lat: 34.7900, lon: 126.3780 },
  
  // 경상북도 주요 도시들
  { name: '포항시', region: 'gyeongbuk', lat: 36.0320, lon: 129.3650 },
  { name: '경주시', region: 'gyeongbuk', lat: 35.8560, lon: 129.2250 },
  { name: '김천시', region: 'gyeongbuk', lat: 36.1390, lon: 128.1130 },
  { name: '안동시', region: 'gyeongbuk', lat: 36.5680, lon: 128.7290 },
  { name: '구미시', region: 'gyeongbuk', lat: 36.1190, lon: 128.3440 },
  { name: '영주시', region: 'gyeongbuk', lat: 36.8060, lon: 128.6240 },
  { name: '영천시', region: 'gyeongbuk', lat: 35.9730, lon: 128.9380 },
  { name: '상주시', region: 'gyeongbuk', lat: 36.4150, lon: 128.1600 },
  { name: '문경시', region: 'gyeongbuk', lat: 36.5860, lon: 128.1860 },
  { name: '경산시', region: 'gyeongbuk', lat: 35.8250, lon: 128.7410 },
  { name: '군위군', region: 'gyeongbuk', lat: 36.2420, lon: 128.5720 },
  { name: '의성군', region: 'gyeongbuk', lat: 36.3520, lon: 128.6970 },
  { name: '청송군', region: 'gyeongbuk', lat: 36.4360, lon: 129.0570 },
  { name: '영양군', region: 'gyeongbuk', lat: 36.6660, lon: 129.1120 },
  { name: '영덕군', region: 'gyeongbuk', lat: 36.4150, lon: 129.3650 },
  { name: '청도군', region: 'gyeongbuk', lat: 35.6470, lon: 128.7430 },
  { name: '고령군', region: 'gyeongbuk', lat: 35.7260, lon: 128.2620 },
  { name: '성주군', region: 'gyeongbuk', lat: 35.9180, lon: 128.2880 },
  { name: '칠곡군', region: 'gyeongbuk', lat: 35.9950, lon: 128.4010 },
  { name: '예천군', region: 'gyeongbuk', lat: 36.6580, lon: 128.4560 },
  { name: '봉화군', region: 'gyeongbuk', lat: 36.8930, lon: 128.7320 },
  { name: '울진군', region: 'gyeongbuk', lat: 36.9930, lon: 129.4000 },
  { name: '울릉군', region: 'gyeongbuk', lat: 37.4840, lon: 130.9030 },
  
  // 경상남도 주요 도시들
  { name: '창원시', region: 'gyeongnam', lat: 35.2270, lon: 128.6810 },
  { name: '진주시', region: 'gyeongnam', lat: 35.1800, lon: 128.1080 },
  { name: '통영시', region: 'gyeongnam', lat: 34.8540, lon: 128.4330 },
  { name: '사천시', region: 'gyeongnam', lat: 35.0030, lon: 128.0640 },
  { name: '김해시', region: 'gyeongnam', lat: 35.2280, lon: 128.8890 },
  { name: '밀양시', region: 'gyeongnam', lat: 35.5030, lon: 128.7460 },
  { name: '거제시', region: 'gyeongnam', lat: 34.8800, lon: 128.6210 },
  { name: '양산시', region: 'gyeongnam', lat: 35.3380, lon: 129.0340 },
  { name: '의령군', region: 'gyeongnam', lat: 35.3220, lon: 128.2620 },
  { name: '함안군', region: 'gyeongnam', lat: 35.2720, lon: 128.4060 },
  { name: '창녕군', region: 'gyeongnam', lat: 35.5440, lon: 128.4920 },
  { name: '고성군', region: 'gyeongnam', lat: 34.9730, lon: 128.3240 },
  { name: '남해군', region: 'gyeongnam', lat: 34.8370, lon: 127.8920 },
  { name: '하동군', region: 'gyeongnam', lat: 35.0670, lon: 127.7510 },
  { name: '산청군', region: 'gyeongnam', lat: 35.4150, lon: 127.8730 },
  { name: '함양군', region: 'gyeongnam', lat: 35.5200, lon: 127.7270 },
  { name: '거창군', region: 'gyeongnam', lat: 35.6870, lon: 127.9020 },
  { name: '합천군', region: 'gyeongnam', lat: 35.5660, lon: 128.1650 },
  
  // 강원도 주요 도시들
  { name: '춘천시', region: 'gangwon', lat: 37.8813, lon: 127.7300 },
  { name: '원주시', region: 'gangwon', lat: 37.3422, lon: 127.9200 },
  { name: '강릉시', region: 'gangwon', lat: 37.7519, lon: 128.8760 },
  { name: '동해시', region: 'gangwon', lat: 37.5230, lon: 129.1140 },
  { name: '태백시', region: 'gangwon', lat: 37.1640, lon: 128.9860 },
  { name: '속초시', region: 'gangwon', lat: 38.2070, lon: 128.5920 },
  { name: '삼척시', region: 'gangwon', lat: 37.4500, lon: 129.1650 },
  { name: '홍천군', region: 'gangwon', lat: 37.6970, lon: 127.8880 },
  { name: '횡성군', region: 'gangwon', lat: 37.4910, lon: 127.9850 },
  { name: '영월군', region: 'gangwon', lat: 37.1840, lon: 128.4610 },
  { name: '평창군', region: 'gangwon', lat: 37.3700, lon: 128.3900 },
  { name: '정선군', region: 'gangwon', lat: 37.3800, lon: 128.6610 },
  { name: '철원군', region: 'gangwon', lat: 38.1460, lon: 127.3130 },
  { name: '화천군', region: 'gangwon', lat: 38.1060, lon: 127.7080 },
  { name: '양구군', region: 'gangwon', lat: 38.1070, lon: 127.9890 },
  { name: '인제군', region: 'gangwon', lat: 38.0690, lon: 128.1700 },
  { name: '고성군', region: 'gangwon', lat: 38.3780, lon: 128.4670 },
  { name: '양양군', region: 'gangwon', lat: 38.0750, lon: 128.6190 },
  
  // 제주도
  { name: '제주시', region: 'jeju', lat: 33.4996, lon: 126.5312 },
  { name: '서귀포시', region: 'jeju', lat: 33.2541, lon: 126.5600 }
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
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
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
