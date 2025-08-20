'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
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
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800">体験商品一覧</h1>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length}件の商品が見つかりました
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="hidden md:block w-64">
            <div className="bg-white rounded-lg p-6 sticky top-20">
              <h2 className="font-semibold text-gray-800 mb-4">絞り込み</h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">カテゴリー</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">すべて</span>
                  </label>
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">体験方法</h3>
                <div className="space-y-2">
                  {experienceTypes.map(type => (
                    <label key={type.value} className="flex items-center">
                      <input
                        type="radio"
                        name="experienceType"
                        value={type.value}
                        checked={selectedExperienceType === type.value}
                        onChange={(e) => setSelectedExperienceType(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedExperienceType('all');
                }}
                className="text-sm text-emerald-600 hover:text-emerald-700"
              >
                フィルターをクリア
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="md:hidden mb-4">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center bg-white px-4 py-2 rounded-lg border"
              >
                <Filter className="h-4 w-4 mr-2" />
                絞り込み
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">該当する商品が見つかりませんでした</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-gray-800">絞り込み</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">カテゴリー</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category-mobile"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">すべて</span>
                </label>
                {categories.map(category => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      name="category-mobile"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">体験方法</h3>
              <div className="space-y-2">
                {experienceTypes.map(type => (
                  <label key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      name="experienceType-mobile"
                      value={type.value}
                      checked={selectedExperienceType === type.value}
                      onChange={(e) => setSelectedExperienceType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition"
            >
              適用する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}