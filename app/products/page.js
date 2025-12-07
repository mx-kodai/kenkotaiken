'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Filter, MapPin, Star, Check, ChevronDown, X, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products, categories, experienceLocations } from '../data/mockData';

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

  // Calculate stats
  const totalProducts = products.length;
  const totalLocations = experienceLocations.length;
  const avgRating = (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
        <div className="absolute inset-0 bg-[url('/images/mesh_gradient_background.png')] opacity-30 bg-cover bg-center" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              すべて無料で体験できます
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Experience Products
            </h1>
            <p className="text-lg text-emerald-50 max-w-2xl">
              富山県内で体験できる健康・ウェルネス商品をご紹介。
              気になる商品を見つけて、購入前に無料でお試しください。
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 md:w-fit bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div className="text-center md:text-left px-4 md:border-r border-white/20">
              <div className="text-2xl font-bold text-white">{totalProducts}</div>
              <div className="text-emerald-100 text-xs md:text-sm">体験商品</div>
            </div>
            <div className="text-center md:text-left px-4 md:border-r border-white/20">
              <div className="text-2xl font-bold text-white">{totalLocations}</div>
              <div className="text-emerald-100 text-xs md:text-sm">体験場所</div>
            </div>
            <div className="text-center md:text-left px-4">
              <div className="text-2xl font-bold text-white">{avgRating}</div>
              <div className="text-emerald-100 text-xs md:text-sm">平均評価</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-14 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">{filteredProducts.length}件の体験</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              {sortOptions.map(option => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedSort(option.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      selectedSort === option.value
                        ? 'bg-white text-gray-900 shadow-sm'
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
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
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

        {/* Active Filters */}
        {(selectedCategory !== 'all' || selectedExperienceType !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-500">適用中:</span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition"
              >
                {categories.find(c => c.id === selectedCategory)?.name}
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedExperienceType !== 'all' && (
              <button
                onClick={() => setSelectedExperienceType('all')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition"
              >
                {experienceTypes.find(t => t.value === selectedExperienceType)?.label}
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedExperienceType('all');
              }}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              すべてクリア
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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

        {/* CTA Section */}
        <div className="mt-16 relative overflow-hidden bg-gray-900 rounded-3xl py-12 px-8 text-center text-white">
          <div className="absolute inset-0 bg-[url('/images/mesh_gradient_background.png')] opacity-20 bg-cover bg-center" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">
              どの体験が自分に合うかわからない？
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              簡単な質問に答えるだけで、あなたにぴったりの体験をAIが診断します。
            </p>
            <Link
              href="/diagnosis"
              className="inline-flex items-center bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
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
