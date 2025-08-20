'use client';

import { useState } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { categories } from '../data/mockData';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
  placeholder?: string;
}

export default function SearchFilter({ onSearch, onFilter, placeholder = "商品名や悩みで検索..." }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    experienceType: '',
    priceRange: '',
  });

  const toyamaCities = [
    '富山市', '高岡市', '射水市', '魚津市', '氷見市', 
    '黒部市', '砺波市', '南砺市', '滑川市', '立山町'
  ];

  const experienceTypes = [
    { value: 'visit', label: '店舗体験' },
    { value: 'delivery', label: '配送' },
    { value: 'consultation', label: '相談' },
    { value: 'online', label: 'オンライン' }
  ];

  const priceRanges = [
    { value: 'free', label: '無料' },
    { value: 'low', label: '1万円以下' },
    { value: 'medium', label: '1万円〜5万円' },
    { value: 'high', label: '5万円以上' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      category: '',
      city: '',
      experienceType: '',
      priceRange: '',
    };
    setFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition font-medium"
          >
            検索
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            <Filter className="h-4 w-4" />
            詳細検索
          </button>
        </div>
      </form>

      {showFilters && (
        <div className="border-t pt-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カテゴリー
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">すべて</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                富山県内の地域
              </label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">すべて</option>
                {toyamaCities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                体験方法
              </label>
              <select
                value={filters.experienceType}
                onChange={(e) => handleFilterChange('experienceType', e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">すべて</option>
                {experienceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                価格帯
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">すべて</option>
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              フィルターをクリア
            </button>

            <div className="text-xs text-gray-500">
              富山県民の方には特別特典をご用意しています
            </div>
          </div>
        </div>
      )}
    </div>
  );
}