'use client';

import { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from '@/lib/weather';
import { findNearestKoreanCity, KOREAN_CITIES } from '@/lib/location';
import EventsSection from './EventsSection';
import WeatherIcon from './WeatherIcon';

interface LocationData {
    lat: number;
    lon: number;
    cityName: string;
    nearestCityName: string;
    isCurrentLocation: boolean;
}

export default function LocationBasedWeather() {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [permissionDenied, setPermissionDenied] = useState(false);

    // 지역명을 API region 파라미터로 변환하는 함수
    const getRegionFromCityName = (cityName: string): string => {
        // lib/location.ts의 KOREAN_CITIES와 일치하는 매핑
        const cityToRegion: { [key: string]: string } = {
            '서울특별시': 'seoul',
            '부산광역시': 'busan',
            '대구광역시': 'daegu',
            '인천광역시': 'incheon',
            '광주광역시': 'gwangju',
            '대전광역시': 'daejeon',
            '울산광역시': 'ulsan',
            '세종시': 'sejong',
            '경기도': 'gyeonggi',
            '충청북도': 'chungbuk',
            '충청남도': 'chungnam',
            '전라북도': 'jeonbuk',
            '전라남도': 'jeonnam',
            '경상북도': 'gyeongbuk',
            '경상남도': 'gyeongnam',
            '강원도': 'gangwon',
            '제주도': 'jeju',
        };
        
        // 정확한 매칭 시도
        if (cityToRegion[cityName]) {
            return cityToRegion[cityName];
        }
        
        // 구체적인 도시명에서 지역 추출 (예: "구리시" → "경기도")
        if (cityName.includes('시') || cityName.includes('군')) {
            // 경기도 도시들
            if (['구리', '수원', '고양', '성남', '용인', '부천', '안산', '안양', '평택', 
                 '시흥', '김포', '광명', '군포', '오산', '하남', '이천', '안성', '의왕', 
                 '양평', '여주', '과천', '남양주', '파주', '양주', '포천', '동두천', 
                 '가평', '연천'].some(city => cityName.includes(city))) {
                return 'gyeonggi';
            }
            
            // 충청북도 도시들
            if (['청주', '충주', '제천', '보은', '옥천', '영동', '증평', '진천', '괴산', '음성', '단양'].some(city => cityName.includes(city))) {
                return 'chungbuk';
            }
            
            // 충청남도 도시들
            if (['천안', '공주', '보령', '아산', '서산', '논산', '계룡', '당진', '금산', '부여', '서천', '청양', '홍성', '예산', '태안'].some(city => cityName.includes(city))) {
                return 'chungnam';
            }
            
            // 전라북도 도시들
            if (['전주', '군산', '익산', '정읍', '남원', '김제', '완주', '진안', '무주', '장수', '임실', '순창', '고창', '부안'].some(city => cityName.includes(city))) {
                return 'jeonbuk';
            }
            
            // 전라남도 도시들
            if (['목포', '여수', '순천', '나주', '광양', '담양', '곡성', '구례', '고흥', '보성', '화순', '장흥', '강진', '해남', '영암', '무안', '함평', '영광', '장성', '완도', '진도', '신안'].some(city => cityName.includes(city))) {
                return 'jeonnam';
            }
            
            // 경상북도 도시들
            if (['포항', '경주', '김천', '안동', '구미', '영주', '영천', '상주', '문경', '경산', '군위', '의성', '청송', '영양', '영덕', '청도', '고령', '성주', '칠곡', '예천', '봉화', '울진', '울릉'].some(city => cityName.includes(city))) {
                return 'gyeongbuk';
            }
            
            // 경상남도 도시들
            if (['창원', '진주', '통영', '사천', '김해', '밀양', '거제', '양산', '의령', '함안', '창녕', '고성', '남해', '하동', '산청', '함양', '거창', '합천'].some(city => cityName.includes(city))) {
                return 'gyeongnam';
            }
            
            // 강원도 도시들
            if (['춘천', '원주', '강릉', '동해', '태백', '속초', '삼척', '홍천', '횡성', '영월', '평창', '정선', '철원', '화천', '양구', '인제', '고성', '양양'].some(city => cityName.includes(city))) {
                return 'gangwon';
            }
            
            // 제주도 도시들
            if (['제주', '서귀포'].some(city => cityName.includes(city))) {
                return 'jeju';
            }
        }
        
        // 부분 매칭 시도 (도시명에서 지역명 추출)
        for (const [city, region] of Object.entries(cityToRegion)) {
            if (cityName.includes(city) || city.includes(cityName)) {
                return region;
            }
        }
        
        // 기본값
        return 'seoul';
    };

    // 지역명을 계층적으로 표시하는 함수 추가
    const getHierarchicalLocationName = (cityName: string): string => {
        // 광역시/특별시는 그대로 표시
        if (cityName.includes('특별시') || cityName.includes('광역시') || cityName === '세종시') {
            return cityName;
        }
        
        // 도 단위 지역은 "도 시/군" 형태로 표시
        const regionMapping: { [key: string]: string } = {
            '수원시': '경기도 수원시',
            '고양시': '경기도 고양시',
            '성남시': '경기도 성남시',
            '용인시': '경기도 용인시',
            '부천시': '경기도 부천시',
            '안산시': '경기도 안산시',
            '안양시': '경기도 안양시',
            '평택시': '경기도 평택시',
            '시흥시': '경기도 시흥시',
            '김포시': '경기도 김포시',
            '광명시': '경기도 광명시',
            '군포시': '경기도 군포시',
            '오산시': '경기도 오산시',
            '하남시': '경기도 하남시',
            '이천시': '경기도 이천시',
            '안성시': '경기도 안성시',
            '의왕시': '경기도 의왕시',
            '양평군': '경기도 양평군',
            '여주시': '경기도 여주시',
            '과천시': '경기도 과천시',
            '남양주시': '경기도 남양주시',
            '파주시': '경기도 파주시',
            '양주시': '경기도 양주시',
            '구리시': '경기도 구리시',
            '포천시': '경기도 포천시',
            '동두천시': '경기도 동두천시',
            '가평군': '경기도 가평군',
            '연천군': '경기도 연천군',
            
            // 충청북도
            '청주시': '충청북도 청주시',
            '충주시': '충청북도 충주시',
            '제천시': '충청북도 제천시',
            '보은군': '충청북도 보은군',
            '옥천군': '충청북도 옥천군',
            '영동군': '충청북도 영동군',
            '증평군': '충청북도 증평군',
            '진천군': '충청북도 진천군',
            '괴산군': '충청북도 괴산군',
            '음성군': '충청북도 음성군',
            '단양군': '충청북도 단양군',
            
            // 충청남도
            '천안시': '충청남도 천안시',
            '공주시': '충청남도 공주시',
            '보령시': '충청남도 보령시',
            '아산시': '충청남도 아산시',
            '서산시': '충청남도 서산시',
            '논산시': '충청남도 논산시',
            '계룡시': '충청남도 계룡시',
            '당진시': '충청남도 당진시',
            '금산군': '충청남도 금산군',
            '부여군': '충청남도 부여군',
            '서천군': '충청남도 서천군',
            '청양군': '충청남도 청양군',
            '홍성군': '충청남도 홍성군',
            '예산군': '충청남도 예산군',
            '태안군': '충청남도 태안군',
            
            // 전라북도
            '전주시': '전라북도 전주시',
            '군산시': '전라북도 군산시',
            '익산시': '전라북도 익산시',
            '정읍시': '전라북도 정읍시',
            '남원시': '전라북도 남원시',
            '김제시': '전라북도 김제시',
            '완주군': '전라북도 완주군',
            '진안군': '전라북도 진안군',
            '무주군': '전라북도 무주군',
            '장수군': '전라북도 장수군',
            '임실군': '전라북도 임실군',
            '순창군': '전라북도 순창군',
            '고창군': '전라북도 고창군',
            '부안군': '전라북도 부안군',
            
            // 전라남도
            '목포시': '전라남도 목포시',
            '여수시': '전라남도 여수시',
            '순천시': '전라남도 순천시',
            '나주시': '전라남도 나주시',
            '광양시': '전라남도 광양시',
            '담양군': '전라남도 담양군',
            '곡성군': '전라남도 곡성군',
            '구례군': '전라남도 구례군',
            '고흥군': '전라남도 고흥군',
            '보성군': '전라남도 보성군',
            '화순군': '전라남도 화순군',
            '장흥군': '전라남도 장흥군',
            '강진군': '전라남도 강진군',
            '해남군': '전라남도 해남군',
            '영암군': '전라남도 영암군',
            '무안군': '전라남도 무안군',
            '함평군': '전라남도 함평군',
            '영광군': '전라남도 영광군',
            '장성군': '전라남도 장성군',
            '완도군': '전라남도 완도군',
            '진도군': '전라남도 진도군',
            '신안군': '전라남도 신안군',
            
            // 경상북도
            '포항시': '경상북도 포항시',
            '경주시': '경상북도 경주시',
            '김천시': '경상북도 김천시',
            '안동시': '경상북도 안동시',
            '구미시': '경상북도 구미시',
            '영주시': '경상북도 영주시',
            '영천시': '경상북도 영천시',
            '상주시': '경상북도 상주시',
            '문경시': '경상북도 문경시',
            '경산시': '경상북도 경산시',
            '군위군': '경상북도 군위군',
            '의성군': '경상북도 의성군',
            '청송군': '경상북도 청송군',
            '영양군': '경상북도 영양군',
            '영덕군': '경상북도 영덕군',
            '청도군': '경상북도 청도군',
            '고령군': '경상북도 고령군',
            '성주군': '경상북도 성주군',
            '칠곡군': '경상북도 칠곡군',
            '예천군': '경상북도 예천군',
            '봉화군': '경상북도 봉화군',
            '울진군': '경상북도 울진군',
            '울릉군': '경상북도 울릉군',
            
            // 경상남도
            '창원시': '경상남도 창원시',
            '진주시': '경상남도 진주시',
            '통영시': '경상남도 통영시',
            '사천시': '경상남도 사천시',
            '김해시': '경상남도 김해시',
            '밀양시': '경상남도 밀양시',
            '거제시': '경상남도 거제시',
            '양산시': '경상남도 양산시',
            '의령군': '경상남도 의령군',
            '함안군': '경상남도 함안군',
            '창녕군': '경상남도 창녕군',
            '경남고성군': '경상남도 고성군', // 경상남도 고성군
            '남해군': '경상남도 남해군',
            '하동군': '경상남도 하동군',
            '산청군': '경상남도 산청군',
            '함양군': '경상남도 함양군',
            '거창군': '경상남도 거창군',
            '합천군': '경상남도 합천군',
            
            // 강원도
            '춘천시': '강원도 춘천시',
            '원주시': '강원도 원주시',
            '강릉시': '강원도 강릉시',
            '동해시': '강원도 동해시',
            '태백시': '강원도 태백시',
            '속초시': '강원도 속초시',
            '삼척시': '강원도 삼척시',
            '홍천군': '강원도 홍천군',
            '횡성군': '강원도 횡성군',
            '영월군': '강원도 영월군',
            '평창군': '강원도 평창군',
            '정선군': '강원도 정선군',
            '철원군': '강원도 철원군',
            '화천군': '강원도 화천군',
            '양구군': '강원도 양구군',
            '인제군': '강원도 인제군',
            '강원고성군': '강원도 고성군', // 강원도 고성군
            '양양군': '강원도 양양군',
            
            // 제주도
            '제주시': '제주도 제주시',
            '서귀포시': '제주도 서귀포시'
        };
        
        return regionMapping[cityName] || cityName;
    };

    // 기본 위치로 시작 (서울)
    const getDefaultLocation = (): LocationData => ({
        lat: 37.5665,
        lon: 126.9780,
        cityName: '서울특별시',
        nearestCityName: '서울특별시',
        isCurrentLocation: false
    });

    // 위치 권한 상태 확인
    const checkLocationPermission = async (): Promise<boolean> => {
        if (!('permissions' in navigator)) return false;
        
        try {
            const permission = await navigator.permissions.query({ name: 'geolocation' });
            return permission.state === 'granted';
        } catch {
            return false;
        }
    };

    const getCurrentLocation = async () => {
        try {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude: lat, longitude: lon } = position.coords;
                        const nearestCity = findNearestKoreanCity(lat, lon);
                        
                        const locationData: LocationData = {
                            lat,
                            lon,
                            cityName: '현재 위치',
                            nearestCityName: nearestCity.name,
                            isCurrentLocation: true
                        };
                        setLocation(locationData);
                        await fetchWeatherData(lat, lon);
                    },
                    (positionError) => {
                        console.warn('위치 정보를 가져올 수 없음:', positionError);
                        // 위치 권한 거부 시 기본 위치 사용
                        if (positionError.code === 1) {
                            setPermissionDenied(true);
                            // 기본 위치로 날씨 정보 표시
                            const defaultLocation = getDefaultLocation();
                            setLocation(defaultLocation);
                            fetchWeatherData(defaultLocation.lat, defaultLocation.lon);
                        } else {
                            // 기타 오류 시에도 기본 위치 사용
                            const defaultLocation = getDefaultLocation();
                            setLocation(defaultLocation);
                            fetchWeatherData(defaultLocation.lat, defaultLocation.lon);
                        }
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000, // 5초로 단축
                        maximumAge: 300000
                    }
                );
            } else {
                // 위치 지원 안되는 브라우저도 기본 위치 사용
                const defaultLocation = getDefaultLocation();
                setLocation(defaultLocation);
                await fetchWeatherData(defaultLocation.lat, defaultLocation.lon);
            }
        } catch (error) {
            console.error('위치 정보 가져오기 실패:', error);
            // 오류 발생 시에도 기본 위치 사용
            const defaultLocation = getDefaultLocation();
            setLocation(defaultLocation);
            await fetchWeatherData(defaultLocation.lat, defaultLocation.lon);
        }
    };

    const fetchWeatherData = async (lat: number, lon: number) => {
        try {
            const [weatherRes, forecastRes] = await Promise.all([
                fetch(`/api/weather?lat=${lat}&lon=${lon}&type=current`),
                fetch(`/api/weather?lat=${lat}&lon=${lon}&type=forecast`)
            ]);

            if (weatherRes.ok && forecastRes.ok) {
                const weatherData = await weatherRes.json();
                const forecastData = await forecastRes.json();
                
                setWeather(weatherData as WeatherData);
                setForecast(forecastData as ForecastData[]);
            } else {
                const weatherError = await weatherRes.json().catch(() => ({}));
                const forecastError = await forecastRes.json().catch(() => ({}));
                throw new Error(`API 요청 실패: ${(weatherError as any).error || (forecastError as any).error}`);
            }
        } catch (error) {
            console.error('날씨 데이터 가져오기 실패:', error);
            setError('날씨 정보를 가져오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // 페이지 로드 시 즉시 기본 위치로 시작
        const defaultLocation = getDefaultLocation();
        setLocation(defaultLocation);
        fetchWeatherData(defaultLocation.lat, defaultLocation.lon);
        
        // 백그라운드에서 현재 위치 시도
        getCurrentLocation();
    }, []);

    const handleLocationRefresh = () => {
        getCurrentLocation();
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">위치 정보를 가져오는 중...</p>
                </div>
            </div>
        );
    }

    if (error || !location) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">위치 정보 오류</h2>
                    <div className="text-red-600 mb-4">
                        <p>{error}</p>
                    </div>
                    
                    {permissionDenied && (
                        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <p className="text-sm text-orange-700">
                                브라우저 설정에서 위치 접근 권한을 허용해주세요.
                            </p>
                        </div>
                    )}
                    
                    <button 
                        onClick={handleLocationRefresh}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">현재 날씨</h2>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                            📍 {location?.cityName}
                            {location?.isCurrentLocation && (
                                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    현재 위치
                                </span>
                            )}
                        </span>
                        <button 
                            onClick={handleLocationRefresh}
                            className="text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer"
                        >
                            새로고침
                        </button>
                    </div>
                </div>
                
                <div className="text-center">
                    {/* 현재 위치 정보 표시 */}
                    <div className="mb-4">
                        <div className="text-lg font-medium text-gray-700 mb-2">
                            📍 {getHierarchicalLocationName(location.nearestCityName)}
                        </div>
                    </div>
                    
                    {weather && (
                        <>
                            <div className="flex items-center justify-center mb-4">
                                <WeatherIcon icon={weather.icon} size={80} className="mr-4" />
                                <div>
                                    <div className="text-4xl font-bold text-blue-600">{weather.temperature}°C</div>
                                    <div className="text-lg text-gray-600">{weather.description}</div>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 mt-2">
                                체감온도: {weather.feels_like}°C | 습도: {weather.humidity}% | 풍속: {weather.wind_speed}m/s
                            </div>
                        </>
                    )}
                    
                    {forecast.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">5일 예보</h3>
                            <div className="overflow-x-auto">
                                <div className="grid grid-cols-5 gap-2 min-w-[665px]">
                                    {forecast.map((day, index) => (
                                        <div key={index} className="text-center p-2 bg-gray-50 rounded">
                                            <div className="text-sm font-medium text-gray-900">{day.date}</div>
                                            <WeatherIcon icon={day.icon} size={32} className="mx-auto my-1 flex items-center justify-center" />
                                            <div className="text-xs text-gray-600 mb-2">{day.description}</div>
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-xs text-amber-700 font-medium">최고</span>
                                                    <div className="text-sm font-bold text-amber-800">{day.temp_max}°</div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-xs text-slate-600 font-medium">최저</span>
                                                    <div className="text-sm font-bold text-slate-700">{day.temp_min}°</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 현재 위치 기반 행사/축제 정보 */}
            {location && (
                <EventsSection 
                    region={getRegionFromCityName(location.nearestCityName)}
                    cityName={getHierarchicalLocationName(location.nearestCityName)}
                />
            )}

            {/* 위치 권한 안내 메시지 */}
            {permissionDenied && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-700">
                        더 정확한 날씨 정보를 위해 위치 접근 권한을 허용해주세요.
                        <button 
                            onClick={getCurrentLocation}
                            className="ml-2 text-blue-600 hover:text-blue-800 underline"
                        >
                            위치 권한 허용
                        </button>
                    </p>
                </div>
            )}
        </div>
    );
}
