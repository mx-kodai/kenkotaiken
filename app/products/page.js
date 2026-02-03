'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Filter, Star, Check, X, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import PageHero from '../components/PageHero';
import { products, categories } from '../data/mockData';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExperienceType, setSelectedExperienceType] = useState('all');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Filter products
  let filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category.id !== selectedCategory) {
      return false;
    }
    if (selectedExperienceType !== 'all' && !product.experienceType.includes(selectedExperienceType)) {
      return false;
    }
    return true;
  });

  // Sort products
  if (selectedSort === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  } else if (selectedSort === 'newest') {
    filteredProducts = [...filteredProducts].reverse();
  }

  const experienceTypes = [
    { value: 'all', label: 'すべて' },
    { value: 'visit', label: '店舗体験' },
    { value: 'delivery', label: '配送' },
    { value: 'consultation', label: '相談' },
    { value: 'online', label: 'オンライン' }
  ];

  const sortOptions = [
    { value: 'popular', label: '人気順', icon: TrendingUp },
    { value: 'rating', label: '評価順', icon: Star },
    { value: 'newest', label: '新着順', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Find Your Experience"
        subtitle="体験を探す"
        image="/images/hero-products.png"
        description="気になるカテゴリから探すか、すべての体験から新しい発見を見つけましょう。あなたの健康ライフスタイルにぴったりの体験がここにあります。"
      />

      <div className="container mx-auto px-4 py-16 relative z-20 -mt-10">
        {/* All Products Section */}
        <div>
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-2 bg-emerald-500 rounded-full" />
              <h2 className="text-2xl font-bold text-gray-800">すべての体験一覧</h2>
            </div>
            <span className="text-gray-500 font-medium">{filteredProducts.length} Items</span>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                すべて
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Buttons (Desktop) */}
              <div className="hidden md:flex items-center gap-2 bg-white rounded-xl p-1 border border-gray-200">
                {sortOptions.map(option => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSelectedSort(option.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedSort === option.value
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <Filter className="w-4 h-4" />
                絞り込み
                {selectedExperienceType !== 'all' && (
                  <span className="w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                    1
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
            {filteredProducts.length > 0 ? (
              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="min-w-[160px] md:min-w-0 w-[45%] md:w-auto h-full snap-start flex-shrink-0"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  条件に合う商品が見つかりませんでした
                </h3>
                <p className="text-gray-500 mb-6">
                  条件を変更して再度お試しください
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedExperienceType('all');
                  }}
                  className="bg-emerald-500 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-600 transition"
                >
                  フィルターをリセット
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl py-12 px-8 text-center text-white">
          <div className="absolute inset-0 bg-[url('/images/mesh_gradient_background.png')] opacity-20 bg-cover bg-center" />
          <div className="relative z-10">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-2xl font-bold mb-4">
              どの体験が自分に合うかわからない？
            </h3>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              簡単な質問に答えるだけで、あなたにぴったりの体験をAIが診断します。
            </p>
            <Link
              href="/diagnosis"
              className="inline-flex items-center bg-white text-emerald-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
            >
              無料で診断する
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Overlay */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
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
                <h2 className="text-xl font-bold text-gray-800">絞り込み</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Sort */}
              <div className="mb-8 md:hidden">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">並び順</h3>
                <div className="space-y-2">
                  {sortOptions.map(option => {
                    const Icon = option.icon;
                    return (
                      <label
                        key={option.value}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                          selectedSort === option.value
                            ? 'bg-emerald-50 text-emerald-700 font-bold'
                            : 'hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="sort"
                            value={option.value}
                            checked={selectedSort === option.value}
                            onChange={(e) => setSelectedSort(e.target.value)}
                            className="hidden"
                          />
                          <Icon className="w-4 h-4" />
                          <span>{option.label}</span>
                        </div>
                        {selectedSort === option.value && <Check className="w-4 h-4" />}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Experience Types */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">体験方法</h3>
                <div className="space-y-2">
                  {experienceTypes.map(type => (
                    <label
                      key={type.value}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        selectedExperienceType === type.value
                          ? 'bg-emerald-50 text-emerald-700 font-bold'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="experienceType"
                          value={type.value}
                          checked={selectedExperienceType === type.value}
                          onChange={(e) => setSelectedExperienceType(e.target.value)}
                          className="hidden"
                        />
                        <span>{type.label}</span>
                      </div>
                      {selectedExperienceType === type.value && <Check className="w-4 h-4" />}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/30"
                >
                  {filteredProducts.length}件を表示
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedExperienceType('all');
                  }}
                  className="w-full py-3 text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition"
                >
                  フィルターをクリア
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
