'use client';

import { useState } from 'react';
import { Building, Users, TrendingUp, Shield, Award, Target, CheckCircle, ArrowRight, Phone, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: 'manufacturer',
    message: ''
  });

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-emerald-500" />,
      title: '新規顧客獲得',
      description: '購入前に体験したい顧客層にリーチできます'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-emerald-500" />,
      title: '認知度向上',
      description: '商品の良さを実際に体感してもらえます'
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-500" />,
      title: '信頼性向上',
      description: '無料体験により購入後の満足度が向上します'
    },
    {
      icon: <Award className="h-8 w-8 text-emerald-500" />,
      title: 'ブランド価値',
      description: '健康意識の高い層への効果的なPRが可能です'
    }
  ];

  // ... (partnerTypes definition remains same) ...
  const partnerTypes = [
    {
      title: 'メーカー様',
      description: '健康デバイス・機器の製造メーカー',
      features: [
        '商品の無料体験提供',
        '体験会の企画・運営',
        'フィードバック収集',
        'マーケティング支援'
      ]
    },
    {
      title: '販売店様',
      description: '健康機器を取り扱う小売店・専門店',
      features: [
        '店舗での体験スペース提供',
        '専門スタッフによる説明',
        '予約システムの導入',
        '集客支援'
      ]
    },
    {
      title: '施設運営者様',
      description: 'ショッピングモール・商業施設',
      features: [
        'イベントスペースの活用',
        '集客イベントの開催',
        'テナント様との連携',
        '地域貢献活動'
      ]
    }
  ];

  const process = [
    { step: '1', title: 'お問い合わせ', description: '下記フォームよりご連絡ください' },
    { step: '2', title: 'ヒアリング', description: 'ご要望や条件を詳しくお伺いします' },
    { step: '3', title: 'ご提案', description: '最適なプランをご提案いたします' },
    { step: '4', title: '契約締結', description: '条件に合意後、契約を締結します' },
    { step: '5', title: '体験開始', description: '準備が整い次第、体験提供を開始します' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('パートナー申請を受け付けました。担当者より3営業日以内にご連絡いたします。');
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      businessType: 'manufacturer',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="For Partners"
        subtitle="掲載パートナー募集"
        image="/images/hero_partner_business.png"
        description="健康デバイスの無料体験を通じて、一緒に地域の健康づくりに貢献しませんか？"
      />

      <div className="container mx-auto px-4 py-16 -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Benefits Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 text-center transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              パートナーの種類
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {partnerTypes.map((type, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <Building className="h-8 w-8 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-none" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              パートナー登録の流れ
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {process.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                        {item.step}
                      </div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    {index < process.length - 1 && (
                      <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                パートナー申請フォーム
              </h2>

              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      会社名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ご担当者名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      電話番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    事業種別 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="manufacturer">メーカー</option>
                    <option value="retailer">販売店</option>
                    <option value="facility">施設運営</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ご要望・メッセージ
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="取り扱い商品やご要望などをご記入ください"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition font-medium"
                >
                  パートナー申請を送信
                </button>
              </form>
            </div>
          </section>

          <section className="text-center">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                お電話でのお問い合わせ
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-emerald-500" />
                  <span className="text-lg font-medium">0120-XXX-XXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-emerald-500" />
                  <span className="text-lg">partner@wellnavi.jp</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                営業時間：平日 9:00-18:00
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}