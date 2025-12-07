'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import PageHero from '../components/PageHero';

const faqs = [
  {
    category: '体験について',
    items: [
      { q: "体験は本当に無料ですか？", a: "はい、当サイトに掲載されている体験プランは基本的に無料です。一部、材料費のみ実費がかかる場合や、特別コースで有料のものもございますが、その場合は明記されています。" },
      { q: "強引な勧誘はありますか？", a: "いいえ、当サイトの掲載パートナーには、強引な勧誘を行わないよう厳格なガイドラインを設けています。万が一、不快な思いをされた場合は運営局までご連絡ください。" },
      { q: "持ち物は必要ですか？", a: "多くの体験は手ぶらで参加可能です。ウェアのレンタルなどが必要なフィットネス体験の場合は、各プランの詳細ページをご確認ください。" }
    ]
  },
  {
    category: '予約・キャンセルについて',
    items: [
      { q: "予約の変更・キャンセルはできますか？", a: "はい、マイページから前日まで変更・キャンセルが可能です。当日の場合は、直接施設へお電話にてご連絡をお願いいたします。" },
      { q: "会員登録なしでも予約できますか？", a: "予約には会員登録（無料）が必要です。登録することで、予約管理や体験履歴の確認、お得なクーポンの利用が可能になります。" }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <PageHero
        title="FAQ"
        subtitle="よくある質問"
        image="/images/hero-faq.png"
        description="皆様から寄せられる質問をまとめました。解決しない場合は、お問い合わせフォームよりご相談ください。"
      />

      <div className="container mx-auto px-4 max-w-3xl -mt-8 relative z-10">

        <div className="space-y-12">
          {faqs.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
                <span className="w-2 h-6 bg-emerald-500 rounded-full" />
                {group.category}
              </h2>
              <div className="space-y-4">
                {group.items.map((item, index) => (
                  <FAQItem key={index} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-emerald-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">まだ解決しませんか？</h3>
            <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
              ご不明な点がございましたら、お気軽にお問い合わせください。<br />
              サポートチームが丁寧にお答えします。
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-emerald-900 font-bold px-8 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              お問い合わせフォームへ
            </a>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full opacity-50 blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-800 rounded-full opacity-50 blur-3xl -ml-32 -mb-32" />
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-gray-800 pr-8">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-50 bg-gray-50/50">
              <div className="pt-4">
                {answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}