'use client';

/**
 * 検索・フィルター・ソートフック
 * TODO: Supabaseに差し替え予定
 *
 * (ダミー) 実装 - mockDataベース
 */

import { useState, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { products, experienceLocations, experienceEvents as events, categories, concerns } from '../data/mockData';

export interface SearchFilters {
  query: string;
  category: string;
  experienceType: string;
  area: string;
  priceRange: string;
  rating: string;
  sortBy: 'rating' | 'newest' | 'popular' | 'recommended';
}

const defaultFilters: SearchFilters = {
  query: '',
  category: 'all',
  experienceType: 'all',
  area: 'all',
  priceRange: 'all',
  rating: 'all',
  sortBy: 'recommended',
};

export function useSearch<T>(
  dataSource: T[],
  filterFn: (item: T, filters: SearchFilters) => boolean,
  sortFn: (a: T, b: T, sortBy: SearchFilters['sortBy']) => number
) {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const filteredAndSorted = useMemo(() => {
    let results = dataSource.filter(item => filterFn(item, filters));

    results.sort((a, b) => sortFn(a, b, filters.sortBy));

    return results;
  }, [dataSource, filters, filterFn, sortFn]);

  const paginatedResults = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredAndSorted.slice(start, start + itemsPerPage);
  }, [filteredAndSorted, page]);

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

  const updateFilter = useCallback((key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // フィルター変更時はページをリセット
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setPage(1);
  }, []);

  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    results: paginatedResults,
    totalResults: filteredAndSorted.length,
    page,
    setPage,
    totalPages,
    hasMore: page < totalPages,
  };
}

// 商品検索用フィルター関数
export function productFilterFn(product: typeof products[0], filters: SearchFilters): boolean {
  // キーワード検索
  if (filters.query) {
    const q = filters.query.toLowerCase();
    const matches =
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.category.name.toLowerCase().includes(q);
    if (!matches) return false;
  }

  // カテゴリ
  if (filters.category !== 'all' && product.category.slug !== filters.category) {
    return false;
  }

  // 体験方法
  if (filters.experienceType !== 'all' && !product.experienceType.includes(filters.experienceType as any)) {
    return false;
  }

  // 評価フィルター
  if (filters.rating !== 'all') {
    const minRating = parseFloat(filters.rating);
    if (product.rating < minRating) return false;
  }

  return true;
}

// 商品ソート関数
export function productSortFn(a: typeof products[0], b: typeof products[0], sortBy: SearchFilters['sortBy']): number {
  switch (sortBy) {
    case 'rating':
      return b.rating - a.rating;
    case 'newest':
      return b.id.localeCompare(a.id);
    case 'popular':
      return b.reviews.length - a.reviews.length;
    case 'recommended':
    default:
      // 評価とレビュー数の組み合わせ
      return (b.rating * b.reviews.length) - (a.rating * a.reviews.length);
  }
}

// 場所検索用フィルター関数
export function locationFilterFn(location: typeof experienceLocations[0], filters: SearchFilters): boolean {
  if (filters.query) {
    const q = filters.query.toLowerCase();
    const matches =
      location.name.toLowerCase().includes(q) ||
      location.city.toLowerCase().includes(q);
    if (!matches) return false;
  }

  if (filters.area !== 'all' && location.city !== filters.area) {
    return false;
  }

  if (filters.rating !== 'all') {
    const minRating = parseFloat(filters.rating);
    if (location.rating < minRating) return false;
  }

  return true;
}

// 場所ソート関数
export function locationSortFn(a: typeof experienceLocations[0], b: typeof experienceLocations[0], sortBy: SearchFilters['sortBy']): number {
  switch (sortBy) {
    case 'rating':
      return b.rating - a.rating;
    case 'newest':
      return b.id.localeCompare(a.id);
    case 'popular':
      return b.reviews.length - a.reviews.length;
    default:
      return (b.rating * b.reviews.length) - (a.rating * a.reviews.length);
  }
}

// イベント検索用フィルター関数
export function eventFilterFn(event: typeof events[0], filters: SearchFilters): boolean {
  if (filters.query) {
    const q = filters.query.toLowerCase();
    const matches =
      event.title.toLowerCase().includes(q) ||
      event.description.toLowerCase().includes(q);
    if (!matches) return false;
  }

  if (filters.category !== 'all') {
    // イベントの商品に該当カテゴリが含まれているか確認
    const hasCategory = event.products.some(p => p.category.slug === filters.category);
    if (!hasCategory) return false;
  }

  return true;
}

// イベントソート関数
export function eventSortFn(a: typeof events[0], b: typeof events[0], sortBy: SearchFilters['sortBy']): number {
  switch (sortBy) {
    case 'newest':
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    case 'popular':
      return b.capacity - a.capacity;
    default:
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime(); // 近い日程順
  }
}

// 統合検索（複数データソース横断）
export function useGlobalSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const search = useCallback((searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }, [router]);

  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];

    const q = query.toLowerCase();
    const results: { type: string; name: string; id: string | number }[] = [];

    // 商品から検索
    products.filter(p => p.name.toLowerCase().includes(q)).slice(0, 3).forEach(p => {
      results.push({ type: 'product', name: p.name, id: p.id });
    });

    // 場所から検索
    experienceLocations.filter(l => l.name.toLowerCase().includes(q)).slice(0, 2).forEach(l => {
      results.push({ type: 'location', name: l.name, id: l.id });
    });

    // イベントから検索
    events.filter(e => e.title.toLowerCase().includes(q)).slice(0, 2).forEach(e => {
      results.push({ type: 'event', name: e.title, id: e.id });
    });

    return results;
  }, [query]);

  return {
    query,
    setQuery,
    search,
    suggestions,
  };
}
