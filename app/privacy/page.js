'use client';

import { Shield, Lock, Eye, Database, UserCheck, Globe, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Database className="h-6 w-6 text-blue-500" />,
      title: '1. 収集する情報',
      content: `当社は、以下の情報を収集することがあります：

      【お客様から直接提供いただく情報】
      • 氏名、メールアドレス、電話番号
      • 住所、生年月日、性別
      • 健康に関する悩みや関心事項
      • 体験予約に関する情報
      
      【自動的に収集される情報】
      • IPアドレス、ブラウザの種類
      • アクセス日時、閲覧ページ
      • Cookie情報`
    },
    {
      icon: <Eye className="h-6 w-6 text-green-500" />,
      title: '2. 情報の利用目的',
      content: `収集した情報は以下の目的で利用します：

      • 体験予約の管理と確認
      • サービスの提供と改善
      • お客様からのお問い合わせへの対応
      • 新サービスやイベントのご案内
      • 統計データの作成（個人を特定しない形式）
      • 法令に基づく対応`
    },
    {
      icon: <Lock className="h-6 w-6 text-purple-500" />,
      title: '3. 情報の管理と保護',
      content: `お客様の個人情報を適切に保護するため、以下の対策を実施しています：

      • SSL暗号化通信の使用
      • アクセス制限の実施
      • 定期的なセキュリティ監査
      • 従業員への教育・研修
      • 物理的なセキュリティ対策`
    },
    {
      icon: <UserCheck className="h-6 w-6 text-orange-500" />,
      title: '4. 第三者への提供',
      content: `当社は、以下の場合を除き、お客様の個人情報を第三者に提供しません：

      • お客様の同意がある場合
      • 体験施設への予約情報の共有（サービス提供に必要な範囲）
      • 法令に基づく開示請求があった場合
      • 人の生命、身体または財産の保護のために必要な場合
      • 統計的なデータとして個人を識別できない形で提供する場合`
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-500" />,
      title: '5. Cookieの使用',
      content: `当社のウェブサイトでは、以下の目的でCookieを使用しています：

      • ログイン状態の保持
      • サービスの利便性向上
      • アクセス解析
      • 広告配信の最適化
      
      ブラウザの設定により、Cookieを無効にすることも可能ですが、
      一部のサービスが利用できなくなる場合があります。`
    },
    {
      icon: <Shield className="h-6 w-6 text-red-500" />,
      title: '6. お客様の権利',
      content: `お客様は、ご自身の個人情報について以下の権利を有します：

      • 開示請求：保有する個人情報の開示を求める権利
      • 訂正・追加・削除：情報の訂正等を求める権利
      • 利用停止：個人情報の利用停止を求める権利
      • 第三者提供の停止：第三者への提供停止を求める権利
      
      これらの請求は、お問い合わせフォームよりご連絡ください。`
    }
  ];

  const additionalInfo = [
    {
      title: '未成年者の個人情報について',
      content: '18歳未満の方は、保護者の同意を得た上で本サービスをご利用ください。'
    },
    {
      title: 'プライバシーポリシーの変更',
      content: '当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更内容は当社ウェブサイトに掲載いたします。'
    },
    {
      title: '個人情報の保存期間',
      content: '当社は、収集した個人情報を、サービス提供に必要な期間または法令で定められた期間、適切に保管します。'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">プライバシーポリシー</h1>
            <p className="text-lg opacity-90">
              最終更新日：2024年1月1日
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-none" />
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1">
                  お客様の個人情報保護について
                </p>
                <p className="text-sm text-blue-700">
                  株式会社ウェルナビ（以下「当社」）は、お客様の個人情報保護の重要性を認識し、
                  以下のプライバシーポリシーに基づき、個人情報を適切に取り扱います。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-none">{section.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              その他の重要事項
            </h2>
            <div className="space-y-4">
              {additionalInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {info.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-emerald-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-3">
              個人情報に関するお問い合わせ窓口
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>株式会社ウェルナビ 個人情報保護管理者</p>
              <p>メール：privacy@wellnavi.jp</p>
              <p>電話：0120-XXX-XXX（平日 9:00-18:00）</p>
              <a
                href="/contact"
                className="inline-block mt-3 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
              >
                お問い合わせフォーム
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>制定日：2020年4月1日</p>
            <p>最終改定日：2024年1月1日</p>
            <p className="mt-4 font-medium">
              株式会社ウェルナビ<br />
              代表取締役 山田 太郎
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}