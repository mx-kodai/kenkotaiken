'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Filter, MapPin, Star, Zap, Activity, Shield, Dumbbell, Stethoscope } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { products, categories, experienceLocations } from '../../data/mockData';

export default function CategoryPage({ params }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">カテゴリーが見つかりません</h1>
          <Link href="/" className="text-emerald-600 hover:text-emerald-700">
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  const categoryProducts = products.filter(p => p.category.id === category.id);
  
  let filteredProducts = categoryProducts;
  
  if (selectedFilter !== 'all') {
    filteredProducts = filteredProducts.filter(product => {
      switch (selectedFilter) {
        case 'free':
          return true;
        case 'highly_rated':
          return product.rating >= 4.5;
        case 'couple_friendly':
          return product.tags.includes('カップル限定') || product.tags.includes('ファミリー');
        case 'toyama_special':
          return product.tags.includes('富山県民限定');
        default:
          return true;
      }
    });
  }

  if (selectedLocation !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      experienceLocations.some(loc => 
        loc.city === selectedLocation && 
        loc.products.some(p => p.id === product.id)
      )
    );
  }

  const getIconForCategory = (categoryName) => {
    const iconMap = {
      'フィットネス': Dumbbell,
      'マッサージ': Activity,
      '健康測定': Stethoscope,
      'リラクゼーション': Shield,
      'エナジーデバイス': Zap
    };
    return iconMap[categoryName] || Activity;
  };

  const IconComponent = getIconForCategory(category.name);

  const filters = [
    { value: 'all', label: 'すべて' },
    { value: 'free', label: '無料体験' },
    { value: 'highly_rated', label: '高評価' },
    { value: 'couple_friendly', label: 'カップル・家族向け' },
    { value: 'toyama_special', label: '富山県民特典' }
  ];

  const toyamaCities = [
    { value: 'all', label: 'すべてのエリア' },
    { value: '富山市', label: '富山市' },
    { value: '高岡市', label: '高岡市' },
    { value: '射水市', label: '射水市' },
    { value: '魚津市', label: '魚津市' },
    { value: '氷見市', label: '氷見市' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center text-white/80 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              ホームに戻る
            </Link>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">{category.name}</h1>
              <p className="text-lg text-white/90 mt-2">
                {category.description || `${category.name}に関する健康デバイス・体験をご紹介`}
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{categoryProducts.length}</div>
                <div className="text-white/80 text-sm">商品数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {experienceLocations.filter(loc => 
                    loc.products.some(p => p.category.id === category.id)
                  ).length}
                </div>
                <div className="text-white/80 text-sm">体験場所</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {Math.round(categoryProducts.reduce((sum, p) => sum + p.rating, 0) / categoryProducts.length * 10) / 10}
                </div>
                <div className="text-white/80 text-sm">平均評価</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                絞り込み
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    条件
                  </label>
                  <div className="space-y-2">
                    {filters.map(filter => (
                      <label key={filter.value} className="flex items-center">
                        <input
                          type="radio"
                          name="filter"
                          value={filter.value}
                          checked={selectedFilter === filter.value}
                          onChange={(e) => setSelectedFilter(e.target.value)}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{filter.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    エリア
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {toyamaCities.map(city => (
                      <option key={city.value} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-gray-800 mb-3">このカテゴリーの特徴</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  {category.name === 'フィットネス' && (
                    <>
                      <p>• 運動不足解消に最適</p>
                      <p>• カップル・家族で一緒に体験</p>
                      <p>• 富山県内の専門施設で体験可能</p>
                    </>
                  )}
                  {category.name === 'マッサージ' && (
                    <>
                      <p>• 肩こり・腰痛の改善</p>
                      <p>• リラックス効果抜群</p>
                      <p>• 最新のマッサージ機器を体験</p>
                    </>
                  )}
                  {category.name === '健康測定' && (
                    <>
                      <p>• 健康状態の客観的把握</p>
                      <p>• 定期的な健康管理に最適</p>
                      <p>• 専門スタッフによるサポート</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredProducts.length}件の商品が見つかりました
              </h2>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>並び順:</span>
                <select className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>人気順</option>
                  <option>評価順</option>
                  <option>新着順</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <IconComponent className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  条件に合う商品が見つかりませんでした
                </h3>
                <p className="text-gray-600 mb-6">
                  フィルターを変更して再度お試しください
                </p>
                <button
                  onClick={() => {
                    setSelectedFilter('all');
                    setSelectedLocation('all');
                  }}
                  className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition"
                >
                  フィルターをリセット
                </button>
              </div>
            )}

            <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {category.name}を体験できる場所
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {experienceLocations
                  .filter(loc => loc.products.some(p => p.category.id === category.id))
                  .slice(0, 4)
                  .map(location => (
                    <Link key={location.id} href={`/locations/${location.id}`}>
                      <div className="bg-white rounded-lg p-4 hover:shadow-md transition">
                        <h4 className="font-medium text-gray-800 mb-2">{location.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{location.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{location.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">
                            ({location.reviews.length}件)
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              
              <div className="text-center mt-6">
                <Link
                  href="/locations"
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  すべての体験場所を見る →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}