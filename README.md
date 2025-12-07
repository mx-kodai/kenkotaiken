# WellNavi - 健康体験プラットフォーム

富山県を中心とした健康・ウェルネス体験プラットフォーム

> **AI Agent Rule**: `npm run dev`は実行禁止。開発サーバーはユーザーが手動管理。

## クイックスタート

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 本番ビルド
```

## デモログイン

| メール | パスワード | ユーザー名 |
|--------|-----------|-----------|
| `demo@wellnavi.jp` | `demo1234` | ダミー太郎 |
| `test@wellnavi.jp` | `test1234` | ダミー花子 |

---

## 技術スタック

- **フレームワーク**: Next.js 15.5.0 (App Router, Turbopack)
- **スタイリング**: Tailwind CSS 4
- **アニメーション**: Framer Motion
- **アイコン**: Lucide React
- **言語**: TypeScript / JavaScript

---

## フォルダ構成

```
app/
├── components/     # 共通UIコンポーネント
├── contexts/       # Reactコンテキスト（AuthContext）
├── data/           # mockData.ts（商品・場所・イベント）
├── hooks/          # カスタムフック（ビジネスロジック）
├── lib/            # db.ts, auth.ts（ダミー実装）
└── [pages]/        # 各ページ
```

---

## ダミー実装一覧

現在はローカルストレージベースのダミー実装。本番ではSupabaseに移行予定。

### ストレージキー（`wellnavi_`プレフィックス）
- `wellnavi_session` - セッション
- `wellnavi_favorites` - お気に入り
- `wellnavi_likes` - いいね
- `wellnavi_reviews` - レビュー
- `wellnavi_reservations` - 予約
- `wellnavi_view_history` - 閲覧履歴

### ダミーデータ検索
```bash
grep -r "(ダミー)" app/    # コメント検索
grep -r "dummy-" app/      # ID検索
grep -r "wellnavi_" app/   # ストレージキー検索
```

### ダミーデータ一覧（mockData.ts）

**企業 (4件)**
- ウェルナビ・ヘルスケア / ナチュラルウェルネス / ヘルスプロモーション / フィットネステック

**商品・体験 (18件)**
| ID | 名称 |
|----|------|
| prod-1 | AIフィットネスミラー |
| prod-2 | ウェルネスチェアマッサージ |
| prod-3 | アロマディフューザーセット |
| prod-4 | 睡眠改善マットレス |
| prod-5 | スマートウォッチ |
| prod-6 | EMSトレーニング |
| prod-7 | 姿勢改善クッション |
| prod-8 | パーソナルトレーニング |
| prod-9 | 酸素カプセル |
| prod-10 | マインドフルネス瞑想 |
| prod-11 | 薬膳料理教室 |
| prod-12 | 森林浴ウォーキング |
| prod-13 | オンラインヨガ |
| prod-14 | プロテインサプリお試しセット |
| prod-15 | 電動フォームローラー |
| prod-16 | カップル限定ペア体験セット |
| prod-17 | ファミリー健康体験パック |
| prod-18 | 富山県民限定特別体験 |

**体験場所 (10件)**
| ID | 名称 | 都市 |
|----|------|------|
| loc-1 | ウェルナビ体験センター 富山 | 富山市 |
| loc-2 | フィットネスラボ 高岡 | 高岡市 |
| loc-3 | リラックスサロン 射水 | 射水市 |
| loc-4 | 健康プラザ 魚津 | 魚津市 |
| loc-5 | スポーツクラブ 黒部 | 黒部市 |
| loc-6 | ウェルネスセンター 砺波 | 砺波市 |
| loc-7 | ボディケアスタジオ 氷見 | 氷見市 |
| loc-8 | ヘルスステーション 滑川 | 滑川市 |
| loc-9 | リフレッシュサロン 小矢部 | 小矢部市 |
| loc-10 | 健康の森 南砺 | 南砺市 |

**イベント (5件)**
| ID | 名称 |
|----|------|
| event-1 | 週末限定！ファボーレ健康体験フェア |
| event-2 | イオンモール高岡 春の健康フェスティバル |
| event-3 | MEGAドン・キホーテ射水店 健康応援デー |
| event-4 | アピタ富山東店 健康の日スペシャル |
| event-5 | となみチューリップフェア連動企画 |

**レポート (5件)**
| ID | タイトル |
|----|----------|
| report-1 | 富山県民の健康意識調査2024 |
| report-2 | 睡眠と生産性の関係 |
| report-3 | 運動習慣が寿命に与える影響 |
| report-4 | ストレス解消法の比較研究 |
| report-5 | 食事バランスと免疫力 |

---

## 主要フック

| フック | 機能 | ファイル |
|--------|------|----------|
| `useAuth` | 認証 | contexts/AuthContext.tsx |
| `useFavorites` | お気に入り | hooks/useFavorites.ts |
| `useLikes` | いいね | hooks/useFavorites.ts |
| `useShare` | SNSシェア | hooks/useShare.ts |
| `useReviews` | レビュー | hooks/useReviews.ts |
| `useReservation` | 予約 | hooks/useReservation.ts |
| `useSearch` | 検索 | hooks/useSearch.ts |
| `useDiagnosis` | 健康診断 | hooks/useDiagnosis.ts |
| `useRanking` | ランキング | hooks/useRanking.ts |
| `useMyPage` | マイページ | hooks/useMyPage.ts |
| `useEventCalendar` | イベントカレンダー | hooks/useEventCalendar.ts |

---

## Supabase移行チェックリスト

### テーブル作成
- [ ] users（Auth連携）
- [ ] products / locations / events / reports
- [ ] reviews / favorites / likes
- [ ] reservations / contacts
- [ ] diagnosis_results / view_logs

### セキュリティ
- [ ] RLSポリシー設定
- [ ] Storage設定（画像用）

### 環境変数
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## データモデル概要

### Product（商品・体験）
- id, name, description, category, company
- images, features, price, experienceType
- rating, reviewCount, tags

### ExperienceLocation（体験場所）
- id, name, address, prefecture, city
- products, openingHours, phone, images
- latitude, longitude, rating

### ExperienceEvent（イベント）
- id, title, description, venue
- startDate, endDate, capacity, remainingSlots
- isWeekendEvent, registrationRequired, price

### User / Reservation / Review
- 詳細は `app/lib/db.ts` を参照

---

## 本番デプロイ時の削除対象

1. ログインページのデモ用アカウント表示
2. パスワードリセットの「デモ版」注意書き
3. お問い合わせページの「デモ版」注意書き
4. すべての `(ダミー)` コメント付きコード

---

---

## コーディングルール

- **絵文字禁止**: サイト内のテキストに絵文字を使用しない（Lucide Reactアイコンは可）
- **アイコン**: Lucide React のみ使用

---

## マイページ設計

### ユーザー種別
- **個人ユーザー** (`/mypage`): 体験を探す・予約する・レポートを書く
- **事業者ユーザー** (`/business`): 商品・体験を管理する・予約を確認する

### 個人マイページ (`/mypage`)

| セクション | 機能 |
|-----------|------|
| ダッシュボード | 予約状況、お気に入り数、レポート数 |
| 予約管理 | 予約一覧、キャンセル、変更 |
| お気に入り | 保存した商品一覧 |
| 体験レポート | 投稿したレポート一覧、新規投稿 |
| 閲覧履歴 | 最近見た商品 |
| 診断結果 | 過去の診断結果、おすすめ商品 |
| アカウント設定 | プロフィール編集、通知設定 |

#### 体験レポート投稿機能
- タイトル、本文、評価（星1-5）
- 体験した商品・場所の選択
- 画像アップロード（複数可、最大5枚）
- 動画アップロード（1本、最大30秒 or 外部URL）
- 下書き保存 / 公開

### 事業者マイページ (`/business`)

| セクション | 機能 |
|-----------|------|
| ダッシュボード | 予約数、閲覧数、評価推移 |
| 商品管理 | 商品一覧、新規登録、編集、公開/非公開 |
| 予約管理 | 予約一覧、承認、キャンセル対応 |
| 体験場所管理 | 場所情報の編集、営業時間設定 |
| レビュー確認 | 商品へのレビュー一覧 |
| イベント管理 | イベント作成、編集、参加者管理 |
| 分析 | 閲覧数、予約率、人気商品 |
| アカウント設定 | 企業情報編集、担当者設定 |

### Supabase Storage構成

```
storage/
├── avatars/           # ユーザーアバター
│   └── {user_id}/
├── reports/           # 体験レポートのメディア
│   └── {user_id}/
│       └── {report_id}/
│           ├── images/
│           └── videos/
├── products/          # 商品画像（事業者用）
│   └── {company_id}/
│       └── {product_id}/
└── locations/         # 体験場所画像
    └── {location_id}/
```

---

## データベース設計（Supabase移行用）

### テーブル構造

```sql
-- ユーザー（Supabase Auth連携）
-- user_type: 'individual'（個人）, 'business'（事業者）
users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  prefecture TEXT,
  city TEXT,
  user_type TEXT DEFAULT 'individual', -- 'individual' or 'business'
  company_id INTEGER REFERENCES companies(id), -- 事業者の場合のみ
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- カテゴリ
categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  parent_id INTEGER REFERENCES categories(id),
  sort_order INTEGER DEFAULT 0
)

-- 企業
companies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- 商品・体験
products (
  id TEXT PRIMARY KEY, -- 'prod-1'形式維持
  name TEXT NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES categories(id),
  company_id INTEGER REFERENCES companies(id),
  price INTEGER DEFAULT 0,
  experience_type TEXT[], -- ['visit', 'delivery', 'online']
  tags TEXT[],
  features JSONB,
  images TEXT[],
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- 体験場所
locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  prefecture TEXT DEFAULT '富山県',
  city TEXT,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  phone TEXT,
  opening_hours JSONB,
  facility_type TEXT, -- 'center', 'fitness', 'salon', 'studio'
  images TEXT[],
  rating DECIMAL(2,1) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- 場所×商品（多対多）
location_products (
  location_id TEXT REFERENCES locations(id),
  product_id TEXT REFERENCES products(id),
  PRIMARY KEY (location_id, product_id)
)

-- イベント
events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  venue TEXT,
  venue_url TEXT,
  start_date DATE,
  end_date DATE,
  capacity INTEGER,
  remaining_slots INTEGER,
  is_weekend_event BOOLEAN DEFAULT FALSE,
  registration_required BOOLEAN DEFAULT TRUE,
  price INTEGER DEFAULT 0,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- お気に入り
favorites (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
)

-- いいね
likes (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
)

-- レビュー
reviews (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  images TEXT[],
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- 予約
reservations (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id),
  location_id TEXT REFERENCES locations(id),
  event_id TEXT REFERENCES events(id),
  reservation_date DATE,
  time_slot TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled', 'completed'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- 閲覧履歴
view_history (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
)

-- 診断結果
diagnosis_results (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  answers JSONB,
  recommended_category_ids INTEGER[],
  recommended_product_ids TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- 体験レポート（個人ユーザーが投稿）
experience_reports (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id),
  location_id TEXT REFERENCES locations(id),
  title TEXT NOT NULL,
  description TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT FALSE
)

-- レポートのメディア（画像・動画）
report_media (
  id SERIAL PRIMARY KEY,
  report_id TEXT REFERENCES experience_reports(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL, -- 'image' or 'video'
  url TEXT NOT NULL,
  thumbnail_url TEXT, -- 動画の場合のサムネイル
  storage_path TEXT, -- Supabase Storageのパス
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- お問い合わせ
contacts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- 'new', 'in_progress', 'resolved'
  created_at TIMESTAMPTZ DEFAULT NOW()
)
```

### RLSポリシー例

```sql
-- ユーザーは自分のデータのみ読み書き可能
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);

-- 商品は誰でも閲覧可能
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (is_active = TRUE);

-- レビューは誰でも閲覧、投稿者のみ編集可能
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (TRUE);
CREATE POLICY "Users can manage own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);
```

### インデックス

```sql
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_rating ON products(rating DESC);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reservations_user ON reservations(user_id);
CREATE INDEX idx_view_history_user ON view_history(user_id);
CREATE INDEX idx_locations_city ON locations(city);
```

---

## ライセンス

Private
