/**
 * ダミーデータベース層
 * TODO: Supabaseに差し替え予定
 *
 * このファイルはダミー実装です。
 * 本番環境ではSupabaseクライアントに置き換えてください。
 */

import { products, experienceReports, experienceLocations, experienceEvents as events } from '../data/mockData';

// ============================================
// (ダミー) ユーザーデータ
// ============================================
export interface User {
  id: string;
  email: string;
  password: string; // (ダミー) 本番ではハッシュ化必須
  name: string;
  avatar?: string;
  createdAt: Date;
}

// (ダミー) ユーザーストレージ
// ========================================
// デバッグ用ログイン情報:
//   demo@wellnavi.jp / demo1234
//   test@wellnavi.jp / test1234
// ========================================
const dummyUsers: User[] = [
  {
    id: 'dummy-user-001',
    email: 'demo@wellnavi.jp',
    password: 'demo1234', // (ダミー) 本番ではbcryptハッシュ必須
    name: 'ダミー太郎',
    avatar: '/images/avatars/dummy-user-1.jpg',
    createdAt: new Date('2024-06-01'),
  },
  {
    id: 'dummy-user-002',
    email: 'test@wellnavi.jp',
    password: 'test1234', // (ダミー)
    name: 'ダミー花子',
    avatar: '/images/avatars/dummy-user-2.jpg',
    createdAt: new Date('2024-09-15'),
  },
];

// ============================================
// (ダミー) お気に入りデータ
// ============================================
export interface Favorite {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'product' | 'location' | 'event' | 'report';
  createdAt: Date;
}

const dummyFavorites: Favorite[] = [];

// ============================================
// (ダミー) いいねデータ
// ============================================
export interface Like {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'product' | 'location' | 'event' | 'report';
  createdAt: Date;
}

const dummyLikes: Like[] = [];

// ============================================
// (ダミー) レビュー・コメントデータ
// ============================================
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

// (ダミー) レビューサンプルデータ
const dummyReviews: Review[] = [
  {
    id: 'dummy-review-001',
    userId: 'dummy-user-001',
    userName: 'ダミー太郎',
    userAvatar: '/images/avatars/dummy-user-1.jpg',
    itemId: 'prod-1',
    itemType: 'product',
    rating: 5,
    title: '(ダミー) 着るだけで姿勢が良くなった！',
    content: '(ダミー) リライブシャツを1週間着用しました。デスクワークで肩こりがひどかったのですが、着用3日目くらいから楽になってきました。特殊加工の効果なのか、自然と姿勢が良くなる感じがします。',
    helpful: 24,
    createdAt: new Date('2024-12-01'),
  },
  {
    id: 'dummy-review-002',
    userId: 'dummy-user-002',
    userName: 'ダミー花子',
    userAvatar: '/images/avatars/dummy-user-2.jpg',
    itemId: 'prod-1',
    itemType: 'product',
    rating: 4,
    title: '(ダミー) 家族全員で愛用しています',
    content: '(ダミー) 主人にプレゼントしたところ、とても気に入ってくれました。今では家族3人で着用しています。洗濯しても効果が落ちないのが嬉しいです。',
    helpful: 18,
    createdAt: new Date('2024-12-05'),
  },
  {
    id: 'dummy-review-003',
    userId: 'dummy-user-001',
    userName: 'ダミー太郎',
    itemId: 'prod-3',
    itemType: 'product',
    rating: 5,
    title: '(ダミー) 睡眠の質が劇的に改善',
    content: '(ダミー) アルファネス2を寝る前に使い始めて2週間。以前は夜中に何度も目が覚めていましたが、今では朝までぐっすり眠れています。朝の目覚めもスッキリ！',
    helpful: 31,
    createdAt: new Date('2024-11-20'),
  },
  {
    id: 'dummy-review-004',
    userId: 'dummy-user-002',
    userName: 'ダミー花子',
    itemId: 'prod-7',
    itemType: 'product',
    rating: 5,
    title: '(ダミー) プロの施術に感動',
    content: '(ダミー) 無料体験なのにここまで丁寧に施術してもらえるとは驚きでした。姿勢分析で自分の歪みがよくわかり、施術後は体が軽くなりました。セルフケアの方法も教えてもらえて大満足です。',
    helpful: 42,
    createdAt: new Date('2024-12-10'),
  },
  {
    id: 'dummy-review-005',
    userId: 'dummy-user-001',
    userName: 'ダミー太郎',
    itemId: 'prod-9',
    itemType: 'product',
    rating: 4,
    title: '(ダミー) ホットストーンの温かさが最高',
    content: '(ダミー) 温かい石が体の奥まで温めてくれる感じがして、施術後はポカポカが続きました。冷え性の方には特におすすめです。',
    helpful: 15,
    createdAt: new Date('2024-12-15'),
  },
];

// ============================================
// (ダミー) 予約データ
// ============================================
export interface Reservation {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'location' | 'event';
  date: Date;
  time: string;
  numberOfPeople: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

// (ダミー) 予約サンプルデータ
const dummyReservations: Reservation[] = [
  {
    id: 'dummy-res-001',
    userId: 'dummy-user-001',
    itemId: 'prod-7', // 姿勢矯正施術体験
    itemType: 'location',
    date: new Date('2025-01-20'),
    time: '10:00-11:30',
    numberOfPeople: 1,
    status: 'confirmed',
    notes: '(ダミー) 肩こりがひどいので重点的にお願いします',
    createdAt: new Date('2025-01-10'),
  },
  {
    id: 'dummy-res-002',
    userId: 'dummy-user-001',
    itemId: 'prod-8', // 足が速くなるトレーニング
    itemType: 'location',
    date: new Date('2025-01-25'),
    time: '14:00-15:00',
    numberOfPeople: 2,
    status: 'pending',
    notes: '(ダミー) 子どもと一緒に参加希望',
    createdAt: new Date('2025-01-12'),
  },
  {
    id: 'dummy-res-003',
    userId: 'dummy-user-001',
    itemId: 'prod-9', // ホットストーンマッサージ
    itemType: 'location',
    date: new Date('2024-12-20'),
    time: '16:00-17:00',
    numberOfPeople: 1,
    status: 'confirmed',
    createdAt: new Date('2024-12-10'),
  },
  {
    id: 'dummy-res-004',
    userId: 'dummy-user-002',
    itemId: 'prod-13', // ヨガマット＆オンラインレッスン
    itemType: 'location',
    date: new Date('2025-02-01'),
    time: '09:00-10:00',
    numberOfPeople: 1,
    status: 'confirmed',
    createdAt: new Date('2025-01-15'),
  },
];

// ============================================
// (ダミー) お問い合わせデータ
// ============================================
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

const dummyContacts: ContactMessage[] = [];

// ============================================
// (ダミー) ニュースレター購読データ
// ============================================
export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}

const dummyNewsletterSubscribers: NewsletterSubscriber[] = [];

// ============================================
// (ダミー) 診断結果データ
// ============================================
export interface DiagnosisResult {
  id: string;
  sessionId: string;
  userId?: string;
  answers: Record<string, string>;
  recommendedCategories: string[];
  recommendedProducts: string[];
  createdAt: Date;
}

const dummyDiagnosisResults: DiagnosisResult[] = [];

// ============================================
// (ダミー) アクセス・閲覧履歴データ（ランキング用）
// ============================================
export interface ViewLog {
  id: string;
  itemId: string;
  itemType: 'product' | 'location' | 'event' | 'report';
  userId?: string;
  viewedAt: Date;
}

const dummyViewLogs: ViewLog[] = [];

// ============================================
// データベース操作関数
// TODO: Supabaseに差し替え時にこれらの関数を更新
// ============================================

// --- ユーザー ---
export async function findUserByEmail(email: string): Promise<User | null> {
  // (ダミー) ローカル配列から検索
  return dummyUsers.find(u => u.email === email) || null;
}

export async function findUserById(id: string): Promise<User | null> {
  return dummyUsers.find(u => u.id === id) || null;
}

export async function createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const newUser: User = {
    ...data,
    id: `user-${Date.now()}`,
    createdAt: new Date(),
  };
  dummyUsers.push(newUser);
  return newUser;
}

// --- お気に入り ---
export async function getFavorites(userId: string, itemType?: Favorite['itemType']): Promise<Favorite[]> {
  return dummyFavorites.filter(f =>
    f.userId === userId && (!itemType || f.itemType === itemType)
  );
}

export async function addFavorite(data: Omit<Favorite, 'id' | 'createdAt'>): Promise<Favorite> {
  const existing = dummyFavorites.find(
    f => f.userId === data.userId && f.itemId === data.itemId && f.itemType === data.itemType
  );
  if (existing) return existing;

  const newFavorite: Favorite = {
    ...data,
    id: `fav-${Date.now()}`,
    createdAt: new Date(),
  };
  dummyFavorites.push(newFavorite);
  return newFavorite;
}

export async function removeFavorite(userId: string, itemId: string, itemType: Favorite['itemType']): Promise<boolean> {
  const index = dummyFavorites.findIndex(
    f => f.userId === userId && f.itemId === itemId && f.itemType === itemType
  );
  if (index > -1) {
    dummyFavorites.splice(index, 1);
    return true;
  }
  return false;
}

export async function isFavorite(userId: string, itemId: string, itemType: Favorite['itemType']): Promise<boolean> {
  return dummyFavorites.some(
    f => f.userId === userId && f.itemId === itemId && f.itemType === itemType
  );
}

// --- いいね ---
export async function getLikeCount(itemId: string, itemType: Like['itemType']): Promise<number> {
  return dummyLikes.filter(l => l.itemId === itemId && l.itemType === itemType).length;
}

export async function addLike(data: Omit<Like, 'id' | 'createdAt'>): Promise<Like> {
  const existing = dummyLikes.find(
    l => l.userId === data.userId && l.itemId === data.itemId && l.itemType === data.itemType
  );
  if (existing) return existing;

  const newLike: Like = {
    ...data,
    id: `like-${Date.now()}`,
    createdAt: new Date(),
  };
  dummyLikes.push(newLike);
  return newLike;
}

export async function removeLike(userId: string, itemId: string, itemType: Like['itemType']): Promise<boolean> {
  const index = dummyLikes.findIndex(
    l => l.userId === userId && l.itemId === itemId && l.itemType === itemType
  );
  if (index > -1) {
    dummyLikes.splice(index, 1);
    return true;
  }
  return false;
}

export async function isLiked(userId: string, itemId: string, itemType: Like['itemType']): Promise<boolean> {
  return dummyLikes.some(
    l => l.userId === userId && l.itemId === itemId && l.itemType === itemType
  );
}

// --- レビュー ---
export async function getReviews(itemId: string, itemType: Review['itemType']): Promise<Review[]> {
  return dummyReviews.filter(r => r.itemId === itemId && r.itemType === itemType);
}

export async function createReview(data: Omit<Review, 'id' | 'helpful' | 'createdAt'>): Promise<Review> {
  const newReview: Review = {
    ...data,
    id: `review-${Date.now()}`,
    helpful: 0,
    createdAt: new Date(),
  };
  dummyReviews.push(newReview);
  return newReview;
}

export async function incrementHelpful(reviewId: string): Promise<void> {
  const review = dummyReviews.find(r => r.id === reviewId);
  if (review) {
    review.helpful += 1;
  }
}

// --- 予約 ---
export async function createReservation(data: Omit<Reservation, 'id' | 'status' | 'createdAt'>): Promise<Reservation> {
  const newReservation: Reservation = {
    ...data,
    id: `res-${Date.now()}`,
    status: 'pending',
    createdAt: new Date(),
  };
  dummyReservations.push(newReservation);
  return newReservation;
}

export async function getUserReservations(userId: string): Promise<Reservation[]> {
  return dummyReservations.filter(r => r.userId === userId);
}

export async function cancelReservation(reservationId: string): Promise<boolean> {
  const reservation = dummyReservations.find(r => r.id === reservationId);
  if (reservation) {
    reservation.status = 'cancelled';
    return true;
  }
  return false;
}

// --- お問い合わせ ---
export async function createContactMessage(data: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): Promise<ContactMessage> {
  const newContact: ContactMessage = {
    ...data,
    id: `contact-${Date.now()}`,
    status: 'new',
    createdAt: new Date(),
  };
  dummyContacts.push(newContact);
  return newContact;
}

// --- ニュースレター ---
export async function subscribeNewsletter(email: string): Promise<NewsletterSubscriber> {
  const existing = dummyNewsletterSubscribers.find(s => s.email === email);
  if (existing) {
    existing.isActive = true;
    return existing;
  }

  const newSubscriber: NewsletterSubscriber = {
    id: `sub-${Date.now()}`,
    email,
    subscribedAt: new Date(),
    isActive: true,
  };
  dummyNewsletterSubscribers.push(newSubscriber);
  return newSubscriber;
}

// --- 診断 ---
export async function saveDiagnosisResult(data: Omit<DiagnosisResult, 'id' | 'createdAt'>): Promise<DiagnosisResult> {
  const newResult: DiagnosisResult = {
    ...data,
    id: `diag-${Date.now()}`,
    createdAt: new Date(),
  };
  dummyDiagnosisResults.push(newResult);
  return newResult;
}

// --- 閲覧ログ（ランキング用） ---
export async function logView(itemId: string, itemType: ViewLog['itemType'], userId?: string): Promise<void> {
  const log: ViewLog = {
    id: `view-${Date.now()}`,
    itemId,
    itemType,
    userId,
    viewedAt: new Date(),
  };
  dummyViewLogs.push(log);
}

export async function getViewCounts(itemType: ViewLog['itemType'], days: number = 7): Promise<Map<string, number>> {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const counts = new Map<string, number>();
  dummyViewLogs
    .filter(l => l.itemType === itemType && l.viewedAt >= cutoff)
    .forEach(l => {
      counts.set(l.itemId, (counts.get(l.itemId) || 0) + 1);
    });
  return counts;
}

// --- 商品検索 ---
export async function searchProducts(params: {
  query?: string;
  category?: string;
  experienceType?: string;
  sortBy?: 'rating' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}) {
  let results = [...products];

  // キーワード検索
  if (params.query) {
    const q = params.query.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.name.toLowerCase().includes(q)
    );
  }

  // カテゴリフィルター
  if (params.category && params.category !== 'all') {
    results = results.filter(p => p.category.id === params.category || p.category.slug === params.category);
  }

  // 体験方法フィルター
  if (params.experienceType && params.experienceType !== 'all') {
    const expType = params.experienceType as 'visit' | 'delivery' | 'consultation' | 'online';
    results = results.filter(p => p.experienceType.includes(expType));
  }

  // ソート
  switch (params.sortBy) {
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      results.sort((a, b) => b.id.localeCompare(a.id));
      break;
    case 'popular':
      results.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
      break;
  }

  // ページネーション
  const page = params.page || 1;
  const limit = params.limit || 12;
  const total = results.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;

  return {
    items: results.slice(offset, offset + limit),
    total,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
}

// --- ランキング取得 ---
export async function getRankings(params: {
  itemType: 'product' | 'location' | 'event';
  period: 'daily' | 'weekly' | 'monthly';
  limit?: number;
}) {
  const days = params.period === 'daily' ? 1 : params.period === 'weekly' ? 7 : 30;
  const viewCounts = await getViewCounts(params.itemType, days);
  const limit = params.limit || 10;

  let items: any[] = [];
  switch (params.itemType) {
    case 'product':
      items = products;
      break;
    case 'location':
      items = experienceLocations;
      break;
    case 'event':
      items = events;
      break;
  }

  // 閲覧数 + 評価でスコア計算
  const scored = items.map(item => ({
    ...item,
    score: (viewCounts.get(String(item.id)) || 0) * 10 + (item.rating || 0) * 100,
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}
