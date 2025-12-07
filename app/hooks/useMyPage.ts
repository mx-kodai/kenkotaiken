/**
 * マイページ用フック
 * ユーザーのダッシュボードデータを一元管理
 *
 * (ダミー) このフックはローカルストレージとモックデータを使用
 * 本番ではSupabaseからデータ取得に差し替え
 */

import { useState, useEffect, useCallback } from 'react';
import { products, experienceLocations, experienceEvents as events } from '../data/mockData';

// ============================================
// (ダミー) 型定義
// ============================================

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  phone?: string;
  prefecture?: string;
  bio?: string;
  // 会員ステータス
  memberRank: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  points: number;
  // 健康関連
  healthConcerns: string[];
  wellnessScore?: number;
  // 通知設定
  notifications: {
    email: boolean;
    push: boolean;
    newsletter: boolean;
  };
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface MyReservation {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  providerName: string;
  date: Date;
  timeSlot: {
    start: string;
    end: string;
  };
  numberOfPeople: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  confirmationCode: string;
  location: string;
  totalPrice: number;
  createdAt: Date;
  // レビュー済みかどうか
  hasReviewed: boolean;
}

export interface MyFavorite {
  id: string;
  itemId: string;
  itemType: 'product' | 'location' | 'event';
  itemName: string;
  itemImage: string;
  itemRating: number;
  itemCategory: string;
  addedAt: Date;
}

export interface ViewHistory {
  id: string;
  itemId: string;
  itemType: 'product' | 'location' | 'event';
  itemName: string;
  itemImage: string;
  viewedAt: Date;
}

export interface DiagnosisHistory {
  id: string;
  completedAt: Date;
  resultType: string;
  resultTitle: string;
  wellnessScore: number;
  recommendations: string[];
}

export interface DashboardStats {
  upcomingReservations: number;
  totalFavorites: number;
  wellnessScore: number;
  totalPoints: number;
  completedExperiences: number;
  reviewsWritten: number;
}

// ============================================
// (ダミー) デモデータ
// ============================================

const DEMO_USER: UserProfile = {
  id: 'demo-user-001',
  email: 'demo@wellnavi.jp',
  displayName: 'デモ太郎',
  avatar: '/images/avatars/demo-user.jpg',
  phone: '090-1234-5678',
  prefecture: '富山県',
  bio: '健康的な生活を目指しています！',
  memberRank: 'Gold',
  points: 1250,
  healthConcerns: ['肩こり', 'ストレス', '睡眠'],
  wellnessScore: 85,
  notifications: {
    email: true,
    push: true,
    newsletter: true,
  },
  createdAt: new Date('2024-06-01'),
  lastLoginAt: new Date(),
};

const DEMO_RESERVATIONS: MyReservation[] = [
  {
    id: 'WN-20250115-0001',
    productId: '1',
    productName: '最新AIヘルスチェック体験',
    productImage: '/images/products/health-check.jpg',
    providerName: '富山ウェルネスセンター',
    date: new Date('2025-01-20'),
    timeSlot: { start: '10:00', end: '11:30' },
    numberOfPeople: 1,
    status: 'confirmed',
    confirmationCode: '1234',
    location: '富山県富山市〇〇町1-2-3',
    totalPrice: 0,
    createdAt: new Date('2025-01-10'),
    hasReviewed: false,
  },
  {
    id: 'WN-20250112-0002',
    productId: '2',
    productName: '森林ヨガ体験',
    productImage: '/images/products/yoga.jpg',
    providerName: '立山森の家',
    date: new Date('2025-01-25'),
    timeSlot: { start: '09:00', end: '12:00' },
    numberOfPeople: 2,
    status: 'pending',
    confirmationCode: '5678',
    location: '富山県中新川郡立山町〇〇',
    totalPrice: 0,
    createdAt: new Date('2025-01-12'),
    hasReviewed: false,
  },
  {
    id: 'WN-20241220-0003',
    productId: '3',
    productName: '温泉リラクゼーション',
    productImage: '/images/products/onsen.jpg',
    providerName: '宇奈月温泉旅館',
    date: new Date('2024-12-20'),
    timeSlot: { start: '14:00', end: '16:00' },
    numberOfPeople: 2,
    status: 'completed',
    confirmationCode: '9012',
    location: '富山県黒部市宇奈月温泉',
    totalPrice: 0,
    createdAt: new Date('2024-12-10'),
    hasReviewed: true,
  },
];

const DEMO_FAVORITES: MyFavorite[] = products.slice(0, 5).map((p, i) => ({
  id: `fav-${i + 1}`,
  itemId: String(p.id),
  itemType: 'product' as const,
  itemName: p.name,
  itemImage: p.images[0],
  itemRating: p.rating,
  itemCategory: p.category.name,
  addedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
}));

const DEMO_VIEW_HISTORY: ViewHistory[] = products.slice(0, 10).map((p, i) => ({
  id: `view-${i + 1}`,
  itemId: String(p.id),
  itemType: 'product' as const,
  itemName: p.name,
  itemImage: p.images[0],
  viewedAt: new Date(Date.now() - i * 2 * 60 * 60 * 1000),
}));

const DEMO_DIAGNOSIS_HISTORY: DiagnosisHistory[] = [
  {
    id: 'diag-001',
    completedAt: new Date('2025-01-05'),
    resultType: 'relaxation',
    resultTitle: 'リラクゼーション重視タイプ',
    wellnessScore: 85,
    recommendations: ['ヘッドスパ', 'アロマテラピー', '温泉'],
  },
  {
    id: 'diag-002',
    completedAt: new Date('2024-12-15'),
    resultType: 'fitness',
    resultTitle: 'アクティブ運動タイプ',
    wellnessScore: 78,
    recommendations: ['ヨガ', 'ストレッチ', 'フィットネス'],
  },
];

// ============================================
// ストレージキー
// ============================================

const STORAGE_KEYS = {
  FAVORITES: 'wellnavi_favorites',
  VIEW_HISTORY: 'wellnavi_view_history',
  RESERVATIONS: 'wellnavi_reservations',
  DIAGNOSIS: 'wellnavi_diagnosis_history',
} as const;

// ============================================
// メインフック
// ============================================

export function useMyPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [reservations, setReservations] = useState<MyReservation[]>([]);
  const [favorites, setFavorites] = useState<MyFavorite[]>([]);
  const [viewHistory, setViewHistory] = useState<ViewHistory[]>([]);
  const [diagnosisHistory, setDiagnosisHistory] = useState<DiagnosisHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 初期データ読み込み
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // (ダミー) ローカルストレージから読み込み、なければデモデータ
        const storedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        const storedHistory = localStorage.getItem(STORAGE_KEYS.VIEW_HISTORY);
        const storedReservations = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
        const storedDiagnosis = localStorage.getItem(STORAGE_KEYS.DIAGNOSIS);

        // デモユーザーをセット
        setUser(DEMO_USER);

        // お気に入り
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        } else {
          setFavorites(DEMO_FAVORITES);
        }

        // 閲覧履歴
        if (storedHistory) {
          setViewHistory(JSON.parse(storedHistory));
        } else {
          setViewHistory(DEMO_VIEW_HISTORY);
        }

        // 予約
        if (storedReservations) {
          setReservations(JSON.parse(storedReservations));
        } else {
          setReservations(DEMO_RESERVATIONS);
        }

        // 診断履歴
        if (storedDiagnosis) {
          setDiagnosisHistory(JSON.parse(storedDiagnosis));
        } else {
          setDiagnosisHistory(DEMO_DIAGNOSIS_HISTORY);
        }

      } catch (err) {
        setError('データの読み込みに失敗しました');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // ダッシュボード統計
  const stats: DashboardStats = {
    upcomingReservations: reservations.filter(
      r => r.status !== 'cancelled' && r.status !== 'completed' && new Date(r.date) >= new Date()
    ).length,
    totalFavorites: favorites.length,
    wellnessScore: user?.wellnessScore || 0,
    totalPoints: user?.points || 0,
    completedExperiences: reservations.filter(r => r.status === 'completed').length,
    reviewsWritten: reservations.filter(r => r.hasReviewed).length,
  };

  // 次回の予約を取得
  const getUpcomingReservations = useCallback(() => {
    return reservations
      .filter(r => r.status !== 'cancelled' && new Date(r.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [reservations]);

  // 過去の予約を取得
  const getPastReservations = useCallback(() => {
    return reservations
      .filter(r => r.status === 'completed' || new Date(r.date) < new Date())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [reservations]);

  // 予約キャンセル
  const cancelReservation = useCallback(async (reservationId: string) => {
    setReservations(prev => {
      const updated = prev.map(r =>
        r.id === reservationId ? { ...r, status: 'cancelled' as const } : r
      );
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // お気に入り削除
  const removeFavorite = useCallback(async (favoriteId: string) => {
    setFavorites(prev => {
      const updated = prev.filter(f => f.id !== favoriteId);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 閲覧履歴追加
  const addToViewHistory = useCallback((item: Omit<ViewHistory, 'id' | 'viewedAt'>) => {
    setViewHistory(prev => {
      // 同じアイテムがあれば削除して先頭に追加
      const filtered = prev.filter(h => !(h.itemId === item.itemId && h.itemType === item.itemType));
      const newHistory: ViewHistory = {
        ...item,
        id: `view-${Date.now()}`,
        viewedAt: new Date(),
      };
      const updated = [newHistory, ...filtered].slice(0, 50); // 最大50件
      localStorage.setItem(STORAGE_KEYS.VIEW_HISTORY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 閲覧履歴クリア
  const clearViewHistory = useCallback(() => {
    setViewHistory([]);
    localStorage.removeItem(STORAGE_KEYS.VIEW_HISTORY);
  }, []);

  // プロフィール更新
  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    // (ダミー) 本番ではSupabaseに保存
    console.log('(ダミー) プロフィール更新:', updated);
  }, [user]);

  // 通知設定更新
  const updateNotificationSettings = useCallback(async (settings: UserProfile['notifications']) => {
    if (!user) return;
    const updated = { ...user, notifications: settings };
    setUser(updated);
    console.log('(ダミー) 通知設定更新:', settings);
  }, [user]);

  return {
    // データ
    user,
    reservations,
    favorites,
    viewHistory,
    diagnosisHistory,
    stats,
    // 状態
    isLoading,
    error,
    // メソッド
    getUpcomingReservations,
    getPastReservations,
    cancelReservation,
    removeFavorite,
    addToViewHistory,
    clearViewHistory,
    updateProfile,
    updateNotificationSettings,
  };
}

// ============================================
// 通知用フック
// ============================================

export interface Notification {
  id: string;
  type: 'reservation' | 'review' | 'system' | 'promotion';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // (ダミー) デモ通知
    const demoNotifications: Notification[] = [
      {
        id: 'notif-1',
        type: 'reservation',
        title: '予約確定のお知らせ',
        message: '1月20日の「最新AIヘルスチェック体験」の予約が確定しました。',
        link: '/mypage?tab=reservations',
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: 'notif-2',
        type: 'promotion',
        title: '期間限定キャンペーン',
        message: '今月末まで、対象体験が20%OFF！',
        link: '/products',
        isRead: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: 'notif-3',
        type: 'system',
        title: 'レビュー投稿のお願い',
        message: '先日の体験はいかがでしたか？レビューを投稿してポイントを獲得しましょう。',
        link: '/mypage?tab=reservations',
        isRead: true,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    ];

    setNotifications(demoNotifications);
    setUnreadCount(demoNotifications.filter(n => !n.isRead).length);
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}

// ============================================
// おすすめ取得用フック
// ============================================

export function useRecommendations(userId?: string) {
  const [recommendations, setRecommendations] = useState<typeof products>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // (ダミー) ユーザーの履歴・診断結果に基づくおすすめ
    // 本番ではAIレコメンドエンジンを使用

    const getRecommendations = async () => {
      setIsLoading(true);

      // デモ: ランダムに5件選択
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      setRecommendations(shuffled.slice(0, 5));

      setIsLoading(false);
    };

    getRecommendations();
  }, [userId]);

  return { recommendations, isLoading };
}
