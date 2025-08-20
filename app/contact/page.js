'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Building } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('お問い合わせを受け付けました。2営業日以内にご連絡いたします。');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'general',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: '電話でのお問い合わせ',
      content: '0120-XXX-XXX',
      subContent: '平日 9:00-18:00'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: 'メールでのお問い合わせ',
      content: 'info@wellnavi.jp',
      subContent: '24時間受付'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: '本社所在地',
      content: '富山県富山市XXX',
      subContent: '〒930-0000'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: '営業時間',
      content: '平日 9:00-18:00',
      subContent: '土日祝休み'
    }
  ];

  const subjects = [
    { value: 'general', label: '一般的なお問い合わせ' },
    { value: 'reservation', label: '予約について' },
    { value: 'product', label: '商品について' },
    { value: 'partner', label: 'パートナー希望' },
    { value: 'other', label: 'その他' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">お問い合わせ</h1>
            <p className="text-lg opacity-90">
              ご質問・ご相談はお気軽にお問い合わせください
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  お問い合わせフォーム
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="山田 太郎"
                      />
                    </div>
                    
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
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        電話番号
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="090-XXXX-XXXX"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        お問い合わせ種別 <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {subjects.map(subject => (
                          <option key={subject.value} value={subject.value}>
                            {subject.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="お問い合わせ内容をご記入ください"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="text-red-500">*</span> は必須項目です。
                      お問い合わせいただいた内容は、2営業日以内にご返信いたします。
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition font-medium flex items-center justify-center gap-2"
                  >
                    <Send className="h-5 w-5" />
                    送信する
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  お問い合わせ先
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-emerald-500 mt-1">{info.icon}</div>
                      <div>
                        <p className="font-medium text-gray-800">{info.title}</p>
                        <p className="text-gray-600">{info.content}</p>
                        {info.subContent && (
                          <p className="text-sm text-gray-500">{info.subContent}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  よくあるご質問
                </h3>
                <p className="text-gray-600 mb-4">
                  お問い合わせの前に、よくある質問をご確認ください
                </p>
                <a
                  href="/faq"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  <MessageSquare className="h-5 w-5" />
                  FAQを見る
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  パートナー募集
                </h3>
                <p className="text-gray-600 mb-4">
                  健康デバイスメーカー様、販売店様からのご相談も承っております
                </p>
                <a
                  href="/partner"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  <Building className="h-5 w-5" />
                  詳細を見る
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}