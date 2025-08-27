import { NextRequest, NextResponse } from 'next/server';
import { getEventDetail } from '@/lib/events';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    console.log('요청된 행사 ID:', id); // 디버깅용
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: '행사 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // contentId가 숫자인지 확인
    if (!/^\d+$/.test(id)) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 행사 ID입니다.' },
        { status: 400 }
      );
    }

    // 환경변수에서 API 키 가져오기
    const apiKey = process.env.PUBLIC_DATA_API_KEY;
    console.log('API 키 존재 여부:', !!apiKey); // 디버깅용
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // 행사 상세 정보 조회
    const eventDetail = await getEventDetail(id, apiKey);
    
    if (!eventDetail) {
      return NextResponse.json(
        { success: false, error: '행사 정보를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      event: eventDetail
    });

  } catch (error) {
    console.error('행사 상세정보 API 오류:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.' 
      },
      { status: 500 }
    );
  }
}
