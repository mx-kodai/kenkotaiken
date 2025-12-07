'use client';

import dynamic from 'next/dynamic';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/mockData';

const BentoGrid = dynamic(() => import('../components/BentoGrid'), { ssr: false });

// BentoGrid用にカテゴリデータを変換
const categoryItems = categories.map(cat => ({
    id: cat.id,
    title: cat.name,
    description: cat.description || '',
    href: `/categories/${cat.slug}`,
    image: `/images/categories/${cat.slug}.jpg`,
}));

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <PageHero
                title="Find Your Experience"
                subtitle="体験を探す"
                image="/images/hero-search.png"
                description="気になるカテゴリから探すか、すべての体験から新しい発見を見つけましょう。あなたの健康ライフスタイルにぴったりの体験がここにあります。"
            />

            <div className="container mx-auto px-4 py-16 relative z-20 -mt-10">
                {/* Categories Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-10 w-2 bg-emerald-500 rounded-full" />
                        <h2 className="text-2xl font-bold text-gray-800">カテゴリから探す</h2>
                    </div>
                    <BentoGrid items={categoryItems} />
                </div>

                {/* All Products Section */}
                <div>
                    <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-2 bg-emerald-500 rounded-full" />
                            <h2 className="text-2xl font-bold text-gray-800">すべての体験一覧</h2>
                        </div>
                        <span className="text-gray-500 font-medium">{products.length} Items</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="h-full">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
