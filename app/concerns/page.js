'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, ArrowRight, Frown, Moon, Activity, Zap, Droplet, User, Heart } from 'lucide-react';
import PageHero from '../components/PageHero';

const concerns = [
  {
    id: 'stiff-shoulder',
    title: '肩こり・腰痛',
    description: 'デスクワークや立ち仕事による慢性的な痛みに',
    icon: Activity,
    color: 'bg-orange-100 text-orange-600',
    link: '/products?tag=stiff-shoulder'
  },
  {
    id: 'sleep',
    title: '不眠・寝付きが悪い',
    description: '質の高い睡眠を取り戻したい方に',
    icon: Moon,
    color: 'bg-indigo-100 text-indigo-600',
    link: '/products?tag=sleep'
  },
  {
    id: 'fatigue',
    title: '慢性疲労・だるさ',
    description: '休んでも疲れが取れない方に',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600',
    link: '/products?tag=fatigue'
  },
  {
    id: 'skin',
    title: '肌荒れ・美容',
    description: '内側から美しさを引き出したい方に',
    icon: Droplet,
    color: 'bg-pink-100 text-pink-600',
    link: '/products?tag=beauty'
  },
  {
    id: 'posture',
    title: '姿勢改善・猫背',
    description: '美しい立ち姿を手に入れたい方に',
    icon: User,
    color: 'bg-blue-100 text-blue-600',
    link: '/products?tag=posture'
  },
  {
    id: 'mental',
    title: 'ストレス・メンタル',
    description: '心のモヤモヤを解消したい方に',
    icon: Heart,
    color: 'bg-purple-100 text-purple-600',
    link: '/products?tag=stress'
  }
];

export default function ConcernsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <PageHero
        title="Find Your Solution"
        subtitle="お悩みから探す"
        image="/images/hero-concerns.png"
        description="体の悩みや目的に合わせた体験をご提案します。気になる項目を選んで、解決への一歩を踏み出しましょう。"
      />

      <div className="container mx-auto px-4 -mt-8 relative z-10">

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Custom Search Bar */}
          <div className="max-w-2xl mx-auto mb-16 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 font-medium"
              placeholder="キーワードで検索（例：眼精疲労、ダイエット...）"
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button className="bg-emerald-500 text-white p-2 rounded-xl hover:bg-emerald-600 transition-colors">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concerns.map((concern, index) => (
              <motion.div
                key={concern.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={concern.link} className="group block h-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 relative overflow-hidden">
                  <div className={`w-14 h-14 rounded-2xl ${concern.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <concern.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
                    {concern.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 group-hover:text-gray-600">
                    {concern.description}
                  </p>

                  <div className="flex items-center text-emerald-600 font-bold text-sm bg-emerald-50 w-fit px-4 py-2 rounded-full group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    商品を見る <ArrowRight className="w-4 h-4 ml-1" />
                  </div>

                  {/* Background Decoration */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gray-50 rounded-full group-hover:scale-150 group-hover:bg-emerald-50/50 transition-all duration-500 z-0 pointer-events-none" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}