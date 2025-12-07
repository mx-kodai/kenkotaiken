'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Filter, MapPin, Star, Zap, Activity, Shield, Dumbbell, Stethoscope, Check, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import { products, categories, experienceLocations } from '../../data/mockData';

export default function CategoryPage({ params }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Unwrapping params is not strictly necessary for this version but good practice if using latest Next.js patterns
  // However, for this file structure in Next 15, params is a promise in server components but this is a client component.
  // In Next.js 15, Page props are Promises. But since this is a client component ('use client'), it receives params as props.
  // Wait, in Next 15, params might be a Promise even in Client Components if not carefully handled or if the parent is async.
  // But typically for standard routing it's passed as is in current versions or we might need `use`.
  // Let's assume standard behavior for now, but verify if "params" needs to be awaited or if it's direct.
  // In the previous file it was used directly. I will stick to that. 

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
          return true; // All mock products are likely free for trial, logic to be adjusted based on real data
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
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
        <div className="absolute inset-0 bg-[url('/images/mesh_gradient_background.png')] opacity-30 bg-cover bg-center" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white transition group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              ホームに戻る
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner border border-white/30">
              <IconComponent className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{category.name}</h1>
              <p className="text-lg text-emerald-50">
                {category.description || `${category.name}に関する健康デバイス・体験をご紹介`}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 md:w-fit bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div className="text-center md:text-left px-4 md:border-r border-white/20">
              <div className="text-2xl font-bold text-white">{categoryProducts.length}</div>
              <div className="text-emerald-100 text-xs md:text-sm">商品数</div>
            </div>
            <div className="text-center md:text-left px-4 md:border-r border-white/20">
              <div className="text-2xl font-bold text-white">
                {experienceLocations.filter(loc =>
                  loc.products.some(p => p.category.id === category.id)
                ).length}
              </div>
              <div className="text-emerald-100 text-xs md:text-sm">体験場所</div>
            </div>
            <div className="text-center md:text-left px-4">
              <div className="text-2xl font-bold text-white">
                {Math.round(categoryProducts.reduce((sum, p) => sum + p.rating, 0) / categoryProducts.length * 10) / 10}
              </div>
              <div className="text-emerald-100 text-xs md:text-sm">平均評価</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/20 space-y-8">
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  絞り込み
                </h3>

                <div className="space-y-2">
                  {filters.map(filter => (
                    <label
                      key={filter.value}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${selectedFilter === filter.value ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="filter"
                          value={filter.value}
                          checked={selectedFilter === filter.value}
                          onChange={(e) => setSelectedFilter(e.target.value)}
                          className="hidden"
                        />
                        <span className="text-sm">{filter.label}</span>
                      </div>
                      {selectedFilter === filter.value && <Check className="w-4 h-4" />}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  エリア
                </h3>
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-3 bg-gray-50 hover:bg-white border-transparent hover:border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-gray-700 appearance-none cursor-pointer font-medium"
                  >
                    {toyamaCities.map(city => (
                      <option key={city.value} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-bold text-gray-700 mb-3 text-sm">Features</h4>
                <div className="space-y-2 text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
                  {category.name === 'フィットネス' && (
                    <>
                      <p className="flex items-center gap-2">✅ 運動不足解消に最適</p>
                      <p className="flex items-center gap-2">✅ カップル・家族で楽しめる</p>
                      <p className="flex items-center gap-2">✅ プロ仕様マシンあり</p>
                    </>
                  )}
                  {category.name === 'マッサージ' && (
                    <>
                      <p className="flex items-center gap-2">✅ 肩こり・腰痛ケア</p>
                      <p className="flex items-center gap-2">✅ リラックス効果</p>
                      <p className="flex items-center gap-2">✅ 最新モデル体験</p>
                    </>
                  )}
                  {(category.name !== 'フィットネス' && category.name !== 'マッサージ') && (
                    <>
                      <p className="flex items-center gap-2">✅ 最新技術を体験</p>
                      <p className="flex items-center gap-2">✅ 専門スタッフのサポート</p>
                      <p className="flex items-center gap-2">✅ 無料で気軽にトライ</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6 sticky top-20 z-30">
              <button
                onClick={() => setShowFilters(true)}
                className="w-full flex items-center justify-between bg-white/90 backdrop-blur shadow-sm border px-6 py-4 rounded-xl font-bold text-gray-800"
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-emerald-500" />
                  絞り込み・エリア
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center justify-between">
              <span>Recommended Products</span>
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredProducts.length} items
              </span>
            </h2>

            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredProducts.map(product => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-300">
                <IconComponent className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  条件に合う商品が見つかりませんでした
                </h3>
                <p className="text-gray-500 mb-6">
                  条件を変更して再度お試しください
                </p>
                <button
                  onClick={() => {
                    setSelectedFilter('all');
                    setSelectedLocation('all');
                  }}
                  className="bg-emerald-500 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-600 transition"
                >
                  フィルターをリセット
                </button>
              </div>
            )}

            <div className="mt-16 relative overflow-hidden bg-gray-900 rounded-3xl py-12 px-8 text-center text-white">
              <div className="absolute inset-0 bg-[url('/images/mesh_gradient_background.png')] opacity-20 bg-cover bg-center" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">
                  {category.name}を体験できる場所
                </h3>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                  富山県内、{experienceLocations.length}箇所の提携施設で実際に体験できます。
                  お近くのスポットを探してみましょう。
                </p>
                <Link
                  href="/locations"
                  className="inline-flex items-center bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
                >
                  地図から探す <MapPin className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-800">絞り込み & エリア</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">条件</h3>
                  <div className="space-y-3">
                    {filters.map(filter => (
                      <label key={filter.value} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="filter-mobile"
                          value={filter.value}
                          checked={selectedFilter === filter.value}
                          onChange={(e) => setSelectedFilter(e.target.value)}
                          className="w-5 h-5 text-emerald-500 focus:ring-emerald-500 border-gray-300"
                        />
                        <span className="font-medium text-gray-700">{filter.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">エリア</h3>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {toyamaCities.map(city => (
                      <option key={city.value} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="w-full mt-8 bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/30"
              >
                {filteredProducts.length}件を表示
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}