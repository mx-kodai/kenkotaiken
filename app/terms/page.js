'use client';

import { FileText, Shield, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      title: '第1条（利用規約の適用）',
      content: `本利用規約（以下「本規約」）は、株式会社ウェルナビ（以下「当社」）が提供する健康デバイス無料体験プラットフォーム「ウェルナビ」（以下「本サービス」）の利用に関する条件を定めるものです。利用者は、本規約に同意した上で本サービスを利用するものとします。`
    },
    {
      title: '第2条（定義）',
      content: `本規約において使用する用語の定義は以下のとおりとします。
      1. 「利用者」とは、本サービスを利用する個人または法人を指します。
      2. 「体験施設」とは、健康デバイスの体験を提供する店舗・施設を指します。
      3. 「パートナー企業」とは、当社と提携して本サービスを提供する企業を指します。`
    },
    {
      title: '第3条（サービス内容）',
      content: `当社は利用者に対し、以下のサービスを提供します。
      1. 健康デバイスの体験予約サービス
      2. 体験施設の情報提供
      3. 健康に関する情報提供
      4. その他当社が定めるサービス`
    },
    {
      title: '第4条（利用料金）',
      content: `本サービスの利用料金は無料とします。ただし、本サービスの利用に必要な通信費等は利用者の負担とします。`
    },
    {
      title: '第5条（利用者の責任）',
      content: `1. 利用者は、自己の責任において本サービスを利用するものとします。
      2. 利用者は、本サービスの利用にあたり、法令および本規約を遵守するものとします。
      3. 利用者は、体験施設の利用規則を遵守するものとします。`
    },
    {
      title: '第6条（禁止事項）',
      content: `利用者は、以下の行為を行ってはならないものとします。
      1. 法令または公序良俗に違反する行為
      2. 当社または第三者の権利を侵害する行為
      3. 虚偽の情報を登録する行為
      4. 本サービスの運営を妨害する行為
      5. その他当社が不適切と判断する行為`
    },
    {
      title: '第7条（個人情報の取り扱い）',
      content: `当社は、利用者の個人情報を当社のプライバシーポリシーに従って適切に取り扱います。`
    },
    {
      title: '第8条（免責事項）',
      content: `1. 当社は、本サービスの内容の正確性、完全性、有用性等について、いかなる保証もしません。
      2. 当社は、利用者が本サービスを利用したことにより生じた損害について、一切の責任を負いません。
      3. 当社は、体験施設での事故やトラブルについて、一切の責任を負いません。`
    },
    {
      title: '第9条（サービスの変更・終了）',
      content: `当社は、利用者への事前通知なく、本サービスの内容を変更または終了することができるものとします。`
    },
    {
      title: '第10条（規約の変更）',
      content: `当社は、必要に応じて本規約を変更することができるものとします。変更後の規約は、当社ウェブサイトに掲載した時点から効力を生じるものとします。`
    },
    {
      title: '第11条（準拠法・管轄裁判所）',
      content: `1. 本規約の解釈にあたっては、日本法を準拠法とします。
      2. 本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <FileText className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">利用規約</h1>
            <p className="text-lg opacity-90">
              最終更新日：2024年1月1日
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-none" />
              <p className="text-sm text-yellow-800">
                本サービスをご利用いただく前に、必ず以下の利用規約をお読みください。
                本サービスを利用することにより、本規約に同意したものとみなされます。
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  制定日：2020年4月1日<br />
                  最終改定日：2024年1月1日
                </p>
                <p className="text-gray-800 font-medium">
                  株式会社ウェルナビ<br />
                  代表取締役 山田 太郎
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-100 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-emerald-500 mt-0.5 flex-none" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  お問い合わせ
                </h3>
                <p className="text-sm text-gray-600">
                  本規約に関するご質問は、お問い合わせフォームよりご連絡ください。
                </p>
                <a
                  href="/contact"
                  className="inline-block mt-3 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  お問い合わせはこちら →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}