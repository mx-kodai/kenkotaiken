import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-emerald-500" />
              <span className="text-xl font-bold text-gray-800">ウェルナビ</span>
            </div>
            <p className="text-sm text-gray-600">
              健康デバイスや施術の無料体験で、
              あなたの健康をサポートします
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">サービス</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-emerald-500">
                  商品を探す
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-sm text-gray-600 hover:text-emerald-500">
                  体験場所を探す
                </Link>
              </li>
              <li>
                <Link href="/concerns" className="text-sm text-gray-600 hover:text-emerald-500">
                  悩みから探す
                </Link>
              </li>
              <li>
                <Link href="/diagnosis" className="text-sm text-gray-600 hover:text-emerald-500">
                  診断する
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">サポート</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-to-use" className="text-sm text-gray-600 hover:text-emerald-500">
                  ご利用方法
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-emerald-500">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-emerald-500">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/partner" className="text-sm text-gray-600 hover:text-emerald-500">
                  パートナー募集
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">企業情報</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-emerald-500">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-emerald-500">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-emerald-500">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          © 2024 ウェルナビ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}