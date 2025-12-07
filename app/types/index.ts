export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  company: Company;
  images: string[];
  features: string[];
  price?: number;
  experienceType: ExperienceType[];
  tags: string[];
  reviews: Review[];
  rating: number;
  location?: string;
  reviewCount?: number;
}

export interface ExperienceLocation {
  id: string;
  name: string;
  address: string;
  prefecture: string;
  city: string;
  products: Product[];
  openingHours: string;
  phone: string;
  images: string[];
  latitude?: number;
  longitude?: number;
  rating: number;
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  helpful: number;
}

export interface Concern {
  id: string;
  name: string;
  slug: string;
  description: string;
  relatedCategories: Category[];
  icon?: string;
}

export type ExperienceType = 'visit' | 'delivery' | 'consultation' | 'online';

export interface DiagnosisQuestion {
  id: string;
  question: string;
  options: DiagnosisOption[];
  type: 'single' | 'multiple';
}

export interface DiagnosisOption {
  id: string;
  text: string;
  value: string;
  relatedCategories?: string[];
  relatedConcerns?: string[];
}

export interface DiagnosisResult {
  recommendedProducts: Product[];
  recommendedCategories: Category[];
  message: string;
}

export interface SearchFilters {
  category?: string;
  experienceType?: ExperienceType[];
  prefecture?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  rating?: number;
  concern?: string;
}

export interface ExperienceReport {
  id: string;
  title: string;
  description: string;
  product: Product;
  location: ExperienceLocation;
  reviewer: {
    name: string;
    age: string;
    gender: '男性' | '女性';
    city: string;
    avatar?: string;
  };
  videoUrl?: string;
  images: string[];
  rating: number;
  experienceDate: Date;
  duration: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
  tags: string[];
  likes: number;
  createdAt: Date;
}

export interface ExperienceEvent {
  id: string;
  title: string;
  description: string;
  venue: string;
  address: string;
  city: string;
  startDate: Date;
  endDate: Date;
  timeSlots: string[];
  products: Product[];
  capacity: number;
  remainingSlots: number;
  isWeekendEvent: boolean;
  eventType: 'popup' | 'special' | 'collaboration';
  images: string[];
  registrationRequired: boolean;
  price: number;
  tags: string[];
  organizer: Company;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
}