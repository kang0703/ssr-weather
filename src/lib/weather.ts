export interface WeatherData {
  location: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
}

export interface ForecastData {
  date: string;
  temp_min: number;
  temp_max: number;
  description: string;
  icon: string;
}

// 날씨 설명을 한국어로 변환하는 함수 추가
function translateWeatherDescription(description: string): string {
  const weatherMap: { [key: string]: string } = {
    // 맑음
    '맑음': '맑음',
    'clear sky': '맑음',
    
    // 흐림
    '흐림': '흐림',
    '튼 구름': '흐림',
    '튼구름': '흐림',  // 공백 없는 버전 추가
    '온흐림': '흐림',
    'broken clouds': '흐림',
    'scattered clouds': '구름 많음',
    'few clouds': '구름 조금',
    '약간의 구름이 낀 하늘': '구름 조금',  // 이 값도 추가
    
    // 비
    '비': '비',
    '가벼운 비': '가벼운 비',
    '보통 비': '보통 비',
    '강한 비': '강한 비',
    'light rain': '가벼운 비',
    'moderate rain': '보통 비',
    'heavy rain': '강한 비',
    
    // 눈
    '눈': '눈',
    '가벼운 눈': '가벼운 눈',
    '보통 눈': '보통 눈',
    '강한 눈': '강한 눈',
    'light snow': '가벼운 눈',
    'moderate snow': '보통 눈',
    'heavy snow': '강한 눈',
    
    // 안개
    '안개': '안개',
    'mist': '안개',
    'fog': '안개',
    
    // 기타
    '천둥번개': '천둥번개',
    'thunderstorm': '천둥번개',
    '우박': '우박',
    'hail': '우박'
  };
  
  return weatherMap[description] || description;
}

export async function getCurrentWeather(lat: number, lon: number, env?: CloudflareEnv): Promise<WeatherData> {
  const apiKey = env?.OPENWEATHER_API_KEY || process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenWeather API 키가 설정되지 않았습니다.');
  }
  
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`날씨 API 오류: ${response.status}`);
    }
    
    const data = await response.json() as any;
    
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      description: translateWeatherDescription(data.weather[0].description),
      icon: data.weather[0].icon,
    };
  } catch (error) {
    throw error;
  }
}

export async function getWeatherForecast(lat: number, lon: number, env?: CloudflareEnv): Promise<ForecastData[]> {
  const apiKey = env?.OPENWEATHER_API_KEY || process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenWeather API 키가 설정되지 않았습니다.');
  }
  
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`날씨 예보 API 오류: ${response.status}`);
    }
    
    const data = await response.json() as any;
    
    // 5일 예보 데이터 처리 (하루에 한 번씩)
    const dailyForecasts = data.list.filter((item: any, index: number) => index % 8 === 0);
    
    return dailyForecasts.slice(0, 5).map((item: any) => ({
      date: new Date(item.dt * 1000).toLocaleDateString('ko-KR', { 
        month: 'short', 
        day: 'numeric',
        weekday: 'short'
      }),
      temp_min: Math.round(item.main.temp_min),
      temp_max: Math.round(item.main.temp_max),
      description: translateWeatherDescription(item.weather[0].description),
      icon: item.weather[0].icon,
    }));
  } catch (error) {
    throw error;
  }
}