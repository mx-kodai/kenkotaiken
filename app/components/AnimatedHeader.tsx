'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Menu, X, Heart, MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrefectureOpen, setIsPrefectureOpen] = useState(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState('富山県');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navItems = [
    { href: '/events', label: '期間限定イベント', highlight: true },
    { href: '/products', label: '商品を探す' },
    { href: '/locations', label: '体験場所' },
    { href: '/concerns', label: '悩みから探す' },
    { href: '/diagnosis', label: '診断する' },
    { href: '/reports', label: '体験レポート' }
  ];

  return (
    <motion.header 
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Heart className="h-8 w-8 text-emerald-500" />
              </motion.div>
              <span className="text-2xl font-bold text-gray-800">ウェルナビ</span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Link 
                  href={item.href} 
                  className={`transition ${
                    item.highlight 
                      ? 'text-pink-600 hover:text-pink-700 font-medium' 
                      : 'text-gray-600 hover:text-emerald-500'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button 
              className="p-2 hover:bg-gray-100 rounded-full transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="h-5 w-5 text-gray-600" />
            </motion.button>
            
            <div className="relative hidden md:block">
              <motion.button
                onClick={() => setIsPrefectureOpen(!isPrefectureOpen)}
                className="flex items-center space-x-1 text-gray-600 hover:text-emerald-500 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{selectedPrefecture}</span>
                <motion.div
                  animate={{ rotate: isPrefectureOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-3 w-3" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isPrefectureOpen && (
                  <motion.div 
                    className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {prefectures.map((prefecture, index) => (
                      <motion.button
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
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.01 }}
                        whileHover={prefecture === '富山県' ? { x: 5 } : {}}
                      >
                        {prefecture}
                        {prefecture !== '富山県' && (
                          <span className="ml-2 text-xs text-gray-400">準備中</span>
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6 text-gray-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden py-4 border-t"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`transition ${
                        item.highlight 
                          ? 'text-pink-600 hover:text-pink-700 font-medium' 
                          : 'text-gray-600 hover:text-emerald-500'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}