'use client';

/**
 * ランキング機能フック
 * TODO: Supabaseに差し替え予定
 *
 * (ダミー) 実装 - 評価・閲覧数・いいね数を組み合わせたスコア計算
 */

import { useState, useCallback, useMemo } from 'react';
import { products, experienceReports, experienceEvents as events, experienceLocations } from '../data/mockData';

export type RankingPeriod = 'daily' | 'weekly' | 'monthly' | 'all';
export type RankingItemType = 'product' | 'location' | 'event';

interface RankingItem {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  score: number;
  rank: number;
  trend: 'up' | 'down' | 'same';
  trendValue: number;
}

// (ダミー) 閲覧数データ - 本番ではアナリティクスから取得
const viewCounts: Record<string, Record<string, number>> = {
  product: {
    '1': 1250,
    '2': 980,
    '3': 850,
    '4': 720,
    '5': 650,
    '6': 580,
    '7': 520,
    '8': 480,
  },
  location: {
    '1': 890,
    '2': 750,
    '3': 680,
    '4': 620,
  },
  event: {
    '1': 450,
    '2': 380,
    '3': 320,
    '4': 280,
  },
};

// (ダミー) いいね数データ
const likeCounts: Record<string, Record<string, number>> = {
  product: {
    '1': 342,
    '2': 256,
    '3': 198,
    '4': 167,
    '5': 145,
    '6': 123,
    '7': 98,
    '8': 87,
  },
  location: {
    '1': 234,
    '2': 189,
    '3': 145,
    '4': 112,
  },
  event: {
    '1': 156,
    '2': 134,
    '3': 98,
    '4': 76,
  },
};

// (ダミー) トレンドデータ
const trendData: Record<string, { trend: 'up' | 'down' | 'same'; value: number }> = {
  'product-1': { trend: 'up', value: 3 },
  'product-2': { trend: 'same', value: 0 },
  'product-3': { trend: 'up', value: 5 },
  'product-4': { trend: 'down', value: 2 },
  'product-5': { trend: 'up', value: 1 },
  'location-1': { trend: 'up', value: 2 },
  'location-2': { trend: 'down', value: 1 },
  'event-1': { trend: 'up', value: 4 },
  'event-2': { trend: 'same', value: 0 },
};

// スコア計算関数
function calculateScore(
  rating: number,
  reviewCount: number,
  views: number,
  likes: number,
  period: RankingPeriod
): number {
  // 期間による重み付け
  const periodWeight = {
    daily: 1.5,
    weekly: 1.2,
    monthly: 1.0,
    all: 0.8,
  };

  // スコア計算: 評価 * 100 + レビュー数 * 10 + 閲覧数 * 0.1 + いいね数 * 1
  const baseScore = rating * 100 + reviewCount * 10 + views * 0.1 + likes * 1;

  return Math.round(baseScore * periodWeight[period]);
}

export function useRanking(itemType: RankingItemType) {
  const [period, setPeriod] = useState<RankingPeriod>('weekly');

  const rankings = useMemo(() => {
    let items: any[] = [];

    switch (itemType) {
      case 'product':
        items = products;
        break;
      case 'location':
        items = experienceLocations;
        break;
      case 'event':
        items = events.map(e => ({
          ...e,
          name: e.title,
          rating: 4.5, // (ダミー) イベントには評価がないのでデフォルト値
          reviewCount: 10,
        }));
        break;
    }

    // スコア計算してソート
    const scored: RankingItem[] = items.map(item => {
      const id = String(item.id);
      const views = viewCounts[itemType]?.[id] || 0;
      const likes = likeCounts[itemType]?.[id] || 0;
      const score = calculateScore(item.rating, item.reviewCount || 0, views, likes, period);
      const trendInfo = trendData[`${itemType}-${id}`] || { trend: 'same' as const, value: 0 };

      return {
        id: item.id,
        name: item.name,
        category: item.category,
        rating: item.rating,
        reviewCount: item.reviewCount || 0,
        image: item.image || item.images?.[0] || '/images/placeholder.jpg',
        score,
        rank: 0, // 後で設定
        trend: trendInfo.trend,
        trendValue: trendInfo.value,
      };
    });

    // スコア順にソート
    scored.sort((a, b) => b.score - a.score);

    // ランク設定
    scored.forEach((item, index) => {
      item.rank = index + 1;
    });

    return scored;
  }, [itemType, period]);

  const topRankings = useMemo(() => rankings.slice(0, 10), [rankings]);

  const getRankingByCategory = useCallback((category: string) => {
    return rankings.filter(item => item.category === category);
  }, [rankings]);

  return {
    rankings: topRankings,
    allRankings: rankings,
    period,
    setPeriod,
    getRankingByCategory,
  };
}
