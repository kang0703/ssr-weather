import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    icon: '/favicon.png',        // PNG 파비콘
    shortcut: '/favicon.png',    // 단축 아이콘
    apple: '/apple-favicon.png', // Apple 기기용
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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
