import { Geist, Geist_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import AnimatedHeader from "./components/AnimatedHeader";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import Providers from "./components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-kaku",
  display: "swap",
});

export const metadata = {
  title: "ウェルナビ - 健康デバイス・施術の無料体験プラットフォーム",
  description: "健康デバイスや施術の無料体験を簡単に見つけて予約できるプラットフォーム。あなたにぴったりの健康ソリューションを見つけましょう。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zenKaku.variable} antialiased`}
      >
        <Providers>
          <AnimatedHeader />
          <main id="main-content" className="min-h-screen" role="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
