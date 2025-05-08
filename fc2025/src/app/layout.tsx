import type { Metadata } from "next";
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
  icons: "/images/icon/favicon.png",
  openGraph: {
    title: "2025 대선 팩트체크",
    description: "뉴스타파 X 한국독립언론네트워크 KINN",
    images: "/images/main.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
