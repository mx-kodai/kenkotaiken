'use client';

/**
 * レビュー・コメント機能フック
 * TODO: Supabaseに差し替え予定
 *
 * (ダミー) 実装 - ローカルストレージベース
 */

import { useState, useCallback, useEffect } from 'react';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  itemId: string;
  itemType: 'product' | 'location' | 'event';
  rating: number;
  title: string;
  content: string;
  helpful: number;
  createdAt: Date;
}

export interface ReviewFormData {
  itemId: string;
  itemType: 'product' | 'location' | 'event';
  rating: number;
  title: string;
  content: string;
}

const REVIEWS_STORAGE_KEY = 'wellnavi_reviews'; // (ダミー)
const HELPFUL_STORAGE_KEY = 'wellnavi_helpful_votes'; // (ダミー)

// 初期ダミーレビュー
const initialReviews: Review[] = [
  {
    id: 'review-init-1',
    userId: 'user-1',
    userName: '田中花子',
    userAvatar: '/images/avatars/user1.jpg',
    itemId: '1',
    itemType: 'product',
    rating: 5,
    title: '素晴らしい体験でした！',
    content: '初めての血圧計体験でしたが、スタッフの方が丁寧に使い方を教えてくれました。自分の健康状態がすぐにわかるのが良いですね。毎日の健康管理に役立てたいと思います。',
    helpful: 24,
    createdAt: new Date('2024-11-15'),
  },
  {
    id: 'review-init-2',
    userId: 'user-2',
    userName: '佐藤健一',
    itemId: '1',
    itemType: 'product',
    rating: 4,
    title: '家族みんなで使えます',
    content: '操作が簡単で、高齢の両親でも問題なく使えました。購入を検討しています。',
    helpful: 18,
    createdAt: new Date('2024-11-10'),
  },
  {
    id: 'review-init-3',
    userId: 'user-3',
    userName: '山田美咲',
    itemId: '2',
    itemType: 'product',
    rating: 5,
    title: 'リラックスできました',
    content: 'マッサージチェアの体験をしました。思っていた以上に気持ちよく、体の疲れがとれました。',
    helpful: 12,
    createdAt: new Date('2024-11-08'),
  },
];

export function useReviews(itemId: string, itemType: Review['itemType']) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // レビュー読み込み
  useEffect(() => {
    const loadReviews = () => {
      const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
      let allReviews: Review[] = [];

      if (stored) {
        try {
          allReviews = JSON.parse(stored);
        } catch {
          allReviews = [];
        }
      }

      // 初期レビューがなければ追加
      if (allReviews.length === 0) {
        allReviews = initialReviews;
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(allReviews));
      }

      // 該当アイテムのレビューをフィルタリング
      const filtered = allReviews
        .filter(r => r.itemId === itemId && r.itemType === itemType)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setReviews(filtered);
      setIsLoading(false);
    };

    loadReviews();
  }, [itemId, itemType]);

  // レビュー投稿
  const submitReview = useCallback(async (data: ReviewFormData, userName: string): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      // バリデーション
      if (data.rating < 1 || data.rating > 5) {
        throw new Error('評価を選択してください');
      }
      if (!data.title.trim()) {
        throw new Error('タイトルを入力してください');
      }
      if (!data.content.trim()) {
        throw new Error('レビュー内容を入力してください');
      }

      // (ダミー) APIコール遅延をシミュレート
      await new Promise(resolve => setTimeout(resolve, 800));

      const newReview: Review = {
        id: `review-${Date.now()}`,
        userId: `user-${Date.now()}`,
        userName,
        itemId: data.itemId,
        itemType: data.itemType,
        rating: data.rating,
        title: data.title,
        content: data.content,
        helpful: 0,
        createdAt: new Date(),
      };

      // ストレージに保存
      const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
      const allReviews = stored ? JSON.parse(stored) : initialReviews;
      allReviews.push(newReview);
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(allReviews));

      // 状態更新
      setReviews(prev => [newReview, ...prev]);
      setIsSubmitting(false);

      console.log('[ダミー] レビュー投稿完了:', newReview);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'レビュー投稿に失敗しました';
      setError(errorMessage);
      setIsSubmitting(false);
      return false;
    }
  }, []);

  // 「参考になった」投票
  const voteHelpful = useCallback(async (reviewId: string): Promise<boolean> => {
    // 投票済みチェック
    const votedKey = `${HELPFUL_STORAGE_KEY}_${reviewId}`;
    if (localStorage.getItem(votedKey)) {
      return false; // 既に投票済み
    }

    // レビューの helpful をインクリメント
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (stored) {
      const allReviews: Review[] = JSON.parse(stored);
      const updated = allReviews.map(r =>
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
      );
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));

      // 投票済みマーク
      localStorage.setItem(votedKey, 'true');

      // 状態更新
      setReviews(prev => prev.map(r =>
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
      ));
    }

    return true;
  }, []);

  // 投票済みかチェック
  const hasVotedHelpful = useCallback((reviewId: string): boolean => {
    return !!localStorage.getItem(`${HELPFUL_STORAGE_KEY}_${reviewId}`);
  }, []);

  // 平均評価を計算
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return {
    reviews,
    isLoading,
    isSubmitting,
    error,
    submitReview,
    voteHelpful,
    hasVotedHelpful,
    averageRating,
    reviewCount: reviews.length,
  };
}
