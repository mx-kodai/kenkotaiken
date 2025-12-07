'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, MapPin, Star, Heart, Tag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, experienceLocations, categories } from '../data/mockData';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [results, setResults] = useState([]);

  const performSearch = useCallback(() => {
    let filteredProducts = products;

    // テキスト検索
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // カテゴリフィルター
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.category.slug === selectedCategory
      );
    }

    setResults(filteredProducts);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    }
  }, [performSearch, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">検索結果</h1>
            <p className="text-lg text-white/90 mb-8">
              あなたにぴったりの健康体験を見つけましょう
            </p>

            <form onSubmit={handleSearch} className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="商品名や悩みで検索..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="bg-white text-emerald-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                検索
              </button>
            </form>

            {searchParams.get('q') && (
              <p className="text-white/80">
                「{searchParams.get('q')}」の検索結果: {results.length}件
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                絞り込み
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリー
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">すべて</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
              <h3 className="font-semibold mb-4">人気のキーワード</h3>
              <div className="flex flex-wrap gap-2">
                {['マッサージチェア', '睡眠改善', 'フィットネス', '肩こり', '腰痛', 'ダイエット'].map(keyword => (
                  <button
                    key={keyword}
                    onClick={() => setSearchQuery(keyword)}
                    className="text-xs bg-gray-100 hover:bg-emerald-100 text-gray-700 px-3 py-1 rounded-full transition"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            {results.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  検索結果が見つかりませんでした
                </h3>
                <p className="text-gray-600 mb-6">
                  別のキーワードで検索してみてください
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">おすすめの検索ワード：</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['健康', 'マッサージ', 'フィットネス', '睡眠'].map(word => (
                      <button
                        key={word}
                        onClick={() => setSearchQuery(word)}
                        className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-200 transition"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  検索キーワードを入力してください
                </h3>
                <p className="text-gray-600">
                  商品名や悩みで検索できます
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}