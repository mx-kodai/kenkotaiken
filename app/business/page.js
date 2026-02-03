'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Building2, Package, Calendar, MapPin, Star, BarChart3,
    Settings, LogOut, Bell, Plus, Eye, TrendingUp, Users,
    Edit, Trash2, ToggleLeft, ToggleRight, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { products, experienceLocations, experienceEvents } from '../data/mockData';

// デモ用事業者データ
const demoCompany = {
    id: 'comp-1',
    name: 'ウェルナビ・ヘルスケア',
    email: 'business@wellnavi.jp',
    logo: null,
    plan: 'プレミアム',
    productsCount: 6,
    totalViews: 12500,
    totalReservations: 342,
    rating: 4.6,
};

// デモ用統計
const demoStats = {
    todayViews: 156,
    weekViews: 1024,
    monthViews: 4521,
    todayReservations: 8,
    weekReservations: 45,
    monthReservations: 178,
    conversionRate: 3.9,
};

export default function BusinessPage() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [companyProducts] = useState(products.slice(0, 6));
    const [companyLocations] = useState(experienceLocations.slice(0, 3));
    const [companyEvents] = useState(experienceEvents.slice(0, 2));

    return (
        <div className="min-h-screen bg-gray-50 pt-14 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                        <Building2 className="w-4 h-4" />
                        事業者ダッシュボード
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{demoCompany.name}</h1>
                                <p className="text-gray-400">{demoCompany.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold">
                                {demoCompany.plan}プラン
                            </span>
                            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                                <Bell className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 sticky top-20">
                            <nav className="space-y-1">
                                <SidebarItem
                                    icon={BarChart3}
                                    label="ダッシュボード"
                                    isActive={activeTab === 'dashboard'}
                                    onClick={() => setActiveTab('dashboard')}
                                />
                                <SidebarItem
                                    icon={Package}
                                    label="商品管理"
                                    isActive={activeTab === 'products'}
                                    onClick={() => setActiveTab('products')}
                                    badge={companyProducts.length}
                                />
                                <SidebarItem
                                    icon={Calendar}
                                    label="予約管理"
                                    isActive={activeTab === 'reservations'}
                                    onClick={() => setActiveTab('reservations')}
                                    badge={12}
                                />
                                <SidebarItem
                                    icon={MapPin}
                                    label="体験場所"
                                    isActive={activeTab === 'locations'}
                                    onClick={() => setActiveTab('locations')}
                                />
                                <SidebarItem
                                    icon={Star}
                                    label="レビュー"
                                    isActive={activeTab === 'reviews'}
                                    onClick={() => setActiveTab('reviews')}
                                />
                                <SidebarItem
                                    icon={Settings}
                                    label="設定"
                                    isActive={activeTab === 'settings'}
                                    onClick={() => setActiveTab('settings')}
                                />
                                <div className="pt-4 mt-4 border-t border-gray-100">
                                    <Link
                                        href="/mypage"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition text-sm"
                                    >
                                        <Users className="w-4 h-4" />
                                        個人マイページへ
                                    </Link>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition text-sm">
                                        <LogOut className="w-4 h-4" />
                                        ログアウト
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Dashboard */}
                        {activeTab === 'dashboard' && (
                            <>
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <StatCard
                                        label="今月の閲覧数"
                                        value={demoStats.monthViews.toLocaleString()}
                                        change="+12%"
                                        icon={Eye}
                                        color="bg-blue-500"
                                    />
                                    <StatCard
                                        label="今月の予約数"
                                        value={demoStats.monthReservations}
                                        change="+8%"
                                        icon={Calendar}
                                        color="bg-emerald-500"
                                    />
                                    <StatCard
                                        label="コンバージョン率"
                                        value={`${demoStats.conversionRate}%`}
                                        change="+0.5%"
                                        icon={TrendingUp}
                                        color="bg-purple-500"
                                    />
                                    <StatCard
                                        label="平均評価"
                                        value={demoCompany.rating}
                                        icon={Star}
                                        color="bg-yellow-500"
                                    />
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="font-bold text-gray-800 mb-4">クイックアクション</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <QuickAction icon={Plus} label="商品を追加" href="#" />
                                        <QuickAction icon={MapPin} label="場所を追加" href="#" />
                                        <QuickAction icon={Calendar} label="イベント作成" href="#" />
                                        <QuickAction icon={BarChart3} label="レポート表示" href="#" />
                                    </div>
                                </div>

                                {/* Recent Reservations */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-gray-800">最近の予約</h3>
                                        <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                                            すべて見る
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            { name: '田中様', product: 'AIフィットネスミラー', date: '12/10', time: '14:00', status: 'confirmed' },
                                            { name: '佐藤様', product: 'ウェルネスチェアマッサージ', date: '12/11', time: '10:30', status: 'pending' },
                                            { name: '鈴木様', product: 'EMSトレーニング', date: '12/12', time: '16:00', status: 'confirmed' },
                                        ].map((res, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <Users className="w-5 h-5 text-gray-500" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{res.name}</p>
                                                        <p className="text-sm text-gray-500">{res.product}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-gray-800">{res.date} {res.time}</p>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                        res.status === 'confirmed'
                                                            ? 'bg-emerald-100 text-emerald-600'
                                                            : 'bg-yellow-100 text-yellow-600'
                                                    }`}>
                                                        {res.status === 'confirmed' ? '確定' : '未確定'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Products */}
                        {activeTab === 'products' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-800">商品管理</h2>
                                    <button className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-600 transition">
                                        <Plus className="w-4 h-4" />
                                        新規追加
                                    </button>
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-100">
                                            <tr>
                                                <th className="text-left px-6 py-4 text-sm font-bold text-gray-600">商品</th>
                                                <th className="text-left px-6 py-4 text-sm font-bold text-gray-600 hidden md:table-cell">カテゴリ</th>
                                                <th className="text-center px-6 py-4 text-sm font-bold text-gray-600 hidden md:table-cell">評価</th>
                                                <th className="text-center px-6 py-4 text-sm font-bold text-gray-600">公開</th>
                                                <th className="text-right px-6 py-4 text-sm font-bold text-gray-600">操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {companyProducts.map((product, i) => (
                                                <tr key={product.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden relative flex-shrink-0">
                                                                <Image
                                                                    src={product.images[0]}
                                                                    alt={product.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-800 line-clamp-1">{product.name}</p>
                                                                <p className="text-sm text-gray-500">ID: {product.id}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 hidden md:table-cell">
                                                        <span className="text-sm text-gray-600">{product.category.name}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center hidden md:table-cell">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                            <span className="text-sm font-medium">{product.rating}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button className="text-emerald-500">
                                                            <ToggleRight className="w-6 h-6" />
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                                                <Edit className="w-4 h-4 text-gray-500" />
                                                            </button>
                                                            <button className="p-2 hover:bg-red-50 rounded-lg transition">
                                                                <Trash2 className="w-4 h-4 text-red-500" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Reservations */}
                        {activeTab === 'reservations' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-800">予約管理</h2>

                                {/* Filter Tabs */}
                                <div className="flex gap-2">
                                    {['すべて', '未確定', '確定済み', '完了'].map(tab => (
                                        <button
                                            key={tab}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                                tab === 'すべて'
                                                    ? 'bg-gray-900 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className="flex items-center justify-between p-6 border-b border-gray-100 last:border-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                                    <Users className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800">予約者名 {i}</p>
                                                    <p className="text-sm text-gray-500">AIフィットネスミラー体験</p>
                                                    <p className="text-xs text-gray-400 mt-1">2024/12/{10+i} 14:00 - ウェルナビ体験センター富山</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    i % 2 === 0
                                                        ? 'bg-emerald-100 text-emerald-600'
                                                        : 'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                    {i % 2 === 0 ? '確定' : '未確定'}
                                                </span>
                                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Locations */}
                        {activeTab === 'locations' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-800">体験場所</h2>
                                    <button className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-600 transition">
                                        <Plus className="w-4 h-4" />
                                        新規追加
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {companyLocations.map(location => (
                                        <div key={location.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                            <div className="h-40 bg-gray-100 relative">
                                                <Image
                                                    src={location.images[0]}
                                                    alt={location.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-bold text-gray-800 mb-2">{location.name}</h3>
                                                <p className="text-sm text-gray-500 mb-4">{location.address}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                        <span className="text-sm font-medium">{location.rating}</span>
                                                    </div>
                                                    <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700">
                                                        編集する
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reviews */}
                        {activeTab === 'reviews' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-800">レビュー管理</h2>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-8 mb-8">
                                        <div className="text-center">
                                            <div className="text-4xl font-black text-gray-800">{demoCompany.rating}</div>
                                            <div className="flex items-center justify-center gap-1 my-2">
                                                {[1,2,3,4,5].map(i => (
                                                    <Star key={i} className={`w-5 h-5 ${i <= Math.floor(demoCompany.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                                                ))}
                                            </div>
                                            <div className="text-sm text-gray-500">全体評価</div>
                                        </div>
                                        <div className="flex-1">
                                            {[5,4,3,2,1].map(star => (
                                                <div key={star} className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm text-gray-500 w-3">{star}</span>
                                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-yellow-400 rounded-full"
                                                            style={{ width: `${star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : 5}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="p-4 bg-gray-50 rounded-xl">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                                        <div>
                                                            <p className="font-medium text-gray-800">ユーザー{i}</p>
                                                            <div className="flex items-center gap-1">
                                                                {[1,2,3,4,5].map(s => (
                                                                    <Star key={s} className={`w-3 h-3 ${s <= 5-i+1 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-gray-400">3日前</span>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    とても良い体験でした。スタッフの方も親切で、また利用したいと思います。
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Settings */}
                        {activeTab === 'settings' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-800">設定</h2>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="font-bold text-gray-800 mb-6">企業情報</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">企業名</label>
                                            <input
                                                type="text"
                                                defaultValue={demoCompany.name}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">メールアドレス</label>
                                            <input
                                                type="email"
                                                defaultValue={demoCompany.email}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">ロゴ画像</label>
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                                                    <Building2 className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                                                    画像を変更
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <button className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition">
                                            変更を保存
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub Components
function SidebarItem({ icon: Icon, label, isActive, onClick, badge }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition ${
                isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
            }`}
        >
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                {label}
            </div>
            {badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                    {badge}
                </span>
            )}
        </button>
    );
}

function StatCard({ label, value, change, icon: Icon, color }) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                {change && (
                    <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
                        {change}
                    </span>
                )}
            </div>
            <div className="text-2xl font-black text-gray-800">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
        </div>
    );
}

function QuickAction({ icon: Icon, label, href }) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center"
        >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Icon className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">{label}</span>
        </Link>
    );
}
