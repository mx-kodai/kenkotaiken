'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Heart, Clock, Settings, LogOut, Bell, Activity, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { useMyPage, useNotifications, useRecommendations } from '../hooks/useMyPage';
import { useAuth } from '../contexts/AuthContext';

export default function MyPage() {
    const [activeTab, setActiveTab] = useState('dashboard');

    // フック接続
    const { user: authUser, logout, isAuthenticated } = useAuth();
    const {
        user,
        reservations,
        favorites,
        viewHistory,
        diagnosisHistory,
        stats,
        isLoading,
    } = useMyPage();
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    const { recommendations, isLoading: recommendationsLoading } = useRecommendations();

    // 未ログイン時のリダイレクト用メッセージ
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-white rounded-3xl p-12 shadow-lg">
                    <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">ログインが必要です</h2>
                    <p className="text-gray-500 mb-6">マイページを表示するにはログインしてください。</p>
                    <Link
                        href="/login"
                        className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 transition"
                    >
                        ログインする
                    </Link>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
            </div>
        );
    }

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <PageHero
                title="My Dashboard"
                subtitle="マイページ"
                image="/images/hero-mypage.png"
                description={`ようこそ、${user.name}さん。あなたの健康活動の記録と、これからの予定を一目で確認できます。`}
            />

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid lg:grid-cols-4 gap-8">

                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-24"
                        >
                            <div className="text-center mb-8">
                                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4 relative overflow-hidden ring-4 ring-emerald-50">
                                    {/* Using a generic user icon if no image */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-emerald-100 text-emerald-500">
                                        <User className="w-12 h-12" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <div className="mt-4 flex items-center justify-center gap-2">
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">
                                        {user.rank}
                                    </span>
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                                        {user.points} pts
                                    </span>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                <SidebarItem
                                    icon={Activity}
                                    label="ダッシュボード"
                                    isActive={activeTab === 'dashboard'}
                                    onClick={() => setActiveTab('dashboard')}
                                />
                                <SidebarItem
                                    icon={Calendar}
                                    label="予約確認"
                                    isActive={activeTab === 'reservations'}
                                    onClick={() => setActiveTab('reservations')}
                                />
                                <SidebarItem
                                    icon={Heart}
                                    label="お気に入り"
                                    isActive={activeTab === 'favorites'}
                                    onClick={() => setActiveTab('favorites')}
                                />
                                <SidebarItem
                                    icon={Clock}
                                    label="閲覧履歴"
                                    isActive={activeTab === 'history'}
                                    onClick={() => setActiveTab('history')}
                                />
                                <SidebarItem
                                    icon={Settings}
                                    label="設定"
                                    isActive={activeTab === 'settings'}
                                    onClick={() => setActiveTab('settings')}
                                />
                                <div className="pt-4 mt-4 border-t border-gray-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        ログアウト
                                    </button>
                                </div>
                            </nav>
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">

                        {/* Notifications */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-emerald-500 text-white rounded-2xl p-4 flex items-center gap-4 shadow-lg shadow-emerald-500/20"
                        >
                            <div className="bg-white/20 p-2 rounded-full">
                                <Bell className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold">次回の予約が近づいています</p>
                                <p className="text-sm text-emerald-100">12月15日(土) 10:00 - 最新AIヘルスチェック</p>
                            </div>
                            <button className="text-sm bg-white text-emerald-600 px-4 py-2 rounded-lg font-bold hover:bg-emerald-50 transition-colors">
                                詳細を見る
                            </button>
                        </motion.div>

                        {/* Dashboard View */}
                        {activeTab === 'dashboard' && (
                            <div className="space-y-8">
                                {/* Stats Cards */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    <StatCard icon={Calendar} label="今月の予約" value={`${stats.reservationsThisMonth}件`} color="bg-blue-500" />
                                    <StatCard icon={Heart} label="お気に入り" value={`${stats.totalFavorites}件`} color="bg-pink-500" />
                                    <StatCard icon={Activity} label="閲覧履歴" value={`${stats.totalViews}件`} color="bg-emerald-500" />
                                </div>

                                {/* Upcoming Reservations */}
                                <Section title="次回の予約">
                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                        {reservations.map((res) => (
                                            <div key={res.id} className="flex flex-col md:flex-row gap-6 items-center border-b border-gray-100 last:border-0 pb-6 mb-6 last:pb-0 last:mb-0">
                                                <div className="w-full md:w-32 h-24 bg-gray-200 rounded-xl overflow-hidden relative shrink-0">
                                                    {/* Placeholder for reservation image */}
                                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                                        <Calendar className="w-8 h-8 opacity-50" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 text-center md:text-left">
                                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${res.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                            {res.status === 'confirmed' ? '予約確定' : '申請中'}
                                                        </span>
                                                        <span className="text-gray-500 text-sm">{res.date}</span>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-800 mb-1">{res.title}</h3>
                                                    <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1">
                                                        <Clock className="w-4 h-4" /> {res.time}
                                                    </p>
                                                </div>
                                                <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                                                    詳細
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </Section>

                                {/* Recommendations based on Diagnosis */}
                                <Section title="あなたへのおすすめ">
                                    {recommendationsLoading ? (
                                        <div className="flex justify-center py-8">
                                            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                                        </div>
                                    ) : (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {recommendations.slice(0, 2).map((product) => (
                                                <ProductCard key={product.id} product={product} />
                                            ))}
                                        </div>
                                    )}
                                </Section>
                            </div>
                        )}

                        {/* Favorites View */}
                        {activeTab === 'favorites' && (
                            <div>
                                {favorites.length === 0 ? (
                                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">お気に入りはまだありません</h3>
                                        <p className="text-gray-500 mb-6">気になる体験を見つけたらハートボタンを押してお気に入りに追加しましょう。</p>
                                        <Link
                                            href="/products"
                                            className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition"
                                        >
                                            体験を探す
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {favorites.map((item) => (
                                            <ProductCard key={item.product?.id || item.id} product={item.product || item} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Reservations View */}
                        {activeTab === 'reservations' && (
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                {reservations.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">予約はまだありません</h3>
                                        <p className="text-gray-500 mb-6">気になる体験を見つけて予約してみましょう。</p>
                                        <Link
                                            href="/locations"
                                            className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition"
                                        >
                                            体験場所を探す
                                        </Link>
                                    </div>
                                ) : (
                                    reservations.map((res) => (
                                        <div key={res.id} className="flex flex-col md:flex-row gap-6 items-center border-b border-gray-100 last:border-0 pb-6 mb-6 last:pb-0 last:mb-0">
                                            <div className="w-full md:w-32 h-24 bg-gray-200 rounded-xl overflow-hidden relative shrink-0">
                                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                                    <Calendar className="w-8 h-8 opacity-50" />
                                                </div>
                                            </div>
                                            <div className="flex-1 text-center md:text-left">
                                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${res.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                        {res.status === 'confirmed' ? '予約確定' : '申請中'}
                                                    </span>
                                                    <span className="text-gray-500 text-sm">{new Date(res.date).toLocaleDateString('ja-JP')}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-800 mb-1">{res.itemType === 'location' ? '体験予約' : 'イベント予約'}</h3>
                                                <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1">
                                                    <Clock className="w-4 h-4" /> {res.time}
                                                </p>
                                            </div>
                                            <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                                                詳細
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* History View */}
                        {activeTab === 'history' && (
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                {viewHistory.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">閲覧履歴はまだありません</h3>
                                        <p className="text-gray-500">商品や体験場所を閲覧すると履歴が表示されます。</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {viewHistory.slice(0, 10).map((item, idx) => (
                                            <Link key={idx} href={`/${item.itemType}s/${item.itemId}`}>
                                                <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <Clock className="w-6 h-6 text-gray-400" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-800">{item.itemType === 'product' ? '商品' : item.itemType === 'location' ? '体験場所' : 'イベント'}</p>
                                                        <p className="text-sm text-gray-500">{new Date(item.viewedAt).toLocaleString('ja-JP')}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Settings View */}
                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Settings className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">設定機能は準備中です</h3>
                                <p className="text-gray-500">
                                    現在開発中のため、まだご利用いただけません。<br />
                                    今後のアップデートをお待ちください。
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub Components
function SidebarItem({ icon: Icon, label, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            <Icon className="w-5 h-5" />
            {label}
        </button>
    );
}

function StatCard({ icon: Icon, label, value, color }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full ${color} text-white flex items-center justify-center shadow-md`}>
                <Icon className="w-7 h-7" />
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className="text-2xl font-black text-gray-800">{value}</p>
            </div>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-emerald-500 rounded-full" />
                {title}
            </h2>
            {children}
        </div>
    );
}
