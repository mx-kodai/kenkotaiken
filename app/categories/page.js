'use client';

import { motion } from 'framer-motion';
import BentoGrid from '../components/BentoGrid';
import { Stethoscope, Dumbbell, Sparkles, Brain } from 'lucide-react';

// Using the same categories data structure as updated in page.js
// Ideally this should be imported from a shared data source or fetched
const categories = [
    {
        id: 1,
        title: '健康診断・測定',
        description: 'プロ仕様の機器で体の状態をチェック',
        image: '/images/cat-health.png',
        href: '/categories/diagnosis',
        icon: Stethoscope
    },
    {
        id: 2,
        title: 'フィットネス・運動',
        description: '楽しく続けられる運動習慣',
        image: '/images/cat-fitness.png',
        href: '/categories/fitness',
        icon: Dumbbell
    },
    {
        id: 3,
        title: 'リラクゼーション',
        description: '心と体を癒やす究極の体験',
        image: '/images/cat-relaxation.png',
        href: '/categories/relaxation',
        icon: Sparkles
    },
    {
        id: 4,
        title: 'メンタルケア',
        description: 'ストレスフリーな毎日へ',
        image: '/images/cat-mental.png',
        href: '/categories/mental',
        icon: Brain
    }
];

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/mesh_gradient_background.png')] opacity-30 bg-cover bg-center" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-4"
                    >
                        Categories
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-emerald-100 max-w-2xl mx-auto"
                    >
                        あなたの目的に合わせた豊富な体験カテゴリー
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <BentoGrid items={categories} />
            </div>
        </div>
    );
}
