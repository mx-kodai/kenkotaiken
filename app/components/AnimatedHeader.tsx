'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, Stethoscope, Heart, MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPrefectureOpen, setIsPrefectureOpen] = useState(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState('富山県');
  const pathname = usePathname();

  const prefectures = [
    { name: '富山県', available: true },
    { name: '石川県', available: false },
    { name: '新潟県', available: false },
    { name: '長野県', available: false },
    { name: '東京都', available: false },
  ];

  // Pages that require a dark header (text-gray-600) even at top position
  const isLightPage = ['/login', '/register', '/forgot-password', '/privacy', '/terms'].includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ホーム', href: '/' },
    { name: '体験を探す', href: '/products' },
    { name: '体験レポート', href: '/reports' },
    { name: '体験場所', href: '/locations' },
    { name: 'イベント', href: '/events' },
    { name: '掲載パートナー募集', href: '/partner' },
  ];

  // Determine styles based on state
  const isDarkText = isScrolled || isLightPage;
  const headerBgClass = isScrolled
    ? 'bg-white/90 backdrop-blur-md shadow-sm'
    : isLightPage
      ? 'bg-transparent'
      : 'bg-transparent bg-gradient-to-b from-black/50 to-transparent';

  const textColorClass = isDarkText ? 'text-gray-700' : 'text-white drop-shadow-sm';
  const logoTextClass = isDarkText
    ? 'bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600'
    : 'text-white drop-shadow-md';

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-14 ${headerBgClass}`}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 z-50 group">
              <div className="flex items-center gap-1.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isDarkText
                  ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
                  : 'bg-white/20 backdrop-blur-sm'
                  }`}>
                  <Heart className={`w-4 h-4 ${isDarkText ? 'text-white' : 'text-white'}`} fill="currentColor" />
                </div>
                <span className={`text-xl font-black tracking-tight transition-all duration-300 ${logoTextClass}`}>
                  ウェルナビ
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center h-full gap-8" aria-label="メインナビゲーション">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium hover:text-emerald-500 transition-colors duration-300 flex items-center h-full ${textColorClass}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Prefecture Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsPrefectureOpen(!isPrefectureOpen)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${isDarkText
                    ? 'text-gray-600 hover:bg-gray-100'
                    : 'text-white/90 hover:bg-white/10'
                    }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{selectedPrefecture}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isPrefectureOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isPrefectureOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      {prefectures.map((pref) => (
                        <button
                          key={pref.name}
                          onClick={() => {
                            if (pref.available) {
                              setSelectedPrefecture(pref.name);
                              setIsPrefectureOpen(false);
                            }
                          }}
                          disabled={!pref.available}
                          className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors ${pref.available
                            ? 'hover:bg-emerald-50 text-gray-700'
                            : 'text-gray-400 cursor-not-allowed bg-gray-50'
                            } ${selectedPrefecture === pref.name ? 'bg-emerald-50 text-emerald-700 font-bold' : ''}`}
                        >
                          <span>{pref.name}</span>
                          {!pref.available && (
                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">準備中</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/diagnosis"
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30"
              >
                <Stethoscope className="w-4 h-4" />
                無料診断
              </Link>
              <Link
                href="/mypage"
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all shadow-sm ${isDarkText
                  ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                  : 'text-emerald-800 bg-white/90 hover:bg-white backdrop-blur-sm'
                  }`}
              >
                <User className="w-4 h-4" />
                マイページ
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden z-50 p-2 transition-colors duration-300 ${textColorClass}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X aria-hidden="true" className="text-gray-800" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="モバイルメニュー"
            className="fixed inset-0 z-40 bg-white md:hidden pt-20 px-4"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <nav className="flex flex-col gap-2" aria-label="モバイルナビゲーション">
              {/* Mobile Prefecture Selector */}
              <div className="flex items-center gap-2 py-3 border-b border-gray-100">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <span className="text-gray-500 text-sm">エリア:</span>
                <select
                  value={selectedPrefecture}
                  onChange={(e) => setSelectedPrefecture(e.target.value)}
                  aria-label="都道府県を選択"
                  className="flex-1 text-lg font-bold text-emerald-700 bg-transparent border-none focus:outline-none"
                >
                  {prefectures.map((pref) => (
                    <option key={pref.name} value={pref.name} disabled={!pref.available}>
                      {pref.name}{!pref.available ? ' (準備中)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-gray-800 py-3 border-b border-gray-50 flex items-center justify-between group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  <span className="text-gray-300 group-hover:text-emerald-500 transition">→</span>
                </Link>
              ))}

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/diagnosis"
                  className="w-full py-3 text-center bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Stethoscope className="w-5 h-5" />
                  無料診断
                </Link>
                <Link
                  href="/mypage"
                  className="w-full py-3 text-center bg-emerald-50 text-emerald-700 font-bold rounded-lg hover:bg-emerald-100 flex items-center justify-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  マイページ
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
