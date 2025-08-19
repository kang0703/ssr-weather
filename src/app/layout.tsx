import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "갈래말래 날씨여행 - 날씨와 행사 정보",
  description: "날씨와 함께하는 행사/축제 정보를 제공하는 웹사이트입니다.",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-favicon.png',
  },
  keywords: "날씨, 행사, 축제, 여행, 지역별 날씨, 날씨 예보, 한국 날씨, 갈래말래",
  authors: [{ name: "갈래말래 날씨여행" }],
  creator: "갈래말래 날씨여행",
  publisher: "갈래말래 날씨여행",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.weathertour.org/'),
  alternates: {
    canonical: "https://www.weathertour.org/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 구글 애드센스 스크립트 - 승인을 위해 필요 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9039480478069912"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "갈래말래 날씨여행",
              "description": "날씨와 함께하는 행사/축제 정보를 제공하는 웹사이트",
              "url": "https://www.weathertour.org/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.weathertour.org/events?search={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "갈래말래 날씨여행",
                "url": "https://www.weathertour.org/",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "email": "kcmschool@naver.com"
                }
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
