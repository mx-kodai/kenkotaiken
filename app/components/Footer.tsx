'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, ArrowRight, MapPin, Phone, Loader2, CheckCircle } from 'lucide-react';
import { useNewsletter } from '../hooks/useContact';

export default function Footer() {
  const { isSubmitting, isSubscribed, error, subscribe, reset } = useNewsletter();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const success = await subscribe(email);
      if (success) {
        setEmail('');
      }
    }
  };

  return (
    <footer role="contentinfo" className="relative bg-white pt-20 pb-10 overflow-hidden border-t border-gray-100">
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section: Brand & Newsletter */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                W
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                WellNavi
              </span>
            </Link>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              健康は、体験することから始まります。<br />
              富山県内の最適なウェルネスソリューションを、<br />
              見て、触れて、実感してください。
            </p>
            {/* SNSリンクは実際のアカウント作成後に追加予定 */}
          </div>

          <div className="bg-gray-50/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-500" />
              最新情報を受け取る
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              新着の体験イベントや、限定キャンペーン情報をお届けします。
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-4 rounded-xl">
                <CheckCircle className="w-5 h-5" />
                <span className="font-bold">登録ありがとうございます！</span>
              </div>
            ) : (
              <>
                {error && (
                  <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
                <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレス"
                    required
                    disabled={isSubmitting}
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        登録 <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-12 border-t border-gray-100">
          <div>
            <h4 className="font-bold text-gray-800 mb-6">サービス</h4>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium block p-1 -ml-1 hover:bg-emerald-50 rounded-lg w-fit px-3">体験商品一覧</Link></li>
              <li><Link href="/locations" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium block p-1 -ml-1 hover:bg-emerald-50 rounded-lg w-fit px-3">体験スポットを探す</Link></li>
              <li><Link href="/events" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium block p-1 -ml-1 hover:bg-emerald-50 rounded-lg w-fit px-3">イベント情報</Link></li>
              <li><Link href="/categories" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium block p-1 -ml-1 hover:bg-emerald-50 rounded-lg w-fit px-3">カテゴリーから探す</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-6">体験・診断</h4>
            <ul className="space-y-4">
              <li><Link href="/diagnosis" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium block p-1 -ml-1 hover:bg-emerald-50 rounded-lg w-fit px-3">健康診断・チェック</Link></li>
              <li><Link href="/concerns" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium block p-1 -ml-1 hover:bg-emerald-50 rounded-lg w-fit px-3">悩み別ガイド</Link></li>
              <li><Link href="/reports" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium block p-1 -ml-1 hover:bg-emerald-50 rounded-lg w-fit px-3">みんなの体験レポート</Link></li>
              <li><Link href="/ranking" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium block p-1 -ml-1 hover:bg-emerald-50 rounded-lg w-fit px-3">人気ランキング</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-6">サポート</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium block p-1 -ml-1 hover:bg-emerald-50 rounded-lg w-fit px-3">WellNaviについて</Link></li>
              <li><Link href="/how-to-use" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium block p-1 -ml-1 hover:bg-emerald-50 rounded-lg w-fit px-3">ご利用ガイド</Link></li>
              <li><Link href="/faq" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium block p-1 -ml-1 hover:bg-emerald-50 rounded-lg w-fit px-3">よくある質問</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm font-medium block p-1 -ml-1 hover:bg-emerald-50 rounded-lg w-fit px-3">お問い合わせ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-6">お問い合わせ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>富山県富山市〇〇町 1-2-3<br />ウェルネスビル 3F</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>076-000-0000</span>
              </li>
              <li className="pt-2">
                <Link href="/partner" className="inline-block bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-800 transition shadow-lg shadow-gray-200">
                  掲載パートナー募集
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-medium">
            © 2025 WellNavi. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition">プライバシーポリシー</Link>
            <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600 transition">利用規約</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
