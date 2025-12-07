'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Crown, Star, MapPin, ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import PageHero from '../components/PageHero';
import { useRanking } from '../hooks/useRanking';

export default function RankingPage() {
    // フック接続
    const { rankings, period, setPeriod } = useRanking('product');

    const periods = [
        { value: 'daily', label: '今日' },
        { value: 'weekly', label: '今週' },
        { value: 'monthly', label: '今月' },
        { value: 'all', label: '累計' },
    ];

    // トレンドアイコン表示
    const TrendIcon = ({ trend, value }) => {
        if (trend === 'up') {
            return (
                <span className="flex items-center gap-1 text-green-500 text-xs font-medium">
                    <TrendingUp className="w-3 h-3" />
                    +{value}
                </span>
            );
        }
        if (trend === 'down') {
            return (
                <span className="flex items-center gap-1 text-red-500 text-xs font-medium">
                    <TrendingDown className="w-3 h-3" />
                    -{value}
                </span>
            );
        }
        return (
            <span className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                <Minus className="w-3 h-3" />
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <PageHero
                title="Best Selection"
                subtitle="人気ランキング"
                image="/images/hero-ranking.png"
                description="ユーザーの評価が高い人気の体験プランをご紹介。実際に体験した人々の満足度が高い厳選プランなら、間違いありません。"
            />

            <div className="container mx-auto px-4 max-w-4xl -mt-8 relative z-10">

                {/* 期間フィルター */}
                <div className="flex justify-center gap-2 mb-8">
                    {periods.map(p => (
                        <button
                            key={p.value}
                            onClick={() => setPeriod(p.value)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                                period === p.value
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                    : 'bg-white text-gray-500 border border-gray-200 hover:border-emerald-300'
                            }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    {rankings.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/products/${product.id}`} className="group block bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                                <div className="flex flex-col md:flex-row gap-6 items-center">

                                    {/* Rank Badge */}
                                    <div className="absolute top-4 left-4 md:static md:w-16 flex flex-col items-center justify-center z-10">
                                        <div className={`text-4xl font-extrabold italic ${index < 3 ? 'text-yellow-500 drop-shadow-sm' : 'text-gray-300'}`}>
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="w-full md:w-64 aspect-video relative rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 text-center md:text-left w-full">
                                        <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                                {product.category?.name || product.category}
                                            </span>
                                            <TrendIcon trend={product.trend} value={product.trendValue} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="font-bold text-gray-800">{product.rating}</span>
                                                <span className="text-gray-400">({product.reviewCount}件)</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-emerald-600">
                                                <span className="font-bold">スコア: {product.score}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="md:pr-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
