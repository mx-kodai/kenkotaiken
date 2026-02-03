'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav() {
    const pathname = usePathname();

    // 閲覧中のページが特定のルートに含まれているか判定
    const isActive = (path) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    const navItems = [
        { href: '/', icon: Home, label: 'ホーム' },
        { href: '/search', icon: Search, label: 'さがす' },
        { href: '/diagnosis', icon: Sparkles, label: '診断', isCenter: true }, // 真ん中を強調
        { href: '/favorites', icon: Heart, label: 'お気に入り' },
        { href: '/mypage', icon: User, label: 'マイページ' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-100 pb-safe md:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-end justify-around w-full pb-1">
                {navItems.map((item) => {
                    const active = isActive(item.href);

                    if (item.isCenter) {
                        return (
                            <div key={item.href} className="relative -top-5">
                                <Link href={item.href}>
                                    <motion.div
                                        whileTap={{ scale: 0.9 }}
                                        className={`w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-lg shadow-emerald-500/30 transition-all duration-300 ${active
                                                ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                                                : 'bg-emerald-500 text-white'
                                            }`}
                                    >
                                        <item.icon className="w-6 h-6" />
                                    </motion.div>
                                </Link>
                                <span className="text-[10px] font-bold text-emerald-600 absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                    {item.label}
                                </span>
                            </div>
                        );
                    }

                    return (
                        <Link key={item.href} href={item.href} className="w-full">
                            <div className="flex flex-col items-center justify-center py-2 relative overflow-hidden group">
                                {/* Active Indicator Line */}
                                {active && (
                                    <motion.div
                                        layoutId="bottomNavIndicator"
                                        className="absolute top-0 w-8 h-1 bg-emerald-500 rounded-b-full"
                                    />
                                )}

                                <div className={`p-1 rounded-xl transition-colors duration-300 ${active ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'
                                    }`}>
                                    <item.icon className={`w-6 h-6 ${active ? 'fill-emerald-100' : ''}`} strokeWidth={active ? 2.5 : 2} />
                                </div>
                                <span className={`text-[10px] font-bold mt-0.5 transition-colors duration-300 ${active ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'
                                    }`}>
                                    {item.label}
                                </span>

                                {/* Ripple Effect (Visual only) */}
                                <div className="absolute inset-0 bg-gray-200 opacity-0 group-active:opacity-10 transition-opacity rounded-lg" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
