'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Heart, DollarSign, Calendar, MapPin, Users, Shield, Clock } from 'lucide-react';

export default function FAQPage() {
  const [expandedItem, setExpandedItem] = useState(null);

  const faqCategories = [
    {
      title: '料金について',
      icon: <DollarSign className="h-5 w-5" />,
      items: [
        {
          question: '本当に無料で体験できるのですか？',
          answer: 'はい、すべての健康デバイスの体験は完全無料です。体験後に購入を強制されることもありません。安心してお試しいただけます。'
        },
        {
          question: '隠れた費用はありませんか？',
          answer: '一切ありません。体験料、相談料、キャンセル料など、すべて無料です。交通費のみご自身でご負担ください。'
        },
        {
          question: 'なぜ無料で提供できるのですか？',
          answer: 'メーカー様や販売店様のご協力により、多くの方に商品を知っていただく機会として無料体験を提供しています。'
        }
      ]
    },
    {
      title: '予約・体験について',
      icon: <Calendar className="h-5 w-5" />,
      items: [
        {
          question: '予約は必要ですか？',
          answer: '施設により異なります。予約必須の場所と、予約不要で直接訪問できる場所があります。各施設の詳細ページでご確認ください。'
        },
        {
          question: '体験時間はどのくらいですか？',
          answer: '商品により異なりますが、一般的に30分〜1時間程度です。じっくり体験していただけるよう、十分な時間を設けています。'
        },
        {
          question: 'キャンセルはできますか？',
          answer: 'はい、可能です。予約済みの場合は、できるだけ早めにご連絡ください。キャンセル料は一切かかりません。'
        },
        {
          question: '当日予約は可能ですか？',
          answer: '空きがあれば当日予約も可能です。ただし、人気の時間帯は埋まりやすいので、事前予約をおすすめします。'
        }
      ]
    },
    {
      title: '体験場所について',
      icon: <MapPin className="h-5 w-5" />,
      items: [
        {
          question: 'どこで体験できますか？',
          answer: '富山県内の提携店舗、ショッピングモール、体験施設で体験できます。地図検索機能で最寄りの場所をお探しいただけます。'
        },
        {
          question: '駐車場はありますか？',
          answer: 'ほとんどの体験施設に無料駐車場があります。詳細は各施設ページでご確認ください。'
        },
        {
          question: '営業時間は？',
          answer: '施設により異なりますが、多くは10:00〜19:00の営業です。土日祝日も営業している施設が多数あります。'
        }
      ]
    },
    {
      title: '対象者について',
      icon: <Users className="h-5 w-5" />,
      items: [
        {
          question: '年齢制限はありますか？',
          answer: '基本的にありませんが、一部の機器では安全上の理由から年齢制限がある場合があります。お子様は保護者同伴でお願いします。'
        },
        {
          question: 'カップルや家族で体験できますか？',
          answer: 'はい、大歓迎です！カップルやご家族での体験も可能です。一緒に健康について考える良い機会になります。'
        },
        {
          question: '持病があっても体験できますか？',
          answer: '商品により異なります。安全のため、事前に施設スタッフにご相談ください。医師の許可が必要な場合もあります。'
        }
      ]
    },
    {
      title: '安心・安全について',
      icon: <Shield className="h-5 w-5" />,
      items: [
        {
          question: '強引な勧誘はありませんか？',
          answer: '一切ありません。体験後の購入は完全に自由です。しつこい営業や勧誘は禁止しており、安心して体験いただけます。'
        },
        {
          question: '個人情報の取り扱いは？',
          answer: 'プライバシーポリシーに基づき、適切に管理しています。第三者への提供は行いません。'
        },
        {
          question: '衛生面は大丈夫ですか？',
          answer: '各施設で徹底した衛生管理を行っています。使用後の機器は都度消毒し、清潔な環境を保っています。'
        }
      ]
    },
    {
      title: 'その他',
      icon: <HelpCircle className="h-5 w-5" />,
      items: [
        {
          question: '体験後に購入したい場合は？',
          answer: '施設スタッフにお申し付けください。特別価格やキャンペーン情報もご案内できる場合があります。'
        },
        {
          question: '体験レポートとは何ですか？',
          answer: '実際に体験された方の感想や効果をまとめたレポートです。商品選びの参考にしていただけます。'
        },
        {
          question: 'パートナー企業になりたい',
          answer: 'パートナー募集ページから詳細をご確認いただき、お問い合わせください。'
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setExpandedItem(expandedItem === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">よくある質問</h1>
            <p className="text-lg opacity-90">
              ウェルナビについてのよくある質問をまとめました
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-emerald-500">{category.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800">{category.title}</h2>
              </div>
              
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white rounded-lg shadow-sm">
                    <button
                      onClick={() => toggleItem(categoryIndex, itemIndex)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <span className="font-medium text-gray-800">{item.question}</span>
                      {expandedItem === `${categoryIndex}-${itemIndex}` ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 flex-none" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 flex-none" />
                      )}
                    </button>
                    {expandedItem === `${categoryIndex}-${itemIndex}` && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-8 text-center">
            <Heart className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              その他のご質問は
            </h2>
            <p className="text-gray-600 mb-6">
              FAQに載っていないご質問がございましたら、お気軽にお問い合わせください
            </p>
            <a
              href="/contact"
              className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition font-medium"
            >
              お問い合わせはこちら
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}