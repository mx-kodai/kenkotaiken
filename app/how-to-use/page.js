'use client';

import Link from 'next/link';
import { Heart, Search, Calendar, MapPin, CheckCircle, ArrowRight, Users, Star, Shield } from 'lucide-react';

export default function HowToUsePage() {
  const steps = [
    {
      number: '1',
      title: '商品を探す',
      description: '悩みやカテゴリーから、気になる健康デバイスを見つけましょう',
      icon: <Search className="h-6 w-6" />,
      details: [
        'カテゴリーから探す',
        '悩みから探す',
        '診断機能を使う',
        'キーワード検索'
      ]
    },
    {
      number: '2',
      title: '体験場所を選ぶ',
      description: 'お近くの体験スポットや、イベント情報をチェック',
      icon: <MapPin className="h-6 w-6" />,
      details: [
        '地図から探す',
        '現在地から検索',
        'イベント情報を確認',
        '営業時間を確認'
      ]
    },
    {
      number: '3',
      title: '予約・訪問',
      description: '予約が必要な場合は事前予約、予約不要なら直接訪問',
      icon: <Calendar className="h-6 w-6" />,
      details: [
        'オンライン予約',
        '電話予約',
        '予約不要の施設',
        'キャンセルポリシー確認'
      ]
    },
    {
      number: '4',
      title: '無料体験',
      description: '専門スタッフのサポートで、じっくり体験できます',
      icon: <Heart className="h-6 w-6" />,
      details: [
        '使い方の説明',
        '効果の体感',
        '質問・相談',
        'カップル・家族での体験OK'
      ]
    }
  ];

  const features = [
    {
      icon: <CheckCircle className="h-8 w-8 text-emerald-500" />,
      title: '完全無料',
      description: '全ての体験が無料。購入の義務もありません'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: 'カップル・家族歓迎',
      description: '一人でも、カップルでも、家族でも体験可能です'
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: '専門スタッフ',
      description: '各商品に詳しいスタッフが丁寧にサポート'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: '安心・安全',
      description: '強引な勧誘は一切なし。安心して体験できます'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">ご利用方法</h1>
            <p className="text-lg opacity-90">
              ウェルナビで健康デバイスを無料体験する流れをご紹介
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">
            4つのステップで簡単体験
          </h2>

          <div className="space-y-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-none">
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-emerald-500">{step.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <ArrowRight className="h-3 w-3 text-gray-400" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              ウェルナビの特徴
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-none">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              今すぐ健康体験を始めましょう
            </h2>
            <p className="text-gray-600 mb-6">
              あなたの健康の悩みを解決する第一歩を踏み出しませんか？
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition font-medium"
              >
                商品を探す
              </Link>
              <Link
                href="/events"
                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition font-medium"
              >
                イベント情報を見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}