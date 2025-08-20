import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "업데이트 소식 - 갈래말래 날씨여행",
  description: "갈래말래 날씨여행의 최신 업데이트 소식과 개선사항을 확인하세요.",
  keywords: "업데이트, 패치노트, 개선사항, 새로운 기능, 갈래말래",
  alternates: {
    canonical: "https://www.weathertour.org/patch-notes",
  },
};

export default function PatchNotesPage() {
	const patchNotes = [
  	/*
		
		
    {
      version: "1.2.0",
      date: "2024-12-20",
      type: "major",
      title: "Footer 메뉴 및 페이지 추가",
      description: "사용자 경험 향상을 위한 Footer 메뉴와 새로운 페이지들을 추가했습니다.",
      features: [
        "Footer에 소개, 비즈니스 문의, 패치노트 메뉴 추가",
        "소개 페이지 구현 - 서비스 소개 및 기술 스택 정보",
        "비즈니스 문의 페이지 구현 - 협력 분야 소개 및 문의 양식",
        "패치노트 페이지 구현 - 업데이트 내역 및 버전 관리",
        "Next.js Link 컴포넌트를 활용한 클라이언트 사이드 라우팅"
      ],
      improvements: [
        "Footer 레이아웃을 4열 그리드로 개선",
        "반응형 디자인 적용으로 모바일 최적화",
        "일관된 디자인 시스템 적용",
        "SEO 최적화를 위한 메타데이터 설정"
      ],
      fixes: [
        "Footer 메뉴 링크 연결 문제 해결",
        "페이지 간 네비게이션 개선"
      ]
    },
    {
      version: "1.1.0",
      date: "2024-12-15",
      type: "minor",
      title: "지역별 페이지 및 API 구현",
      description: "전국 16개 지역별 상세 페이지와 API 서비스를 구현했습니다.",
      features: [
        "지역별 동적 라우팅 구현 (/[region])",
        "OpenWeatherMap API 연동으로 실시간 날씨 정보 제공",
        "공공데이터포털 API 연동으로 행사/축제 정보 제공",
        "날씨 아이콘 컴포넌트 구현",
        "지역별 날씨 및 행사 정보 표시"
      ],
      improvements: [
        "API 응답 캐싱 시스템 도입",
        "에러 처리 및 로딩 상태 관리",
        "환경변수를 통한 API 키 보안 관리",
        "TypeScript 타입 안정성 강화"
      ],
      fixes: [
        "API 호출 시 401 에러 처리 개선",
        "환경변수 설정 문제 해결"
      ]
    },


	*/
    {
      version: "1.0.0",
      date: "2025-08-19",
      type: "major",
      title: "서비스 런칭",
      description: "갈래말래 날씨여행의 첫 번째 버전을 출시했습니다.",
      features: [
        "Next.js 14.2.5 기반 프로젝트 구조 구축",
        "React 18.3.1 및 TypeScript 5.3.0 적용",
        "Tailwind CSS 4.1.1 스타일링 시스템",
        "Cloudflare Workers 배포 환경 설정",
        "기본 메인 페이지 및 레이아웃 구현",
        "Header 및 Footer 컴포넌트 구현",
        "반응형 웹 디자인 적용",
        "SSR(Server-Side Rendering) 지원"
      ],
      improvements: [],
      fixes: []
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-red-100 text-red-800';
      case 'minor':
        return 'bg-blue-100 text-blue-800';
      case 'patch':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white"> {/* 하얀색 배경 추가 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">패치노트</h1>
          <p className="text-xl text-gray-600">
            갈래말래 날씨여행의 업데이트 내역과 새로운 기능들을 확인하세요.
          </p>
        </div>

        <div className="space-y-8">
          {patchNotes.map((note, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-gray-900">v{note.version}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(note.type)}`}>
                    {note.type === 'major' ? '주요 업데이트' : 
                     note.type === 'minor' ? '기능 개선' : '버그 수정'}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{note.date}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{note.title}</h3>
              <p className="text-gray-600 mb-6">{note.description}</p>
              
              {note.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    새로운 기능
                  </h4>
                  <ul className="space-y-2">
                    {note.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-600 flex items-start">
                        <span className="text-green-600 mr-2 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {note.improvements.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    개선사항
                  </h4>
                  <ul className="space-y-2">
                    {note.improvements.map((improvement, improvementIndex) => (
                      <li key={improvementIndex} className="text-gray-600 flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {note.fixes.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    버그 수정
                  </h4>
                  <ul className="space-y-2">
                    {note.fixes.map((fix, fixIndex) => (
                      <li key={fixIndex} className="text-gray-600 flex items-start">
                        <span className="text-red-600 mr-2 mt-1">•</span>
                        {fix}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
