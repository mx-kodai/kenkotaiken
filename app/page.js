'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Sparkles, Activity, Shield, Dumbbell, Stethoscope, Brain, Zap, ArrowRight, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from './components/ProductCard';
import BentoGrid from './components/BentoGrid';
import { products, experienceReports, experienceLocations } from './data/mockData';

export default function Home() {
  // Mock data for Bento Grid with new images
  const categories = [
    {
      id: 1,
      title: '健康診断・測定',
      description: 'プロ仕様の機器で体の状態をチェック',
      image: '/images/cat-health.png',
      href: '/categories/diagnosis',
      icon: Stethoscope
    },
    {
      id: 2,
      title: 'フィットネス・運動',
      description: '楽しく続けられる運動習慣',
      image: '/images/cat-fitness.png',
      href: '/categories/fitness',
      icon: Dumbbell
    },
    {
      id: 3,
      title: 'リラクゼーション',
      description: '心と体を癒やす究極の体験',
      image: '/images/cat-relaxation.png',
      href: '/categories/relaxation',
      icon: Sparkles
    },
    {
      id: 4,
      title: 'メンタルケア',
      description: 'ストレスフリーな毎日へ',
      image: '/images/cat-mental.png',
      href: '/categories/mental',
      icon: Brain
    }
  ];

  return (
    <div className="relative overflow-x-hidden bg-white">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Image
          src="/images/bg-gradient.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold mb-6 animate-pulse">
                今だけの無料体験キャンペーン中
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  健康
                </span>
                を、もっと<br />
                身近に体験しよう。
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                最新の健康機器やウェルネス体験を、購入前に「無料で」試せるプラットフォーム。
                あなたにぴったりの健康習慣が、ここから始まります。
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/diagnosis"
                  className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-center hover:bg-gray-800 transition shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  あなたに合う体験を診断
                </Link>
                <div className="relative">
                  <label htmlFor="hero-search" className="sr-only">体験を検索</label>
                  <input
                    id="hero-search"
                    type="text"
                    placeholder="体験を探す（例：血圧計）"
                    className="w-full sm:w-64 px-6 py-4 bg-white/80 backdrop-blur border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 pl-12 shadow-sm"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-12 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                      {/* Placeholder avatars */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-gray-800">1,200人以上</div>
                  <div>が先月体験しました</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative h-[600px] hidden md:block"
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-emerald-200/20 rounded-[3rem] transform rotate-6 scale-95 blur-xl"></div>
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50">
                <Image
                  src="/images/hero.png"
                  alt="Healthy Lifestyle"
                  fill
                  className="object-cover"
                  priority
                />

                <Link href="/diagnosis">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-8 left-8 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg border border-white/50 max-w-xs cursor-pointer hover:bg-white hover:scale-105 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">ストレスチェック</div>
                        <div className="text-xs text-gray-500">無料体験可能</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-3/4"></div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Experiences
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              あなたの興味に合わせて、多彩なカテゴリから体験を探しましょう。
            </p>
          </motion.div>

          <BentoGrid items={categories} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50/50 backdrop-blur-sm relative z-10 border-y border-white/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">人気のおすすめ体験</h2>
              <p className="text-gray-600">今週注目されている無料体験アイテム</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition">
              すべて見る <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/products" className="inline-flex items-center gap-2 text-emerald-600 font-bold">
              すべて見る <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Reports */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            みんなの体験レポート
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {experienceReports.slice(0, 3).map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src={report.reviewer.avatar}
                      alt={report.reviewer.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{report.reviewer.name}</div>
                    <div className="text-xs text-gray-500">{report.reviewer.age} • {report.reviewer.city}</div>
                  </div>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <Image
                    src={report.images[0]}
                    alt={report.title}
                    fill
                    className="object-cover"
                  />
                  {report.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-5 h-5 text-emerald-600 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-lg mb-2 line-clamp-2">{report.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{report.description}</p>

                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < report.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 border-t border-white/10" />
        <div className="absolute inset-0 opacity-20 bg-[url('/images/mesh_gradient_background.png')] bg-cover bg-center" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Start?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            まずは無料体験から。あなたの健康な未来への第一歩を、ここから踏み出しましょう。
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-5 bg-emerald-500 text-white font-bold rounded-full text-lg hover:bg-emerald-400 transition transform hover:scale-105 shadow-2xl shadow-emerald-500/50"
          >
            無料で会員登録する
          </Link>
        </div>
      </section>
    </div>
  );
}