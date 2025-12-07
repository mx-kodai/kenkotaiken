'use client';

/**
 * お気に入り・いいね機能フック
 * TODO: Supabaseに差し替え予定
 *
 * (ダミー) 実装 - ローカルストレージベース
 */

import { useState, useEffect, useCallback } from 'react';

type ItemType = 'product' | 'location' | 'event' | 'report';

interface FavoriteItem {
  itemId: string;
  itemType: ItemType;
  addedAt: Date;
}

const FAVORITES_STORAGE_KEY = 'wellnavi_favorites'; // (ダミー)
const LIKES_STORAGE_KEY = 'wellnavi_likes'; // (ダミー)

// お気に入り管理
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        setFavorites([]);
      }
    }
  }, []);

  const saveFavorites = (items: FavoriteItem[]) => {
    setFavorites(items);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
  };

  const isFavorite = useCallback((itemId: string, itemType: ItemType) => {
    return favorites.some(f => f.itemId === itemId && f.itemType === itemType);
  }, [favorites]);

  const toggleFavorite = useCallback((itemId: string, itemType: ItemType) => {
    const exists = favorites.some(f => f.itemId === itemId && f.itemType === itemType);
    let newFavorites: FavoriteItem[];

    if (exists) {
      newFavorites = favorites.filter(f => !(f.itemId === itemId && f.itemType === itemType));
    } else {
      newFavorites = [...favorites, { itemId, itemType, addedAt: new Date() }];
    }

    saveFavorites(newFavorites);
    return !exists; // 新しい状態を返す
  }, [favorites]);

  const getFavoritesByType = useCallback((itemType: ItemType) => {
    return favorites.filter(f => f.itemType === itemType);
  }, [favorites]);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    getFavoritesByType,
    favoriteCount: favorites.length,
  };
}

// いいね管理（ユーザー単位ではなくアイテム単位でカウント）
interface LikeData {
  itemId: string;
  itemType: ItemType;
  count: number;
  userLiked: boolean;
}

// 共有ストレージアクセス用のヘルパー
const getLikesFromStorage = (): Map<string, LikeData> => {
  if (typeof window === 'undefined') return new Map();
  const stored = localStorage.getItem(LIKES_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return new Map(Object.entries(parsed));
    } catch (e) {
      return new Map();
    }
  }
  return new Map();
};

const saveLikesToStorage = (data: Map<string, LikeData>) => {
  const obj = Object.fromEntries(data);
  localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(obj));
};

// アイテム固定型useLikes（ページで使用）
export function useLikes(itemId?: string, itemType?: ItemType) {
  const [likesData, setLikesData] = useState<Map<string, LikeData>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLikesData(getLikesFromStorage());
    setIsLoading(false);
  }, []);

  const getKey = (id: string, type: ItemType) => `${type}-${id}`;

  // itemId/itemTypeが渡された場合、そのアイテム固有の状態を返す
  const currentKey = itemId && itemType ? getKey(itemId, itemType) : null;
  const currentData = currentKey ? likesData.get(currentKey) : null;

  const getLikeCount = useCallback((id?: string, type?: ItemType) => {
    const targetId = id || itemId;
    const targetType = type || itemType;
    if (!targetId || !targetType) return 0;
    const key = getKey(targetId, targetType);
    return likesData.get(key)?.count || 0;
  }, [likesData, itemId, itemType]);

  const isLiked = useCallback((id?: string, type?: ItemType): boolean => {
    const targetId = id || itemId;
    const targetType = type || itemType;
    if (!targetId || !targetType) return false;
    const key = getKey(targetId, targetType);
    return likesData.get(key)?.userLiked || false;
  }, [likesData, itemId, itemType]);

  const toggleLike = useCallback((id?: string, type?: ItemType, initialCount: number = 0) => {
    const targetId = id || itemId;
    const targetType = type || itemType;
    if (!targetId || !targetType) return false;

    const key = getKey(targetId, targetType);
    const current = likesData.get(key) || { itemId: targetId, itemType: targetType, count: initialCount, userLiked: false };

    const newData = new Map(likesData);
    if (current.userLiked) {
      newData.set(key, { ...current, count: Math.max(0, current.count - 1), userLiked: false });
    } else {
      newData.set(key, { ...current, count: current.count + 1, userLiked: true });
    }

    setLikesData(newData);
    saveLikesToStorage(newData);
    return !current.userLiked;
  }, [likesData, itemId, itemType]);

  // アイテム固定の場合は直接値を、そうでない場合は関数を返す
  if (itemId && itemType) {
    return {
      isLiked: currentData?.userLiked || false,
      likeCount: currentData?.count || 0,
      toggleLike: () => toggleLike(),
      isLoading,
      // 関数版も残す（reports/[id]用）
      getLikeCount,
    };
  }

  return {
    getLikeCount,
    isLiked,
    toggleLike,
    isLoading,
  };
}
