import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedHeader from "./components/AnimatedHeader";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ウェルナビ - 健康デバイス・施術の無料体験プラットフォーム",
  description: "健康デバイスや施術の無料体験を簡単に見つけて予約できるプラットフォーム。あなたにぴったりの健康ソリューションを見つけましょう。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimatedHeader />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
