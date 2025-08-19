'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
        <p className="text-xl text-gray-600 mb-4">서버 오류가 발생했습니다</p>
        <p className="text-gray-500 mb-8">{error.message}</p>
        <button 
          onClick={reset}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
        >
          다시 시도
        </button>
        <a 
          href="/" 
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
}
