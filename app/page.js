'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Sparkles, Activity, Shield, Dumbbell, Stethoscope, Brain, Zap, ArrowRight, Play, Star, Moon, Droplet, Heart, Trophy, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from './components/ProductCard';
import BentoGrid from './components/BentoGrid';
import { products, experienceReports, experienceLocations } from './data/mockData';

export default function Home() {
  // High-End Category Data with Premium Imagery
  const categories = [
    {
      id: 1,
      title: '健康診断・測定',
      description: 'プロ仕様の機器で、現在の身体を知る。',
      image: '/images/cat-checkup.png',
      href: '/categories/diagnosis',
      icon: Stethoscope,
      bg: 'bg-blue-50'
    },
    {
      id: 2,
      title: 'フィットネス・運動',
      description: '一生動ける身体をつくる習慣。',
      image: '/images/cat-fitness-premium.png',
      href: '/categories/fitness',
      icon: Dumbbell,
      bg: 'bg-orange-50'
    },
    {
      id: 3,
      title: 'リラクゼーション',
      description: '極上の癒やしで、心身をリセット。',
      image: '/images/cat-beauty.png',
      href: '/categories/relaxation',
      icon: Sparkles,
      bg: 'bg-purple-50'
    },
    {
      id: 4,
      title: '睡眠・メンタル',
      description: '科学的アプローチで、質の高い休息を。',
      image: '/images/cat-sleep.png',
      href: '/categories/mental',
      icon: Moon,
      bg: 'bg-indigo-50'
    }
  ];

  return (
    <div className="relative overflow-x-hidden bg-white font-[family-name:var(--font-zen-kaku)]">
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-multiply">
        <Image
          src="/images/bg-gradient.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Hero Section: Immersive & Emotional */}
      <section className="relative min-h-[92vh] flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-emerald-50/80 to-transparent skew-x-12 translate-x-32 z-0" />

        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid md:grid-cols-12 gap-12 items-center">

            {/* Left Content Area (5 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:col-span-5 relative z-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 backdrop-blur-md border border-emerald-200 text-emerald-800 text-xs font-bold mb-8 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                体験キャンペーン実施中
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-gray-900 mb-8">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 pb-2">
                  健康体験
                </span>
                <span className="block text-4xl md:text-5xl font-bold text-gray-800">
                  が、もっと身近に。
                </span>
              </h1>

              <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
                最新デバイスも、人気サロンも。<br className="md:hidden" />
                購入前に「無料で」試せる日本最大級のプラットフォーム。<br />
                自分に合う健康習慣を、賢く見つけよう。
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/diagnosis"
                    className="group relative px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-center overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      あなたに合う体験を診断
                    </span>
                  </Link>

                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative flex items-center bg-white rounded-2xl">
                      <Search className="absolute left-4 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="体験を探す（例：マッサージ）"
                        className="w-full sm:w-64 py-4 pl-12 pr-4 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 ml-1">
                  <span className="font-bold">Popular:</span> 睡眠改善, 骨盤矯正, AI食事管理
                </p>
              </div>

              {/* Social Proof */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 relative overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}&backgroundColor=c0eee4`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                    +1k
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-900">4.9/5.0</span>
                  </div>
                  <p className="text-xs text-gray-500">ユーザー満足度</p>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Area (7 cols) - The "Japanese High-End" Visual */}
            <motion.div
              className="md:col-span-7 relative h-[500px] md:h-[700px] hidden md:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="absolute top-10 right-10 w-full h-full bg-gradient-to-bl from-emerald-100 via-teal-50 to-transparent rounded-[3rem] -z-10 animate-blob" />

              {/* Main Lifestyle Image */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white group">
                <Image
                  src="/images/hero-new.png"
                  alt="Healthy Japanese Family"
                  fill
                  className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                  priority
                />

                {/* Floating UI Card 1: Experience */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-12 left-12 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-lg border border-white/50 max-w-xs"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
                      <Heart className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold tracking-wider mb-1">RECOMMENDED</p>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">ペアヨガ体験</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 border border-white" />
                          <div className="w-6 h-6 rounded-full bg-gray-300 border border-white" />
                        </div>
                        <span className="text-xs text-gray-500 font-bold">12組が予約中</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating UI Card 2: AI Diagnosis */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-16 -right-6 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3 animate-float"
                >
                  <div className="relative w-12 h-12">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="#f3f4f6" strokeWidth="4" fill="none" />
                      <circle cx="24" cy="24" r="20" stroke="#10b981" strokeWidth="4" fill="none" strokeDasharray="125.6" strokeDashoffset="25" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-emerald-600">80%</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400">AI分析完了</div>
                    <div className="font-bold text-gray-900">健康スコア上昇</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wellness For All Section (Localized) */}
      <section className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase mb-2 block">LIFESTYLE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              大切な人と、<br className="md:hidden" />心身を整える時間を。
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-loose">
              一人での利用はもちろん、ご家族やパートナーとのペア体験も充実。<br />
              週末の新しい過ごし方として、健康体験を選んでみませんか？
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Couple Wellness', subtitle: 'カップルにおすすめ', desc: '二人で受けるAI診断やペアストレッチで、お互いの健康を気遣うデートを。', img: '/images/hero-couple-wellness.png', href: '/search?q=couple' },
              { title: 'Family Fun', subtitle: 'ご家族で楽しむ', desc: 'キッズスペース完備の施設や、お子様と一緒に楽しめるスポーツ体験も豊富です。', img: '/images/cat-fitness-premium.png', href: '/search?q=family' },
              { title: 'Local Support', subtitle: '地域限定プラン', desc: '富山県民限定の特別割引や、地元企業とのコラボイベントを開催中。', img: '/images/hero-locations.png', href: '/locations' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group cursor-pointer">
                <div className="relative h-80 rounded-[2rem] overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-emerald-800 inline-block mb-2">
                      {item.title}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{item.subtitle}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories: Visual Bento Grid */}
      <section className="py-20 relative z-10 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                カテゴリーから探す
              </h2>
              <p className="text-gray-500">
                興味のある分野から、あなたにぴったりの体験を見つけましょう。
              </p>
            </div>
            <Link href="/categories" className="flex items-center gap-2 font-bold text-emerald-600 hover:text-emerald-700 transition group">
              すべてのカテゴリー <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <BentoGrid items={categories} />
        </div>
      </section>

      {/* Featured Products: Horizontal Scroll UX */}
      <section className="py-24 bg-white relative z-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-emerald-600 tracking-wider">TRENDING</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">今週の人気体験</h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"><ArrowRight className="w-4 h-4 rotate-180" /></button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"><ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Mobile Scroll Container */}
          <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-8 overflow-x-auto pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar">
              {products.slice(0, 5).map((product, i) => (
                <div key={product.id} className="min-w-[280px] md:min-w-0 md:w-auto h-full snap-center flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
              <div className="min-w-[150px] md:hidden snap-center flex items-center justify-center">
                <Link href="/products" className="flex flex-col items-center gap-3 text-gray-400">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm">もっと見る</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/bg-gradient.png')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md mb-8">
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
            健康資産を、<br />もっと自由に。
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            WellNaviなら、自分に合った健康ソリューションを<br />
            リスクなく試すことができます。<br />
            まずは3分間のAI診断から始めてみませんか？
          </p>
          <Link
            href="/register"
            className="inline-block px-12 py-5 bg-emerald-500 text-white font-bold rounded-full text-lg hover:bg-emerald-400 transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/40"
          >
            無料で会員登録する
          </Link>
          <p className="mt-6 text-sm text-gray-500">
            登録は1分で完了します ・ クレジットカード不要
          </p>
        </div>
      </section>
    </div>
  );
}