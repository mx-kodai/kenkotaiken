'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import PageHero from '../components/PageHero';
import { products, categories } from '../data/mockData';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExperienceType, setSelectedExperienceType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category.id !== selectedCategory) {
      return false;
    }
    if (selectedExperienceType !== 'all' && !product.experienceType.includes(selectedExperienceType)) {
      return false;
    }
    return true;
  });

  const experienceTypes = [
    { value: 'all', label: 'すべて' },
    { value: 'visit', label: '店舗体験' },
    { value: 'delivery', label: '配送' },
    { value: 'consultation', label: '相談' },
    { value: 'online', label: 'オンライン' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PageHero
        title="Experience Products"
        subtitle="体験商品一覧"
        image="/images/hero-products.png"
        description="あなたにぴったりの健康体験を見つけましょう。AI診断に基づいた最適なプランから、人気の定番商品まで幅広く取り揃えています。"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/20">
                <div className="flex items-center gap-2 mb-6 text-gray-800 font-bold border-b pb-4">
                  <Filter className="w-5 h-5" />
                  絞り込み
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">カテゴリー</h3>
                  <div className="space-y-2">
                    <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${selectedCategory === 'all' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-gray-50 text-gray-600'}`}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value="all"
                          checked={selectedCategory === 'all'}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="hidden"
                        />
                        <span>すべて</span>
                      </div>
                      {selectedCategory === 'all' && <Check className="w-4 h-4" />}
                    </label>
                    {categories.map(category => (
                      <label key={category.id} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${selectedCategory === String(category.id) ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-gray-50 text-gray-600'}`}>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value={category.id}
                            checked={selectedCategory === String(category.id)}
                            onChange={(e) => setSelectedCategory(String(e.target.value))} // Ensure value is treated appropriately
                            className="hidden"
                          />
                          <span>{category.name}</span>
                        </div>
                        {selectedCategory === String(category.id) && <Check className="w-4 h-4" />}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Types */}
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">体験方法</h3>
                  <div className="space-y-2">
                    {experienceTypes.map(type => (
                      <label key={type.value} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${selectedExperienceType === type.value ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-gray-50 text-gray-600'}`}>
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

                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedExperienceType('all');
                  }}
                  className="w-full mt-8 py-3 text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition"
                >
                  フィルターをクリア
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6 sticky top-20 z-30">
              <button
                onClick={() => setShowFilters(true)}
                className="w-full flex items-center justify-between bg-white/90 backdrop-blur shadow-sm border px-6 py-4 rounded-xl font-bold text-gray-800"
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-emerald-500" />
                  絞り込み条件
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Product Grid */}
            <motion.div
              layout
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-300">
                <p className="text-xl font-bold text-gray-800 mb-2">該当する商品が見つかりませんでした</p>
                <p className="text-gray-500">条件を変更して再度お試しください</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedExperienceType('all');
                  }}
                  className="mt-6 px-6 py-2 bg-emerald-50 text-emerald-600 font-bold rounded-full hover:bg-emerald-100 transition"
                >
                  すべての商品を表示
                </button>
              </div>
            )}
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
                <h2 className="text-xl font-bold text-gray-800">絞り込み</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Categories */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">カテゴリー</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="category-mobile"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-5 h-5 text-emerald-500 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="font-medium text-gray-700">すべて</span>
                  </label>
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="category-mobile"
                        value={category.id}
                        checked={selectedCategory === String(category.id)}
                        onChange={(e) => setSelectedCategory(String(e.target.value))}
                        className="w-5 h-5 text-emerald-500 focus:ring-emerald-500 border-gray-300"
                      />
                      <span className="font-medium text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Experience Types */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">体験方法</h3>
                <div className="space-y-3">
                  {experienceTypes.map(type => (
                    <label key={type.value} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="experienceType-mobile"
                        value={type.value}
                        checked={selectedExperienceType === type.value}
                        onChange={(e) => setSelectedExperienceType(e.target.value)}
                        className="w-5 h-5 text-emerald-500 focus:ring-emerald-500 border-gray-300"
                      />
                      <span className="font-medium text-gray-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/30"
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