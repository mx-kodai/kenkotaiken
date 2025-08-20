'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Play, Star, Heart, Calendar, Clock, MapPin, User, ThumbsUp, Share2, MessageCircle } from 'lucide-react';
import { experienceReports } from '../../data/mockData';

export default function ReportDetailPage({ params }) {
  const [liked, setLiked] = useState(false);
  const report = experienceReports.find(r => r.id === params.id);

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">体験レポートが見つかりません</h1>
          <Link href="/reports" className="text-emerald-600 hover:text-emerald-700">
            レポート一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/reports" 
            className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            体験レポート一覧に戻る
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-video relative bg-gray-100">
            <Image
              src={report.images[0]}
              alt={report.title}
              fill
              className="object-cover"
            />
            {report.videoUrl && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition">
                  <Play className="h-8 w-8 text-purple-600 ml-1" fill="currentColor" />
                </button>
              </div>
            )}
            <div className="absolute top-4 left-4 bg-purple-500 text-white text-sm px-3 py-1 rounded-full">
              体験レポート
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {report.title}
                </h1>
                
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                      <Image
                        src={report.reviewer.avatar}
                        alt={report.reviewer.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{report.reviewer.name}</span>
                    <span>•</span>
                    <span>{report.reviewer.age}</span>
                    <span>•</span>
                    <span>{report.reviewer.gender}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {report.reviewer.city}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{report.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{report.experienceDate.toLocaleDateString('ja-JP')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{report.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                  <span>{report.likes + (liked ? 1 : 0)}</span>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition">
                  <Share2 className="h-4 w-4" />
                  シェア
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">体験商品</h3>
                <Link href={`/products/${report.product.id}`}>
                  <div className="border rounded-lg p-4 hover:border-emerald-500 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={report.product.images[0]}
                          alt={report.product.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{report.product.name}</h4>
                        <p className="text-sm text-gray-600">{report.product.company.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{report.product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">体験場所</h3>
                <Link href={`/locations/${report.location.id}`}>
                  <div className="border rounded-lg p-4 hover:border-emerald-500 transition">
                    <h4 className="font-medium text-gray-800 mb-2">{report.location.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{report.location.address}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{report.location.rating}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">体験レポート</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {report.description}
              </p>
            </div>

            {report.beforeAfter && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">ビフォー・アフター</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="font-medium text-red-800 mb-2">体験前</h4>
                    <p className="text-red-700">{report.beforeAfter.before}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-medium text-green-800 mb-2">体験後</h4>
                    <p className="text-green-700">{report.beforeAfter.after}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {report.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t pt-8">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  投稿日: {report.createdAt.toLocaleDateString('ja-JP')}
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">コメントする</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">参考になった</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">関連する体験レポート</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {experienceReports
              .filter(r => r.id !== report.id)
              .slice(0, 3)
              .map(relatedReport => (
                <Link key={relatedReport.id} href={`/reports/${relatedReport.id}`}>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                    <div className="aspect-video relative bg-gray-100">
                      <Image
                        src={relatedReport.images[0]}
                        alt={relatedReport.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
                        {relatedReport.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>{relatedReport.reviewer.name}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{relatedReport.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}