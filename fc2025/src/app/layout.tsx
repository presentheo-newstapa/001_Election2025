import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2025 대선 팩트체크",
  description: "뉴스타파 X 한국독립언론네트워크 KINN",
  keywords: "대통령, 선거, 대선, 대통령선거, 21대 대선, 팩트체크, 팩트, 뉴스타파, 한국독립언론네트워크, KINN",
  icons: "https://pages.newstapa.org/2025/factcheck2025/images/icon/favicon.png",
  openGraph: {
    title: "2025 대선 팩트체크",
    description: "뉴스타파 X 한국독립언론네트워크 KINN",
    url: "https://pages.newstapa.org/2025/factcheck2025",
    images: [
      {
        url: "https://pages.newstapa.org/2025/factcheck2025/images/share-banner_1200_logoX.jpg",
        width: 1200,
        height: 630,
        alt: "뉴스타파 - 2025 대선 팩트체크 썸네일"
      }
    ],
    locale: "ko_KR",
    type: "website"
  },
  twitter: {
    card: 'summary_large_image',
    title: '2025 대선 팩트체크',
    description: '뉴스타파 X 한국독립언론네트워크 KINN',
    images: ['https://pages.newstapa.org/2025/factcheck2025/images/share-banner_800_logoX.jpg'],    
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* GA4 세팅 */}
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-YMC350F0TN`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YMC350F0TN');
          `}
        </Script>
      </head>
      {/* 본문 */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
