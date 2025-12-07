'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Calendar, UserCheck, Smile, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import PageHero from '../components/PageHero';

const steps = [
  {
    id: 1,
    title: '体験を探す',
    description: 'カテゴリー、悩み、場所から、気になる体験を見つけましょう。AI診断ならあなたにぴったりのプランを提案します。',
    icon: Search,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    title: '予約する',
    description: '希望の日時を選んで予約。会員登録（無料）をすると、スムーズに予約管理ができます。',
    icon: Calendar,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 3,
    title: '体験する',
    description: '予約した日時に施設へGo。手ぶらでOKな体験も多数。プロのスタッフが丁寧にサポートします。',
    icon: UserCheck,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 4,
    title: '実感する',
    description: '体験後の体の変化を感じてください。気に入れば継続プランの相談も可能ですが、無理な勧誘はありません。',
    icon: Smile,
    color: 'bg-emerald-100 text-emerald-600'
  }
];

export default function HowToUsePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero
        title="How to Use"
        subtitle="ご利用ガイド"
        image="/images/hero-howto.png"
        description="初めての方でも安心してご利用いただけるよう、体験までの流れをわかりやすくご案内します。予約から体験当日まで、ステップバイステップで解説。"
      />

      {/* Steps Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12 relative">
            {/* Vertical Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-emerald-100 -translate-x-1/2 z-0" />

            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative z-10 flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Step Number Badge (Center) */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 hidden md:flex w-10 h-10 bg-emerald-500 text-white rounded-full items-center justify-center font-bold border-4 border-white shadow-lg z-20">
                  {step.id}
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-emerald-200 transition-colors w-full">
                  <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center md:hidden ${step.color}`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className={`hidden md:flex w-16 h-16 rounded-2xl mb-6 items-center justify-center ${step.color}`}>
                    <step.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    <span className="md:hidden text-emerald-500 mr-2">STEP {step.id}</span>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">さあ、あなたも始めてみませんか？</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 hover:translate-y-px transition-all"
              >
                体験を探してみる
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/diagnosis"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl border-2 border-emerald-100 hover:bg-emerald-50 transition-all"
              >
                まずは診断してみる
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}