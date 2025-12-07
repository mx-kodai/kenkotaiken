'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                W
              </div>
              <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${logoTextClass}`}>
                WellNavi
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="メインナビゲーション">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium hover:text-emerald-500 transition-colors duration-300 ${textColorClass}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-2">
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
