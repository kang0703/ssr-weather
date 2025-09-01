import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보 처리방침 | 갈래말래 날씨여행',
  description: '갈래말래 날씨여행의 개인정보 처리방침입니다.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보 처리방침</h1>
          
          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 개인정보 수집</h2>
              <p className="text-gray-700">
                본 사이트(weathertour.org)는 회원가입, 댓글, 게시판 등을 운영하지 않으며, 이름, 이메일 주소 등 사용자의 개인정보를 직접적으로 수집하지 않습니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 쿠키(Cookie) 사용</h2>
              <p className="text-gray-700 mb-4">
                본 사이트는 Google AdSense 광고를 게재합니다.
              </p>
              <p className="text-gray-700 mb-4">
                Google 및 제3자 광고 네트워크는 쿠키를 사용하여 사용자의 이전 방문 기록을 기반으로 맞춤형 광고를 제공합니다.
              </p>
              <p className="text-gray-700">
                사용자는 <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Google 광고 설정</a>에서 맞춤형 광고를 비활성화할 수 있습니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 개인정보 제3자 제공</h2>
              <p className="text-gray-700">
                본 사이트는 사용자의 개인정보를 제3자에게 판매하거나 제공하지 않습니다. 다만, 광고 제공 과정에서 Google 및 제3자 광고 네트워크가 쿠키 데이터를 활용할 수 있습니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 개인정보 보관 및 파기</h2>
              <p className="text-gray-700">
                본 사이트는 개인정보를 수집하지 않으므로 별도의 개인정보 보관 및 파기 절차는 없습니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 문의</h2>
              <p className="text-gray-700 mb-4">
                개인정보처리방침과 관련한 문의 사항은 아래 이메일로 연락해 주시기 바랍니다.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  📧 <a href="mailto:kcmschool@naver.com" className="text-blue-600 hover:text-blue-800 underline">kcmschool@naver.com</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
