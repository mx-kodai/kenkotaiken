import { Product, ExperienceLocation, Category, Company, Concern, Review, DiagnosisQuestion, ExperienceReport, ExperienceEvent } from '../types';

export const categories: Category[] = [
  { id: 'cat-1', name: 'マッサージ・整体', slug: 'massage-devices', description: 'マッサージ機器や整体施術' },
  { id: 'cat-2', name: 'フィットネス・スポーツ', slug: 'fitness-equipment', description: 'トレーニング機器やスポーツ指導' },
  { id: 'cat-3', name: '睡眠・リカバリー', slug: 'sleep-improvement', description: '睡眠改善や疲労回復' },
  { id: 'cat-4', name: '姿勢・ボディケア', slug: 'posture-correction', description: '姿勢矯正やボディメンテナンス' },
  { id: 'cat-5', name: 'リラクゼーション', slug: 'relaxation', description: 'ストレス解消・リラックス' },
  { id: 'cat-6', name: '健康測定・検査', slug: 'health-monitors', description: '健康状態の測定・分析' },
  { id: 'cat-7', name: '美容・エステ', slug: 'beauty-care', description: '美容機器やエステ体験' },
  { id: 'cat-8', name: '栄養・サプリ', slug: 'nutrition', description: '健康食品やサプリメント' },
  { id: 'cat-9', name: '温泉・岩盤浴', slug: 'spa-therapy', description: '温泉施設や岩盤浴' },
  { id: 'cat-10', name: 'ヨガ・ピラティス', slug: 'yoga-pilates', description: 'ヨガやピラティス体験' }
];

export const companies: Company[] = [
  { id: 'comp-1', name: '(ダミー) ヘルスケアプラス', description: '健康機器のリーディングカンパニー' },
  { id: 'comp-2', name: '(ダミー) ウェルネステック', description: '最新テクノロジーで健康をサポート' },
  { id: 'comp-3', name: '(ダミー) リラックスラボ', description: 'リラクゼーション機器専門メーカー' },
  { id: 'comp-4', name: '(ダミー) フィットライフ', description: 'フィットネス機器の専門企業' }
];

export const concerns: Concern[] = [
  {
    id: 'con-1',
    name: '肩こり・腰痛',
    slug: 'shoulder-back-pain',
    description: 'デスクワークによる慢性的な痛み',
    relatedCategories: [categories[0], categories[3]]
  },
  {
    id: 'con-2',
    name: '睡眠不足',
    slug: 'sleep-deprivation',
    description: '質の良い睡眠が取れない',
    relatedCategories: [categories[2], categories[4]]
  },
  {
    id: 'con-3',
    name: '運動不足',
    slug: 'lack-of-exercise',
    description: '日常的な運動習慣がない',
    relatedCategories: [categories[1]]
  },
  {
    id: 'con-4',
    name: 'ストレス・疲労',
    slug: 'stress',
    description: '日常のストレスや疲れ',
    relatedCategories: [categories[4], categories[0]]
  },
  {
    id: 'con-5',
    name: 'ダイエット・体型',
    slug: 'diet-body-shape',
    description: '体重管理や体型改善',
    relatedCategories: [categories[1], categories[7]]
  },
  {
    id: 'con-6',
    name: '肌・美容',
    slug: 'skin-beauty',
    description: '肌の悩みや美容ケア',
    relatedCategories: [categories[6]]
  },
  {
    id: 'con-7',
    name: '冷え・むくみ',
    slug: 'cold-swelling',
    description: '体の冷えやむくみ',
    relatedCategories: [categories[8], categories[0]]
  },
  {
    id: 'con-8',
    name: '体力低下',
    slug: 'physical-weakness',
    description: '体力や筋力の低下',
    relatedCategories: [categories[1], categories[7]]
  },
  {
    id: 'con-9',
    name: '関節の痛み',
    slug: 'joint-pain',
    description: '膝や関節の不調',
    relatedCategories: [categories[0], categories[3]]
  },
  {
    id: 'con-10',
    name: '集中力低下',
    slug: 'concentration',
    description: '集中力やパフォーマンス低下',
    relatedCategories: [categories[2], categories[7]]
  }
];

// 拡張されたレビューインターフェース（既存のReviewを拡張）
interface ExtendedReview extends Review {
  userAge: string;
  userGender: '男性' | '女性';
  userCity: string;
}

const reviews: ExtendedReview[] = [
  {
    id: 'rev-1',
    userId: 'user-1',
    userName: '田中太郎',
    userAge: '40代',
    userGender: '男性',
    userCity: '富山市',
    rating: 5,
    comment: 'リライブシャツを着た瞬間から姿勢が楽になりました。肩こりがマシになって本当に驚いています。',
    createdAt: new Date('2024-01-15'),
    helpful: 45
  },
  {
    id: 'rev-2',
    userId: 'user-2',
    userName: '鈴木花子',
    userAge: '30代',
    userGender: '女性',
    userCity: '高岡市',
    rating: 4,
    comment: 'クルミラのマッサージボール、小さくて持ち運びやすいのに効果抜群です。',
    createdAt: new Date('2024-01-20'),
    helpful: 32
  },
  {
    id: 'rev-3',
    userId: 'user-3',
    userName: '佐藤美紀',
    userAge: '50代',
    userGender: '女性',
    userCity: '射水市',
    rating: 5,
    comment: 'アルファネス2で睡眠の質が本当に改善されました。朝の目覚めが全然違います。',
    createdAt: new Date('2024-02-01'),
    helpful: 28
  },
  {
    id: 'rev-4',
    userId: 'user-4',
    userName: '山田健一',
    userAge: '60代',
    userGender: '男性',
    userCity: '魚津市',
    rating: 5,
    comment: '姿勢矯正施術、初めて体験しましたが体が軽くなった気がします。無料でここまでしてもらえるとは。',
    createdAt: new Date('2024-02-05'),
    helpful: 51
  },
  {
    id: 'rev-5',
    userId: 'user-5',
    userName: '伊藤さくら',
    userAge: '20代',
    userGender: '女性',
    userCity: '黒部市',
    rating: 4,
    comment: '足が速くなるトレーニング、子供が体験しました。科学的なアプローチで説明もわかりやすかったです。',
    createdAt: new Date('2024-02-10'),
    helpful: 19
  },
  {
    id: 'rev-6',
    userId: 'user-6',
    userName: '中村慎一',
    userAge: '30代',
    userGender: '男性',
    userCity: '砚市',
    rating: 5,
    comment: 'デスクワークでの腰痛が改善。姿勢サポートクッション、手放せません。',
    createdAt: new Date('2024-02-12'),
    helpful: 38
  },
  {
    id: 'rev-7',
    userId: 'user-7',
    userName: '加藤真由美',
    userAge: '40代',
    userGender: '女性',
    userCity: '氷見市',
    rating: 4,
    comment: 'アロマディフューザーが想像以上に良かったです。寝室に置いてリラックスしています。',
    createdAt: new Date('2024-02-15'),
    helpful: 24
  },
  {
    id: 'rev-8',
    userId: 'user-8',
    userName: '木村健太',
    userAge: '50代',
    userGender: '男性',
    userCity: '南砚市',
    rating: 5,
    comment: 'スマート体組成計で毎日の健康管理が楽しくなりました。アプリ連携も便利。',
    createdAt: new Date('2024-02-18'),
    helpful: 17
  },
  {
    id: 'rev-9',
    userId: 'user-9',
    userName: '小林美智子',
    userAge: '60代',
    userGender: '女性',
    userCity: '立山町',
    rating: 5,
    comment: 'ヨガ体験、初心者でも安心して参加できました。インストラクターが優しく指導してくれます。',
    createdAt: new Date('2024-02-20'),
    helpful: 42
  },
  {
    id: 'rev-10',
    userId: 'user-10',
    userName: '渡辺雅人',
    userAge: '30代',
    userGender: '男性',
    userCity: '滑川市',
    rating: 4,
    comment: 'フィットネスバイクでダイエット成功！オンラインクラスも充実していて飽きません。',
    createdAt: new Date('2024-02-22'),
    helpful: 29
  }
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: '(ダミー) リライブシャツ',
    description: '着るだけで体のバランスを整える特殊加工シャツ。姿勢改善と疲労軽減をサポート',
    category: categories[3],
    company: companies[0],
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80'],
    features: ['特殊鉱石プリント', '姿勢サポート', '疲労軽減', '洗濯可能'],
    price: 8800,
    experienceType: ['visit', 'delivery'],
    tags: ['人気', '話題', '姿勢改善'],
    reviews: [reviews[0], reviews[5]],
    rating: 4.8
  },
  {
    id: 'prod-2',
    name: '(ダミー) クルミラ',
    description: 'クルミのからを使用したマッサージボール。足裏や肩甘りのマッサージに',
    category: categories[4],
    company: companies[3],
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'],
    features: ['天然クルミ材', 'ツボ刺激効果', 'コンパクト設計', '持ち運び便利'],
    price: 3980,
    experienceType: ['visit', 'delivery'],
    tags: ['リラックス', 'マッサージ'],
    reviews: [reviews[1], reviews[6]],
    rating: 4.6
  },
  {
    id: 'prod-3',
    name: '(ダミー) アルファネス2',
    description: '脳波をα波へ誘導し、リラックス状態へ導くデバイス。睡眠の質向上をサポート',
    category: categories[2],
    company: companies[1],
    images: ['https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=80'],
    features: ['α波誘導音源', 'タイマー機能', 'ポータブル設計', '充電式'],
    price: 24800,
    experienceType: ['delivery', 'consultation'],
    tags: ['睡眠改善', 'リラックス'],
    reviews: [reviews[2]],
    rating: 4.5
  },
  {
    id: 'prod-4',
    name: '(ダミー) 姿勢サポートクッション',
    description: '長時間のデスクワークでも正しい姿勢を保てる高機能クッション',
    category: categories[3],
    company: companies[2],
    images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80'],
    features: ['人間工学設計', '圧力分散', '通気性抜群', '洗濯可能'],
    price: 12800,
    experienceType: ['visit', 'delivery'],
    tags: ['テレワーク', '姿勢改善'],
    reviews: [reviews[5]],
    rating: 4.3
  },
  {
    id: 'prod-5',
    name: '(ダミー) アロマディフューザー Pro',
    description: '医療グレードのアロマで本格的なリラクゼーション',
    category: categories[4],
    company: companies[2],
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80'],
    features: ['タイマー機能', '静音設計', 'LED照明', 'アプリ制御'],
    price: 8980,
    experienceType: ['visit', 'delivery'],
    tags: ['リラックス', 'アロマ'],
    reviews: [reviews[6]],
    rating: 4.7
  },
  {
    id: 'prod-6',
    name: '(ダミー) スマート体組成計',
    description: '体重だけでなく体脂肪率や筋肉量も測定できる高精度体組成計',
    category: categories[5],
    company: companies[1],
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'],
    features: ['18項目測定', 'アプリ連携', '家族共有', 'トレンド分析'],
    price: 6980,
    experienceType: ['visit', 'delivery'],
    tags: ['健康管理', 'データ分析'],
    reviews: [reviews[7]],
    rating: 4.4
  },
  {
    id: 'prod-7',
    name: '(ダミー) 姿勢矯正施術体験',
    description: 'プロの整体師による姿勢分析と矯正施術を無料体験',
    category: categories[3],
    company: companies[2],
    images: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'],
    features: ['姿勢分析', '個別施術', 'セルフケア指導', 'アフターフォロー'],
    price: 0,
    experienceType: ['visit'],
    tags: ['無料体験', '姿勢改善', '施術'],
    reviews: [reviews[3], reviews[8]],
    rating: 4.9
  },
  {
    id: 'prod-8',
    name: '(ダミー) 足が速くなるトレーニング体験',
    description: 'スポーツ科学に基づいた走り方改善プログラム',
    category: categories[1],
    company: companies[3],
    images: ['https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80'],
    features: ['動作分析', '個別メニュー', 'スピード測定', '成果保証'],
    price: 0,
    experienceType: ['visit'],
    tags: ['無料体験', 'スポーツ', 'トレーニング'],
    reviews: [reviews[4], reviews[9]],
    rating: 4.7
  },
  {
    id: 'prod-9',
    name: '(ダミー) ホットストーンマッサージ',
    description: '温めた天然石を使用したリラックスマッサージ',
    category: categories[4],
    company: companies[2],
    images: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'],
    features: ['遠赤外線効果', '血行促進', '疲労回復', 'ストレス解消'],
    price: 5000,
    experienceType: ['visit'],
    tags: ['リラックス', 'マッサージ'],
    reviews: [reviews[1], reviews[3]],
    rating: 4.8
  },
  {
    id: 'prod-10',
    name: '(ダミー) 美顔器 エステプロ',
    description: '自宅でエステサロンのケアができる美顔器',
    category: categories[6],
    company: companies[1],
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'],
    features: ['イオン導入', '温熱ケア', 'LEDライト', '振動マッサージ'],
    price: 29800,
    experienceType: ['visit', 'delivery'],
    tags: ['美容', 'エステ'],
    reviews: [reviews[2], reviews[6]],
    rating: 4.6
  },
  {
    id: 'prod-11',
    name: '(ダミー) 水素吸入器',
    description: '水素ガスを吸入して体内からリフレッシュ',
    category: categories[5],
    company: companies[1],
    images: ['https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80'],
    features: ['高濃度水素', 'ポータブル', 'タイマー機能', '簡単操作'],
    price: 158000,
    experienceType: ['visit', 'delivery'],
    tags: ['健康管理', 'リカバリー'],
    reviews: [reviews[5]],
    rating: 4.5
  },
  {
    id: 'prod-12',
    name: '(ダミー) 岩盤浴マット',
    description: '自宅で岩盤浴効果を体験できるマット',
    category: categories[8],
    company: companies[2],
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80'],
    features: ['遠赤外線', 'デトックス効果', '省エネ設計', '温度調節可能'],
    price: 39800,
    experienceType: ['visit', 'delivery'],
    tags: ['デトックス', '岩盤浴'],
    reviews: [reviews[7], reviews[8]],
    rating: 4.7
  },
  {
    id: 'prod-13',
    name: '(ダミー) ヨガマット＆オンラインレッスン',
    description: '高品質ヨガマットとオンラインレッスンのセット',
    category: categories[9],
    company: companies[3],
    images: ['https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80'],
    features: ['プロインストラクター', '初心者対応', 'ライブ配信', 'アーカイブ視聴'],
    price: 0,
    experienceType: ['online', 'delivery'],
    tags: ['無料体験', 'ヨガ', 'オンライン'],
    reviews: [reviews[8]],
    rating: 4.9
  },
  {
    id: 'prod-14',
    name: '(ダミー) プロテインサプリお試しセット',
    description: '人気プロテインのお試しセット',
    category: categories[7],
    company: companies[0],
    images: ['https://images.unsplash.com/photo-1622481029465-30ed27eb97b0?w=800&q=80'],
    features: ['無添加', '高品質', '数種類の味', 'シェイカー付き'],
    price: 0,
    experienceType: ['delivery'],
    tags: ['無料サンプル', 'プロテイン', '栄養'],
    reviews: [reviews[9]],
    rating: 4.5
  },
  {
    id: 'prod-15',
    name: '(ダミー) 電動フォームローラー',
    description: '筋膜リリースで体のこわばりを解消',
    category: categories[1],
    company: companies[3],
    images: ['https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&q=80'],
    features: ['振動機能', '耐久性', '軽量設計', '充電式'],
    price: 12800,
    experienceType: ['visit', 'delivery'],
    tags: ['フィットネス', 'リカバリー'],
    reviews: [],
    rating: 4.4
  },
  {
    id: 'prod-16',
    name: '(ダミー) カップル限定ペア体験セット',
    description: '二人で一緒に健康チェック＆マッサージ体験ができる特別メニュー',
    category: categories[4],
    company: companies[2],
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'],
    features: ['二人同時体験', 'カップル専用ルーム', '記念写真サービス', 'ティータイム付き'],
    price: 0,
    experienceType: ['visit'],
    tags: ['無料体験', 'カップル限定', 'デート'],
    reviews: [],
    rating: 4.9
  },
  {
    id: 'prod-17',
    name: '(ダミー) ファミリー健康体験パック',
    description: 'お子様も一緒に楽しめる家族向け健康体験メニュー',
    category: categories[5],
    company: companies[3],
    images: ['https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80'],
    features: ['お子様向けメニュー', 'キッズスペース完備', '家族写真撮影', 'お土産付き'],
    price: 0,
    experienceType: ['visit'],
    tags: ['無料体験', 'ファミリー', '子ども歓迎'],
    reviews: [],
    rating: 4.8
  },
  {
    id: 'prod-18',
    name: '(ダミー) 富山県民限定特別体験',
    description: '富山県にお住まいの方限定の特別体験メニュー',
    category: categories[0],
    company: companies[0],
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'],
    features: ['県民限定価格', '地域特産品プレゼント', '富山の健康情報提供', '継続サポート'],
    price: 0,
    experienceType: ['visit', 'delivery'],
    tags: ['無料体験', '富山県民限定', '地域密着'],
    reviews: [],
    rating: 5.0
  }
];

// 富山県の市町村
const toyamaCities = [
  { name: '富山市', id: 'toyama' },
  { name: '高岡市', id: 'takaoka' },
  { name: '射水市', id: 'imizu' },
  { name: '魚津市', id: 'uozu' },
  { name: '氷見市', id: 'himi' },
  { name: '滑川市', id: 'namerikawa' },
  { name: '黒部市', id: 'kurobe' },
  { name: '砚市', id: 'tonami' },
  { name: '小矢部市', id: 'oyabe' },
  { name: '南砚市', id: 'nanto' },
  { name: '舟橋村', id: 'funahashi' },
  { name: '上市町', id: 'kamiichi' },
  { name: '立山町', id: 'tateyama' },
  { name: '入善町', id: 'nyuzen' },
  { name: '朝日町', id: 'asahi' }
];

export const experienceLocations: ExperienceLocation[] = [
  {
    id: 'loc-1',
    name: '(ダミー) ウェルナビ体験センター 富山',
    address: '富山県富山市桜町1-1-1',
    prefecture: '富山県',
    city: '富山市',
    products: [products[0], products[1], products[2], products[6]],
    openingHours: '10:00-20:00',
    phone: '076-111-2222',
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'],
    latitude: 36.6953,
    longitude: 137.2113,
    rating: 4.8,
    reviews: []
  },
  {
    id: 'loc-2',
    name: '(ダミー) フィットネスラボ 高岡',
    address: '富山県高岡市中川1-1-30',
    prefecture: '富山県',
    city: '高岡市',
    products: [products[1], products[7]],
    openingHours: '9:00-21:00',
    phone: '0766-22-3333',
    images: ['https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80'],
    latitude: 36.7521,
    longitude: 137.0246,
    rating: 4.7,
    reviews: []
  },
  {
    id: 'loc-3',
    name: '(ダミー) リラックスサロン 射水',
    address: '富山県射水市三ケ576',
    prefecture: '富山県',
    city: '射水市',
    products: [products[1], products[2], products[4]],
    openingHours: '10:00-19:00',
    phone: '0766-55-4444',
    images: ['https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80'],
    latitude: 36.7083,
    longitude: 137.0806,
    rating: 4.6,
    reviews: []
  },
  {
    id: 'loc-4',
    name: '(ダミー) 健康プラザ 魚津',
    address: '富山県魚津市本町1-10-1',
    prefecture: '富山県',
    city: '魚津市',
    products: [products[3], products[5], products[6]],
    openingHours: '9:00-18:00',
    phone: '0765-23-4567',
    images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80'],
    latitude: 36.8267,
    longitude: 137.4046,
    rating: 4.5,
    reviews: []
  },
  {
    id: 'loc-5',
    name: '(ダミー) スポーツクラブ 黒部',
    address: '富山県黒部市三日市1037-1',
    prefecture: '富山県',
    city: '黒部市',
    products: [products[7]],
    openingHours: '6:00-22:00',
    phone: '0765-54-3210',
    images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'],
    latitude: 36.8708,
    longitude: 137.4498,
    rating: 4.8,
    reviews: []
  },
  {
    id: 'loc-6',
    name: '(ダミー) ウェルネスセンター 砺波',
    address: '富山県砚市若草町3-10',
    prefecture: '富山県',
    city: '砚市',
    products: [products[0], products[2], products[3], products[4]],
    openingHours: '10:00-20:00',
    phone: '0763-33-5555',
    images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80'],
    latitude: 36.6413,
    longitude: 136.9628,
    rating: 4.7,
    reviews: []
  },
  {
    id: 'loc-7',
    name: '(ダミー) ボディケアスタジオ 氷見',
    address: '富山県氷見市幸町17-1',
    prefecture: '富山県',
    city: '氷見市',
    products: [products[0], products[6]],
    openingHours: '9:00-19:00',
    phone: '0766-74-8888',
    images: ['https://images.unsplash.com/photo-1633681926035-ec1ac984418a?w=800&q=80'],
    latitude: 36.8567,
    longitude: 136.9878,
    rating: 4.6,
    reviews: []
  },
  {
    id: 'loc-8',
    name: '(ダミー) ヘルスケアショップ 南砺',
    address: '富山県南砚市福光288',
    prefecture: '富山県',
    city: '南砚市',
    products: [products[1], products[3], products[5]],
    openingHours: '10:00-18:00',
    phone: '0763-52-1234',
    images: ['https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80'],
    latitude: 36.5543,
    longitude: 136.8774,
    rating: 4.5,
    reviews: []
  },
  {
    id: 'loc-9',
    name: '(ダミー) ヨガスタジオ 立山',
    address: '富山県立山町前沢新町595',
    prefecture: '富山県',
    city: '立山町',
    products: [products[4]],
    openingHours: '7:00-21:00',
    phone: '076-463-5555',
    images: ['https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&q=80'],
    latitude: 36.6625,
    longitude: 137.3108,
    rating: 4.9,
    reviews: []
  },
  {
    id: 'loc-10',
    name: '(ダミー) フィットネスプラザ 滑川',
    address: '富山県滑川市柳原3-1',
    prefecture: '富山県',
    city: '滑川市',
    products: [products[7]],
    openingHours: '8:00-22:00',
    phone: '076-475-9999',
    images: ['https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80'],
    latitude: 36.7643,
    longitude: 137.3371,
    rating: 4.7,
    reviews: []
  }
];

export const diagnosisQuestions: DiagnosisQuestion[] = [
  {
    id: 'q1',
    question: 'どのような健康の悩みがありますか？',
    type: 'multiple',
    options: [
      { id: 'q1-1', text: '肩こり・首こり', value: 'shoulder', relatedCategories: ['cat-1', 'cat-4'] },
      { id: 'q1-2', text: '腰痛', value: 'back', relatedCategories: ['cat-1', 'cat-4'] },
      { id: 'q1-3', text: '睡眠の質が悪い', value: 'sleep', relatedCategories: ['cat-3'] },
      { id: 'q1-4', text: '運動不足', value: 'exercise', relatedCategories: ['cat-2'] },
      { id: 'q1-5', text: 'ストレス', value: 'stress', relatedCategories: ['cat-5'] },
      { id: 'q1-6', text: '姿勢が悪い', value: 'posture', relatedCategories: ['cat-4'] }
    ]
  },
  {
    id: 'q2',
    question: 'どのような体験方法を希望しますか？',
    type: 'single',
    options: [
      { id: 'q2-1', text: '店舗で実際に試したい', value: 'visit' },
      { id: 'q2-2', text: '自宅に配送してもらいたい', value: 'delivery' },
      { id: 'q2-3', text: 'オンラインで相談したい', value: 'consultation' },
      { id: 'q2-4', text: 'どれでも良い', value: 'any' }
    ]
  },
  {
    id: 'q3',
    question: '予算はどのくらいですか？',
    type: 'single',
    options: [
      { id: 'q3-1', text: '1万円以下', value: 'low' },
      { id: 'q3-2', text: '1万円〜5万円', value: 'medium' },
      { id: 'q3-3', text: '5万円〜10万円', value: 'high' },
      { id: 'q3-4', text: '10万円以上でも可', value: 'premium' },
      { id: 'q3-5', text: '予算は気にしない', value: 'any' }
    ]
  }
];

export const experienceReports: ExperienceReport[] = [
  {
    id: 'report-1',
    title: '(ダミー) リライブシャツを1週間着用してみました！',
    description: 'デスクワークによる肩こりに悩まされていた私が、リライブシャツを1週間体験した結果をレポートします。',
    product: products[0], // リライブシャツ
    location: experienceLocations[0], // ウェルナビ体験センター 富山
    reviewer: {
      name: '田中太郎',
      age: '40代',
      gender: '男性',
      city: '富山市',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // ダミー動画URL
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80'
    ],
    rating: 5,
    experienceDate: new Date('2024-02-01'),
    duration: '1週間',
    beforeAfter: {
      before: '肩こりがひどく、夕方には頭痛がしていました',
      after: '着用3日目から肩が楽になり、1週間後には頭痛もなくなりました'
    },
    tags: ['肩こり改善', 'デスクワーク', '姿勢矯正'],
    likes: 45,
    createdAt: new Date('2024-02-08')
  },
  {
    id: 'report-2',
    title: '(ダミー) クルミラマッサージボールでセルフケア体験',
    description: '足裏マッサージが好きな私が、天然クルミ材のマッサージボールを試してみました。',
    product: products[1], // クルミラ
    location: experienceLocations[2], // リラックスサロン 射水
    reviewer: {
      name: '鈴木花子',
      age: '30代',
      gender: '女性',
      city: '高岡市',
      avatar: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80'
    },
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4', // ダミー動画URL
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'
    ],
    rating: 4,
    experienceDate: new Date('2024-02-05'),
    duration: '30分',
    beforeAfter: {
      before: '足がむくんで重い感じがしていました',
      after: 'マッサージ後は足が軽くなり、血行も良くなった感じです'
    },
    tags: ['足裏マッサージ', 'むくみ解消', 'リラックス'],
    likes: 32,
    createdAt: new Date('2024-02-10')
  },
  {
    id: 'report-3',
    title: '(ダミー) アルファネス2で睡眠の質が劇的改善！',
    description: '不眠に悩んでいた私がアルファネス2を2週間使用した体験記録です。',
    product: products[2], // アルファネス2
    location: experienceLocations[5], // ウェルネスセンター 砺波
    reviewer: {
      name: '佐藤美紀',
      age: '50代',
      gender: '女性',
      city: '射水市',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80'
    },
    videoUrl: 'https://www.youtube.com/embed/fJ9rUzIMcZQ', // ダミー動画URL
    images: [
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=80',
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80'
    ],
    rating: 5,
    experienceDate: new Date('2024-01-15'),
    duration: '2週間',
    beforeAfter: {
      before: '夜中に何度も目が覚めて、朝起きても疲れが取れませんでした',
      after: '深い眠りにつけるようになり、朝の目覚めもすっきりしています'
    },
    tags: ['睡眠改善', 'α波', 'リラックス'],
    likes: 28,
    createdAt: new Date('2024-01-30')
  },
  {
    id: 'report-4',
    title: '(ダミー) 足が速くなるトレーニングで子どもが変わった！',
    description: '運動会前に息子（小学3年生）がトレーニング体験に参加した結果をお伝えします。',
    product: products[7], // 足が速くなるトレーニング体験
    location: experienceLocations[4], // スポーツクラブ 黒部
    reviewer: {
      name: '伊藤さくら',
      age: '20代',
      gender: '女性',
      city: '黒部市',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80'
    },
    videoUrl: 'https://www.youtube.com/embed/kJQP7kiw5Fk', // ダミー動画URL
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
      'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80'
    ],
    rating: 5,
    experienceDate: new Date('2024-02-12'),
    duration: '1時間',
    beforeAfter: {
      before: '息子は走るのが遅く、運動に自信がありませんでした',
      after: 'フォームが改善され、本人も走るのが楽しくなったようです'
    },
    tags: ['子ども向け', 'スポーツ指導', '走り方改善'],
    likes: 19,
    createdAt: new Date('2024-02-15')
  },
  {
    id: 'report-5',
    title: '(ダミー) 美顔器エステプロで自宅エステデビュー',
    description: 'エステサロンに通えない私が、自宅で本格ケアを体験してみました。',
    product: products[9], // 美顔器 エステプロ
    location: experienceLocations[6], // ボディケアスタジオ 氷見
    reviewer: {
      name: '加藤真由美',
      age: '40代',
      gender: '女性',
      city: '氷見市',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80'
    },
    videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0', // ダミー動画URL
    images: [
      'https://images.unsplash.com/photo-1620756235944-37b3346d08c5?w=800&q=80',
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80'
    ],
    rating: 4,
    experienceDate: new Date('2024-02-20'),
    duration: '3週間',
    beforeAfter: {
      before: '肌のたるみやくすみが気になっていました',
      after: '肌にハリが出て、化粧ノリも良くなりました'
    },
    tags: ['美容', 'エステ', 'アンチエイジング'],
    likes: 24,
    createdAt: new Date('2024-02-25')
  }
];

export const experienceEvents: ExperienceEvent[] = [
  {
    id: 'event-1',
    title: '(ダミー) 週末限定！ファボーレ健康体験フェア',
    description: '人気の健康機器を気軽に試せる特別イベント。お買い物ついでにカップル・ご家族でお楽しみください',
    venue: 'ファボーレ（富山ショッピングセンター）',
    address: '富山県富山市婦中町下轡田165-1',
    city: '富山市',
    startDate: new Date('2024-03-02'),
    endDate: new Date('2024-03-03'),
    timeSlots: ['10:00-12:00', '13:00-15:00', '16:00-18:00'],
    products: [products[0], products[1], products[3], products[15]],
    capacity: 20,
    remainingSlots: 12,
    isWeekendEvent: true,
    eventType: 'popup',
    images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'],
    registrationRequired: true,
    price: 0,
    tags: ['週末限定', 'ファミリー', 'ショッピングモール'],
    organizer: companies[0],
    contact: {
      phone: '076-465-7000',
      website: 'https://favo-le.com/'
    }
  },
  {
    id: 'event-2',
    title: '(ダミー) イオンモール高岡 春の健康フェスティバル',
    description: '春の新生活応援！カップルペア体験や家族での健康チェックができます',
    venue: 'イオンモール高岡',
    address: '富山県高岡市下伏間江383',
    city: '高岡市',
    startDate: new Date('2024-03-09'),
    endDate: new Date('2024-03-10'),
    timeSlots: ['10:30-12:30', '14:00-16:00', '17:00-19:00'],
    products: [products[2], products[4], products[6], products[16]],
    capacity: 25,
    remainingSlots: 18,
    isWeekendEvent: true,
    eventType: 'special',
    images: ['https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80'],
    registrationRequired: true,
    price: 0,
    tags: ['春の特別企画', 'カップル特典', 'ファミリー'],
    organizer: companies[1],
    contact: {
      phone: '0766-27-2000'
    }
  },
  {
    id: 'event-3',
    title: '(ダミー) MEGAドン・キホーテ射水店 健康応援デー',
    description: '24時間営業の利便性を活かした夜間体験イベントも開催！',
    venue: 'MEGAドン・キホーテ射水店',
    address: '富山県射水市大島3208',
    city: '射水市',
    startDate: new Date('2024-03-16'),
    endDate: new Date('2024-03-17'),
    timeSlots: ['11:00-13:00', '15:00-17:00', '19:00-21:00'],
    products: [products[5], products[7], products[9], products[17]],
    capacity: 15,
    remainingSlots: 8,
    isWeekendEvent: true,
    eventType: 'collaboration',
    images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'],
    registrationRequired: false,
    price: 0,
    tags: ['夜間開催あり', 'コラボイベント', '予約不要'],
    organizer: companies[2],
    contact: {
      phone: '0766-55-1311'
    }
  },
  {
    id: 'event-4',
    title: '(ダミー) アピタ富山東店 健康の日スペシャル',
    description: '毎月第3土日恒例！地域密着の健康体験イベント',
    venue: 'アピタ富山東店',
    address: '富山県富山市上飯野字西12-1',
    city: '富山市',
    startDate: new Date('2024-03-23'),
    endDate: new Date('2024-03-24'),
    timeSlots: ['10:00-12:00', '13:30-15:30', '16:30-18:30'],
    products: [products[8], products[11], products[13], products[18]],
    capacity: 30,
    remainingSlots: 25,
    isWeekendEvent: true,
    eventType: 'popup',
    images: ['https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80'],
    registrationRequired: true,
    price: 0,
    tags: ['月例イベント', '富山県民特典', '大型会場'],
    organizer: companies[3],
    contact: {
      phone: '076-493-3100',
      email: 'event@apita-tomiyama.jp'
    }
  },
  {
    id: 'event-5',
    title: '(ダミー) となみチューリップフェア連動企画',
    description: 'チューリップフェア期間中の特別健康イベント！観光と一緒にお楽しみください',
    venue: 'となみ健康センター（臨時会場）',
    address: '富山県砺波市中村100-1',
    city: '砺波市',
    startDate: new Date('2024-04-20'),
    endDate: new Date('2024-05-05'),
    timeSlots: ['9:00-11:00', '12:00-14:00', '15:00-17:00'],
    products: [products[10], products[12], products[14]],
    capacity: 40,
    remainingSlots: 32,
    isWeekendEvent: false,
    eventType: 'special',
    images: ['https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80'],
    registrationRequired: true,
    price: 500,
    tags: ['観光連動', 'チューリップフェア', '期間限定'],
    organizer: companies[0],
    contact: {
      phone: '0763-33-7777',
      email: 'tulip-event@wellness.com'
    }
  }
];