'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContact } from '../hooks/useContact';
import PageHero from '../components/PageHero';

export default function ContactPage() {
  const { isSubmitting, isSubmitted, error, submitContact, reset } = useContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'サービスについて',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitContact(formData);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-12 text-center max-w-lg shadow-xl"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">お問い合わせありがとうございます</h2>
          <p className="text-gray-600 mb-4">
            内容を確認の上、担当者より2営業日以内にご連絡させていただきます。<br />
            確認メールをお送りしましたので、ご確認ください。
          </p>
          {/* (ダミー) 注意書き */}
          <p className="text-xs text-gray-400 mb-8">
            ※デモ版のため、実際のメールは送信されていません
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                reset();
                setFormData({ name: '', email: '', category: 'サービスについて', message: '' });
              }}
              className="bg-gray-100 text-gray-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              続けて問い合わせる
            </button>
            <Link
              href="/"
              className="bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-600 transition-colors"
            >
              トップページへ戻る
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <PageHero
        title="Contact Us"
        subtitle="お問い合わせ"
        image="/images/hero-contact.png"
        description="サービスに関するご質問、パートナー掲載についてのご相談など、お気軽にお問い合わせください。"
      />

      <div className="container mx-auto px-4 max-w-5xl -mt-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <div className="space-y-8">

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="bg-emerald-50 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">お電話でのお問い合わせ</h3>
                  <p className="text-2xl font-bold text-emerald-600">076-000-0000</p>
                  <p className="text-sm text-gray-500">平日 9:00 - 18:00</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">メールでのお問い合わせ</h3>
                  <p className="text-gray-600 mb-2">info@wellnavi.jp</p>
                  <p className="text-sm text-gray-500">24時間受付中</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="bg-purple-50 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">所在地</h3>
                  <p className="text-gray-600">
                    〒930-0000<br />
                    富山県富山市〇〇町 1-2-3<br />
                    ウェルネスビル 3F
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-gray-200/50">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">お名前 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base disabled:opacity-50"
                  placeholder="山田 太郎"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">メールアドレス <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base disabled:opacity-50"
                  placeholder="example@mail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">お問い合わせ種別 <span className="text-red-500">*</span></label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base disabled:opacity-50"
                >
                  <option>サービスについて</option>
                  <option>予約・キャンセルについて</option>
                  <option>掲載パートナーについて</option>
                  <option>その他</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">お問い合わせ内容 <span className="text-red-500">*</span></label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows="6"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-base disabled:opacity-50"
                  placeholder="ご質問内容をご記入ください"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 hover:translate-y-px transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    送信中...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    送信する
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
