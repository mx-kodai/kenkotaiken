'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Users, Heart, ArrowRight, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { concerns, products, experienceLocations } from '../data/mockData';

export default function ConcernsPage() {
  const [selectedConcern, setSelectedConcern] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConcerns = concerns.filter(concern =>
    concern.name.includes(searchTerm) || concern.description.includes(searchTerm)
  );

  const getRecommendedProducts = (concern) => {
    if (!concern) return [];
    const categoryIds = concern.relatedCategories.map(cat => cat.id);
    return products.filter(product => categoryIds.includes(product.category.id));
  };

  const getRecommendedLocations = (concern) => {
    if (!concern) return [];
    const recommendedProducts = getRecommendedProducts(concern);
    const productIds = recommendedProducts.map(p => p.id);
    
    return experienceLocations.filter(location => 
      location.products.some(product => productIds.includes(product.id))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">お悩み別体験検索</h1>
            <p className="text-lg opacity-90 mb-6">
              富山県内でカップル・ご家族と一緒に、気軽に健康の悩みを解決しませんか？
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="悩みで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!selectedConcern ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                どんなことでお困りですか？
              </h2>
              <p className="text-gray-600">
                お悩みをクリックすると、おすすめの体験をご提案します
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredConcerns.map(concern => (
                <button
                  key={concern.id}
                  onClick={() => setSelectedConcern(concern)}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-left group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600">
                      {concern.name}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 transition" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {concern.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {concern.relatedCategories.slice(0, 2).map(category => (
                      <span key={category.id} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        {category.name}
                      </span>
                    ))}
                    {concern.relatedCategories.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{concern.relatedCategories.length - 2}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-8">
              <div className="text-center">
                <Users className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  富山県民の皆様へ
                </h2>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="bg-white p-4 rounded-lg">
                    <Heart className="h-6 w-6 text-red-500 mb-2" />
                    <h3 className="font-semibold text-gray-800 mb-2">カップル体験</h3>
                    <p className="text-sm text-gray-600">
                      パートナーと一緒に健康について考える素敵な時間を
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <Users className="h-6 w-6 text-blue-500 mb-2" />
                    <h3 className="font-semibold text-gray-800 mb-2">家族体験</h3>
                    <p className="text-sm text-gray-600">
                      お子様連れ大歓迎！家族みんなで健康習慣を始めよう
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <Star className="h-6 w-6 text-green-500 mb-2" />
                    <h3 className="font-semibold text-gray-800 mb-2">地元特典</h3>
                    <p className="text-sm text-gray-600">
                      富山県内どこでも、お得な地域限定特典をご用意
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="mb-6">
              <button
                onClick={() => setSelectedConcern(null)}
                className="text-orange-600 hover:text-orange-700 mb-4"
              >
                ← 悩み一覧に戻る
              </button>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedConcern.name}
              </h2>
              <p className="text-gray-600 mb-6">
                {selectedConcern.description}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                おすすめの体験商品
              </h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getRecommendedProducts(selectedConcern).slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                富山県内の体験場所
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getRecommendedLocations(selectedConcern).slice(0, 3).map(location => (
                  <div key={location.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4">
                    <div className="aspect-video relative mb-3 bg-gray-100 rounded">
                      <Image
                        src={location.images[0]}
                        alt={location.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{location.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{location.city}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{location.rating}</span>
                      </div>
                      <Link
                        href={`/locations/${location.id}`}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                      >
                        詳細を見る →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  ご家族・カップルでの体験について
                </h3>
              </div>
              <div className="text-gray-600 space-y-2">
                <p>• お二人以上での体験予約も承っております</p>
                <p>• お子様連れの方には、キッズスペース完備の施設をおすすめします</p>
                <p>• カップル限定の特別体験メニューもご用意しています</p>
                <p>• 富山県内の皆様には、地域限定の特典サービスがございます</p>
              </div>
              <div className="mt-4">
                <Link
                  href="/diagnosis"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition inline-block"
                >
                  無料診断で最適な体験を見つける
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}