'use client';

import { Heart, Target, Users, Shield, Award, TrendingUp, Building, Globe } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: '健康への貢献',
      description: 'すべての人が健康で豊かな生活を送れるよう支援します'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: '顧客第一主義',
      description: 'お客様の立場に立って、最適なソリューションを提供します'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: '信頼と安心',
      description: '透明性の高いサービスで、安心して利用いただけます'
    },
    {
      icon: <Award className="h-8 w-8 text-purple-500" />,
      title: '品質へのこだわり',
      description: '厳選された質の高い商品・サービスのみを提供します'
    }
  ];

  const milestones = [
    { year: '2020年', event: 'ウェルナビ サービス開始' },
    { year: '2021年', event: '富山県内10箇所で体験可能に' },
    { year: '2022年', event: '累計体験者数1万人突破' },
    { year: '2023年', event: 'パートナー企業50社達成' },
    { year: '2024年', event: '全国展開に向けて準備開始' }
  ];

  const stats = [
    { number: '10,000+', label: '累計体験者数' },
    { number: '50+', label: 'パートナー企業' },
    { number: '100+', label: '取扱商品数' },
    { number: '98%', label: '満足度' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">会社概要</h1>
            <p className="text-lg opacity-90">
              健康デバイスの無料体験を通じて、みんなの健康をサポート
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <section className="mb-16">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                ミッション
              </h2>
              <div className="text-center max-w-3xl mx-auto">
                <Target className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
                <p className="text-xl text-gray-700 leading-relaxed">
                  「試してから選ぶ」という新しい健康デバイスとの出会い方を提供し、
                  一人ひとりに最適な健康ソリューションを見つけるお手伝いをします。
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              私たちの価値観
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              実績
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-emerald-500 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              沿革
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="max-w-2xl mx-auto">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4 mb-6 last:mb-0">
                    <div className="flex-none">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full mt-1.5"></div>
                    </div>
                    <div className="flex-1 pb-6 border-l-2 border-gray-200 -ml-1.5 pl-6">
                      <div className="font-semibold text-emerald-600">{milestone.year}</div>
                      <div className="text-gray-700">{milestone.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              会社情報
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <table className="w-full">
                <tbody className="divide-y">
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-700 w-1/3">会社名</td>
                    <td className="py-4 px-4 text-gray-600">株式会社ウェルナビ</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-700">設立</td>
                    <td className="py-4 px-4 text-gray-600">2020年4月</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-700">代表取締役</td>
                    <td className="py-4 px-4 text-gray-600">山田 太郎</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-700">資本金</td>
                    <td className="py-4 px-4 text-gray-600">1,000万円</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-700">従業員数</td>
                    <td className="py-4 px-4 text-gray-600">25名（2024年1月現在）</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-700">本社所在地</td>
                    <td className="py-4 px-4 text-gray-600">
                      〒930-0000<br />
                      富山県富山市XXX-XX-XX
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-700">事業内容</td>
                    <td className="py-4 px-4 text-gray-600">
                      健康デバイス体験プラットフォームの運営<br />
                      健康関連イベントの企画・運営<br />
                      健康コンサルティング事業
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-8 text-center">
              <Globe className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                全国展開に向けて
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                現在は富山県を中心に展開していますが、
                より多くの方に健康デバイスの無料体験を提供できるよう、
                全国展開を目指して準備を進めています。
              </p>
              <a
                href="/partner"
                className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition font-medium"
              >
                パートナー募集について
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}