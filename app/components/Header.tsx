'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, Heart, MapPin, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrefectureOpen, setIsPrefectureOpen] = useState(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState('富山県');

  const prefectures = [
    '富山県',
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
    '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
  ];

  const handlePrefectureSelect = (prefecture: string) => {
    if (prefecture === '富山県') {
      setSelectedPrefecture(prefecture);
      setIsPrefectureOpen(false);
    } else {
      alert(`${prefecture}は準備中です。現在は富山県のみご利用いただけます。`);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold text-gray-800">ウェルナビ</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="text-pink-600 hover:text-pink-700 transition font-medium">
              期間限定イベント
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-emerald-500 transition">
              商品を探す
            </Link>
            <Link href="/locations" className="text-gray-600 hover:text-emerald-500 transition">
              体験場所
            </Link>
            <Link href="/concerns" className="text-gray-600 hover:text-emerald-500 transition">
              悩みから探す
            </Link>
            <Link href="/diagnosis" className="text-gray-600 hover:text-emerald-500 transition">
              診断する
            </Link>
            <Link href="/reports" className="text-gray-600 hover:text-emerald-500 transition">
              体験レポート
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="hidden md:relative">
              <button
                onClick={() => setIsPrefectureOpen(!isPrefectureOpen)}
                className="flex items-center space-x-1 text-gray-600 hover:text-emerald-500 transition"
              >
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{selectedPrefecture}</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {isPrefectureOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {prefectures.map(prefecture => (
                    <button
                      key={prefecture}
                      onClick={() => handlePrefectureSelect(prefecture)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition ${
                        prefecture === '富山県' 
                          ? 'text-gray-900' 
                          : 'text-gray-400 cursor-not-allowed'
                      } ${
                        selectedPrefecture === prefecture 
                          ? 'bg-emerald-50 text-emerald-600 font-medium' 
                          : ''
                      }`}
                    >
                      {prefecture}
                      {prefecture !== '富山県' && (
                        <span className="ml-2 text-xs text-gray-400">準備中</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/events"
                className="text-pink-600 hover:text-pink-700 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                期間限定イベント
              </Link>
              <Link
                href="/products"
                className="text-gray-600 hover:text-emerald-500 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                商品を探す
              </Link>
              <Link
                href="/locations"
                className="text-gray-600 hover:text-emerald-500 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                体験場所
              </Link>
              <Link
                href="/concerns"
                className="text-gray-600 hover:text-emerald-500 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                悩みから探す
              </Link>
              <Link
                href="/diagnosis"
                className="text-gray-600 hover:text-emerald-500 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                診断する
              </Link>
              <Link
                href="/reports"
                className="text-gray-600 hover:text-emerald-500 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                体験レポート
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}