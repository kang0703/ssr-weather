export interface EventData {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  imageUrl?: string;
  contentId?: string;
  tel?: string;
  homepage?: string;
  overview?: string;
  images?: string[];
  category?: string;
  sponsor?: string;
  fee?: string;
  age?: string;
  parking?: string;
  publicTransport?: string;
  
  // 반복정보에서 추가 (새로 추가)
  operatingHours?: string; // 운영시간
  closedDays?: string; // 휴무일
  reservationInfo?: string; // 예약정보
  creditCardInfo?: string; // 결제방법
  petInfo?: string; // 반려동물 동반
  babyCarriageInfo?: string; // 유모차
  wheelchairInfo?: string; // 휠체어
  smokingInfo?: string; // 흡연
  wifiInfo?: string; // 와이파이
  parkingFee?: string; // 주차요금
  
  // 기본 정보에서 추가 (새로 추가)
  zipCode?: string;
  mapX?: string;
  mapY?: string;
  areaCode?: string;
  sigunguCode?: string;
  
  // 새로 추가할 필드들
  cat1?: string; // 대분류
  cat2?: string; // 중분류
  cat3?: string; // 소분류
  createdTime?: string; // 등록일시
  modifiedTime?: string; // 수정일시
  
  // 접근성 정보 (새로 추가)
  elevatorInfo?: string; // 엘리베이터
  parkingInfo?: string; // 주차 상세정보
  restroomInfo?: string; // 화장실 정보
  nursingRoomInfo?: string; // 수유실 정보
  lockerInfo?: string; // 보관함 정보
  atmInfo?: string; // ATM 정보
  convenienceStoreInfo?: string; // 편의점 정보
  
  // 이용 정보 (새로 추가)
  reservationUrl?: string; // 예약 URL
  reservationPhone?: string; // 예약 전화번호
  maxCapacity?: string; // 최대 수용인원
  minAge?: string; // 최소 연령
  maxAge?: string; // 최대 연령
  dressCode?: string; // 복장 규정
  prohibitedItems?: string; // 금지물품
  
  // 계절/날씨 정보 (새로 추가)
  bestSeason?: string; // 최적 계절
  weatherInfo?: string; // 날씨 정보
  indoorOutdoor?: string; // 실내/실외 구분
  
  // 교통 정보 (새로 추가)
  nearestStation?: string; // 가장 가까운 역
  busRoutes?: string; // 버스 노선
  taxiInfo?: string; // 택시 정보
  carRoute?: string; // 자동차 경로
  
  // 비용 정보 (새로 추가)
  adultFee?: string; // 성인 요금
  childFee?: string; // 어린이 요금
  groupDiscount?: string; // 단체 할인
  freeDay?: string; // 무료일
  
  // 운영 정보 (새로 추가)
  lastEntry?: string; // 마지막 입장 시간
  peakHours?: string; // 혼잡 시간
  quietHours?: string; // 한적한 시간
  specialEvents?: string; // 특별 이벤트
  
  // 연락처 추가 정보 (새로 추가)
  emergencyPhone?: string; // 비상연락처
  managerPhone?: string; // 담당자 연락처
  email?: string; // 이메일
  
  // 소셜미디어 (새로 추가)
  instagram?: string; // 인스타그램
  facebook?: string; // 페이스북
  youtube?: string; // 유튜브
  blog?: string; // 블로그
}

// 개별 행사 상세정보 조회 함수 수정
export async function getEventDetail(
  contentId: string,
  apiKey: string
): Promise<EventData | null> {
  if (!apiKey) {
    throw new Error('공공데이터 API 키가 설정되지 않았습니다.');
  }
  
  const baseUrl = 'https://apis.data.go.kr/B551011/KorService2';
  
  try {
    console.log('상세정보 조회 시작:', contentId);
    
    // 1. 기본 상세정보 조회 - detailCommon1 (원래대로 복원)
    const detailUrl = `${baseUrl}/detailCommon1?serviceKey=${encodeURIComponent(apiKey)}&contentId=${contentId}&MobileOS=ETC&MobileApp=WeatherTravel&_type=json&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`;
    
    console.log('상세정보 API URL:', detailUrl);
    
    const detailRes = await fetch(detailUrl);
    console.log('상세정보 API 응답 상태:', detailRes.status);
    
    if (!detailRes.ok) {
      const errorText = await detailRes.text();
      console.error('상세정보 API 응답 실패:', detailRes.status, errorText);
      
      // API 키 문제인지 확인
      if (errorText.includes('Policy Falsified') || errorText.includes('Service Not Found')) {
        throw new Error('API 키가 잘못되었거나 만료되었습니다. 공공데이터포털에서 API 키를 확인해주세요.');
      }
      
      throw new Error(`상세정보 조회에 실패했습니다. (${detailRes.status})`);
    }
    
    const detailData = await detailRes.json();
    console.log('기본 상세정보 응답:', detailData);
    
    const detailItem = (detailData as any).response?.body?.items?.item?.[0];
    if (!detailItem) {
      console.log('상세정보 아이템이 없습니다. 응답:', detailData);
      return null;
    }
    
    // contentTypeId 추출
    const contentTypeId = detailItem.contenttypeid;
    console.log('contentTypeId:', contentTypeId);
    
    // 2. 소개정보 조회 - detailIntro1 (원래대로 복원)
    let introItem = null;
    if (contentTypeId) {
      const introUrl = `${baseUrl}/detailIntro1?serviceKey=${encodeURIComponent(apiKey)}&contentId=${contentId}&MobileOS=ETC&MobileApp=WeatherTravel&_type=json&contentTypeId=${contentTypeId}`;
      
      try {
        const introRes = await fetch(introUrl);
        if (introRes.ok) {
          const introData = await introRes.json();
          console.log('소개정보 응답:', introData);
          introItem = (introData as any).response?.body?.items?.item?.[0];
        } else {
          console.warn('소개정보 API 응답 실패:', introRes.status);
        }
      } catch (introError) {
        console.warn('소개정보 조회 실패:', introError);
      }
    }
    
    // 3. 반복정보 조회 - detailInfo1 (원래대로 복원)
    let infoItem = null;
    if (contentTypeId) {
      const infoUrl = `${baseUrl}/detailInfo1?serviceKey=${encodeURIComponent(apiKey)}&contentId=${contentId}&MobileOS=ETC&MobileApp=WeatherTravel&_type=json&contentTypeId=${contentTypeId}`;
      
      try {
        const infoRes = await fetch(infoUrl);
        if (infoRes.ok) {
          const infoData = await infoRes.json();
          console.log('반복정보 응답:', infoData);
          infoItem = (infoData as any).response?.body?.items?.item?.[0];
        } else {
          console.warn('반복정보 API 응답 실패:', infoRes.status);
        }
      } catch (infoError) {
        console.warn('반복정보 조회 실패:', infoError);
      }
    }
    
    // 4. 이미지 정보 조회 - detailImage1 (원래대로 복원)
    let imageItems = [];
    const imageUrl = `${baseUrl}/detailImage1?serviceKey=${encodeURIComponent(apiKey)}&contentId=${contentId}&MobileOS=ETC&MobileApp=WeatherTravel&_type=json&imageYN=Y&subImageYN=Y`;
    
    try {
      const imageRes = await fetch(imageUrl);
      if (imageRes.ok) {
        const imageData = await imageRes.json();
        console.log('이미지 정보 응답:', imageData);
        imageItems = (imageData as any).response?.body?.items?.item || [];
      } else {
        console.warn('이미지 정보 API 응답 실패:', imageRes.status);
      }
    } catch (imageError) {
      console.warn('이미지 정보 조회 실패:', imageError);
    }
    
    // 결과 데이터 구성 (기존과 동일)
    const result = {
      title: detailItem.title || '제목 없음',
      startDate: detailItem.eventstartdate || '',
      endDate: detailItem.eventenddate || '',
      location: detailItem.addr1 || '위치 정보 없음',
      description: detailItem.overview || '설명 없음',
      imageUrl: detailItem.firstimage || detailItem.firstimage2,
      contentId: detailItem.contentid,
      tel: detailItem.tel || '',
      homepage: detailItem.homepage || '',
      category: detailItem.cat1 || '축제/행사',
      
      // 카테고리 상세 정보
      cat1: detailItem.cat1 || '',
      cat2: detailItem.cat2 || '',
      cat3: detailItem.cat3 || '',
      
      // 소개정보에서 추가 정보
      sponsor: introItem?.sponsor1 || introItem?.sponsor2 || introItem?.sponsor || '',
      fee: introItem?.usefee || introItem?.usefeeinfo || '',
      age: introItem?.agelimit || introItem?.age || '',
      parking: introItem?.parking || introItem?.parkinginfo || '',
      publicTransport: introItem?.publictraffic || introItem?.publictrafficinfo || '',
      
      // 반복정보에서 추가 정보
      operatingHours: infoItem?.usetime || '',
      closedDays: infoItem?.restdate || '',
      reservationInfo: infoItem?.reservation || '',
      creditCardInfo: infoItem?.creditcard || '',
      petInfo: infoItem?.pet || '',
      babyCarriageInfo: infoItem?.babycarriage || '',
      wheelchairInfo: infoItem?.wheelchair || '',
      smokingInfo: infoItem?.smoking || '',
      wifiInfo: infoItem?.wifi || '',
      parkingFee: infoItem?.parkingfee || '',
      
      // 기본 정보에서 추가 정보
      zipCode: detailItem.zipcode || '',
      mapX: detailItem.mapx || '',
      mapY: detailItem.mapy || '',
      areaCode: detailItem.areacode || '',
      sigunguCode: detailItem.sigungucode || '',
      
      // 이미지 정보
      images: imageItems.map((img: any) => img.originimgurl || img.smallimageurl).filter(Boolean),
    };
    
    console.log('최종 결과:', result);
    return result;
    
  } catch (error) {
    console.error('행사 상세정보 API 오류:', error);
    throw error;
  }
}

// 전국 행사 정보를 가져오는 함수 개선
export async function getAllEvents(apiKey: string): Promise<EventData[]> {
  if (!apiKey) {
    throw new Error('공공데이터 API 키가 설정되지 않았습니다.');
  }
  
  const baseUrl = 'https://apis.data.go.kr/B551011/KorService2';
  
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const eventStartDate = `${year}${month}01`;
    const eventEndDate = `${year}${month}${day}`;
    
    // 전국 행사 정보 조회 (지역 코드 없이)
    const url = `${baseUrl}/searchFestival2?serviceKey=${encodeURIComponent(apiKey)}&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=WeatherTravel&_type=json&arrange=C&eventStartDate=${eventStartDate}&eventEndDate=${eventEndDate}`;
    
    console.log('API 요청 URL:', url);
    
    const response = await fetch(url);
    console.log('API 응답 상태:', response.status);
    console.log('API 응답 헤더:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      throw new Error(`API 응답 실패: ${response.status} ${response.statusText}`);
    }
    
    // 응답 텍스트를 먼저 확인
    const responseText = await response.text();
    console.log('API 응답 텍스트 (처음 500자):', responseText.substring(0, 500));
    
    // JSON 파싱 시도
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON 파싱 실패:', parseError);
      console.error('응답이 JSON이 아닙니다. 응답 내용:', responseText);
      throw new Error('API 응답이 유효한 JSON 형식이 아닙니다. API 키나 요청 형식을 확인해주세요.');
    }
    
    if (data.response?.body?.items?.item) {
      const events = data.response.body.items.item.map((item: any) => ({
        title: item.title || '제목 없음',
        startDate: item.eventstartdate || '',
        endDate: item.eventenddate || '',
        location: item.addr1 || '위치 정보 없음',
        description: item.overview || '설명 없음',
        imageUrl: item.firstimage || item.firstimage2,
        contentId: item.contentid,
        tel: item.tel || '',
        homepage: item.homepage || '',
        category: item.cat1 || '축제/행사',
        areaCode: item.areacode || '',
        sigunguCode: item.sigungucode || '',
      }));
      
      console.log('파싱된 행사 개수:', events.length);
      return events;
    }
    
    console.log('API 응답에 행사 데이터가 없습니다:', data);
    return [];
  } catch (error) {
    console.error('전국 행사 API 오류:', error);
    throw error; // 에러를 다시 던져서 상위에서 처리할 수 있도록
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

// 카테고리 코드를 이름으로 변환하는 함수 개선
function getCategoryName(catCode: string): string {
  const categoryMap: { [key: string]: string } = {
    // 대분류
    'A01': '자연',
    'A02': '인문(문화/예술/역사)',
    'A03': '레포츠',
    'A04': '쇼핑',
    'A05': '음식',
    'A06': '숙박',
    'A07': '교통',
    'A08': '의료',
    'A09': '기타',
    
    // 중분류 (자연)
    'A0101': '자연관광지',
    'A0102': '관광자원',
    
    // 중분류 (인문)
    'A0201': '역사관광지',
    'A0202': '문화시설',
    'A0203': '축제/공연/행사',
    'A0204': '산업관광지',
    'A0205': '건축/조형물',
    'A0206': '문화유산',
    
    // 중분류 (레포츠)
    'A0301': '레포츠시설',
    'A0302': '레포츠활동',
    
    // 중분류 (쇼핑)
    'A0401': '쇼핑시설',
    'A0402': '전통시장',
    
    // 중분류 (음식)
    'A0501': '음식점',
    'A0502': '카페',
    
    // 중분류 (숙박)
    'A0601': '숙박시설',
    
    // 소분류 (자연관광지)
    'A01010100': '국립공원',
    'A01010200': '도립공원',
    'A01010300': '군립공원',
    'A01010400': '산',
    'A01010500': '자연생태관광지',
    'A01010600': '자연휴양림',
    'A01010700': '수목원',
    'A01010800': '폭포',
    'A01010900': '계곡',
    'A01011000': '약수터',
    'A01011100': '해안절경',
    'A01011200': '해수욕장',
    'A01011300': '섬',
    'A01011400': '항구/포구',
    'A01011500': '어촌',
    'A01011600': '등대',
    'A01011700': '호수',
    'A01011800': '강',
    'A01011900': '동굴',
    'A01012000': '유원지',
    'A01012100': '관광단지',
    'A01012200': '온천/욕장/스파',
    'A01012300': '이색찜질방',
    'A01012400': '게스트하우스',
    'A01012500': '펜션',
    'A01012600': '민박',
    'A01012700': '기타숙박',
    
    // 소분류 (문화시설)
    'A02020100': '박물관/전시관',
    'A02020200': '미술관/갤러리',
    'A02020300': '공연장',
    'A02020400': '전통공연',
    'A02020500': '문화원',
    'A02020600': '도서관',
    'A02020700': '대형서점',
    'A02020800': '문화전수시설',
    'A02020900': '영화관',
    'A02021000': '어학당',
    'A02021100': '학교',
    
    // 소분류 (축제/공연/행사)
    'A02030100': '문화관광축제',
    'A02030200': '일반축제',
    'A02030300': '전통공연',
    'A02030400': '연극',
    'A02030500': '뮤지컬',
    'A02030600': '오페라',
    'A02030700': '전시/미술',
    'A02030800': '박람회/전시회',
    'A02030900': '컨퍼런스',
    'A02031000': '무용',
    'A02031100': '클래식음악회',
    'A02031200': '대중콘서트',
    'A02031300': '영화',
    'A02031400': '스포츠경기',
    'A02031500': '기타행사',
  };
  
  return categoryMap[catCode] || catCode;
}