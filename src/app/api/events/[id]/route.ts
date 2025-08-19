import { NextRequest, NextResponse } from 'next/server';
import { getEventDetail } from '@/lib/events';

// CloudflareEnv 타입 정의
interface CloudflareEnv {
  PUBLIC_DATA_API_KEY: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
  context?: { env: CloudflareEnv }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ error: '행사 ID가 필요합니다.' }, { status: 400 });
    }

    console.log('=== 상세정보 API 호출 시작 ===');
    console.log('행사 ID:', id);
    console.log('context 존재:', !!context);
    console.log('context.env 존재:', !!context?.env);
    console.log('context.env.PUBLIC_DATA_API_KEY 존재:', !!context?.env?.PUBLIC_DATA_API_KEY);
    console.log('process.env.PUBLIC_DATA_API_KEY 존재:', !!process.env.PUBLIC_DATA_API_KEY);

    // 로컬 개발: .env.local, Cloudflare: context.env 사용
    const apiKey = context?.env?.PUBLIC_DATA_API_KEY || process.env.PUBLIC_DATA_API_KEY;
    
    if (!apiKey) {
      console.error('❌ API 키가 설정되지 않았습니다.');
      console.error('context.env:', context?.env);
      console.error('process.env.PUBLIC_DATA_API_KEY:', process.env.PUBLIC_DATA_API_KEY);
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    console.log('✅ API 키 확인됨 (길이):', apiKey.length);
    console.log('API 키 앞 10자리:', apiKey.substring(0, 10) + '...');

    // contentId로 상세정보 조회
    console.log('getEventDetail 함수 호출 시작...');
    const eventDetail = await getEventDetail(id, apiKey);
    
    if (!eventDetail) {
      console.log('❌ 행사 정보를 찾을 수 없습니다:', id);
      return NextResponse.json(
        { error: '행사 정보를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    console.log('✅ 상세정보 조회 성공:', eventDetail.title);
    return NextResponse.json(eventDetail);
    
  } catch (error) {
    console.error('❌ 행사 상세 정보 조회 오류:', error);
    console.error('에러 타입:', typeof error);
    console.error('에러 메시지:', error instanceof Error ? error.message : String(error));
    console.error('에러 스택:', error instanceof Error ? error.stack : '스택 없음');
    
    return NextResponse.json(
      { 
        error: '행사 정보를 가져오는데 실패했습니다.',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
