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

export async function getCurrentWeather(lat: number, lon: number, env?: CloudflareEnv): Promise<WeatherData> {
  const apiKey = env?.OPENWEATHER_API_KEY || process.env.OPENWEATHER_API_KEY;
  
  console.log('OpenWeather API 키 확인:', apiKey ? '설정됨' : '설정되지 않음');
  
  if (!apiKey) {
    throw new Error('OpenWeather API 키가 설정되지 않았습니다.');
  }
  
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
  
  console.log('OpenWeather API 호출:', url);
  
  try {
    const response = await fetch(url);
    console.log('OpenWeather API 응답 상태:', response.status);
    
    if (!response.ok) {
      throw new Error('날씨 정보를 가져오는데 실패했습니다.');
    }
    
    const data = await response.json();
    console.log('OpenWeather API 응답 데이터:', data);
    
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.error('날씨 API 오류:', error);
    throw error;
  }
}

export async function getWeatherForecast(lat: number, lon: number, env?: CloudflareEnv): Promise<ForecastData[]> {
  const apiKey = env?.OPENWEATHER_API_KEY || process.env.OPENWEATHER_API_KEY;
  
  console.log('OpenWeather Forecast API 키 확인:', apiKey ? '설정됨' : '설정되지 않음');
  
  if (!apiKey) {
    throw new Error('OpenWeather API 키가 설정되지 않았습니다.');
  }
  
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
  
  console.log('OpenWeather Forecast API 호출:', url);
  
  try {
    const response = await fetch(url);
    console.log('OpenWeather Forecast API 응답 상태:', response.status);
    
    if (!response.ok) {
      throw new Error('날씨 예보를 가져오는데 실패했습니다.');
    }
    
    const data = await response.json();
    console.log('OpenWeather Forecast API 응답 데이터:', data);
    
    // 5일 예보 데이터 처리 (하루에 한 번씩)
    const dailyForecasts = data.list.filter((item: any, index: number) => index % 8 === 0);
    
    return dailyForecasts.slice(1, 6).map((item: any) => ({
      date: new Date(item.dt * 1000).toLocaleDateString('ko-KR', { 
        month: 'short', 
        day: 'numeric',
        weekday: 'short'
      }),
      temp_min: Math.round(item.main.temp_min),
      temp_max: Math.round(item.main.temp_max),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));
  } catch (error) {
    console.error('날씨 예보 API 오류:', error);
    throw error;
  }
}