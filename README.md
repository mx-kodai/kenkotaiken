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

## ライセンス

Private
