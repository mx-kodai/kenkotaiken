'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mail, Lock, User, Check, Loader2, Building2, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
    const router = useRouter();
    const { register, isLoggedIn } = useAuth();
    const [userType, setUserType] = useState('general'); // 'general' or 'partner'

    // General User State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Partner State
    const [companyName, setCompanyName] = useState('');
    const [contactName, setContactName] = useState('');
    const [partnerEmail, setPartnerEmail] = useState('');
    const [partnerPhone, setPartnerPhone] = useState('');
    const [partnerPassword, setPartnerPassword] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already logged in
    if (isLoggedIn) {
        router.push('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (userType === 'general') {
                const result = await register(email, password, name);
                if (result.success) {
                    router.push('/');
                } else {
                    setError(result.error || '登録に失敗しました');
                }
            } else {
                // Mock Partner Registration
                await new Promise(resolve => setTimeout(resolve, 1500));
                // In a real app, this would hit a separate endpoint
                const success = true;

                if (success) {
                    // For demo purposes, we might redirect to the business dashboard or a pending page
                    // Here we'll just redirect to the business page (which is the dashboard)
                    router.push('/business');
                } else {
                    setError('パートナー登録に失敗しました');
                }
            }
        } catch (err) {
            setError('エラーが発生しました。もう一度お試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    const generalBenefits = [
        '富山県内の限定体験イベントに参加可能',
        '自分に合った健康法が見つかる診断機能',
        'お得なキャンペーン情報の先行配信'
    ];

    const partnerBenefits = [
        '自社製品の無料体験会を開催可能',
        '健康意識の高いユーザーへのダイレクトリーチ',
        '体験フィードバックデータの分析・活用'
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-14 flex items-center justify-center p-4">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-40 left-40 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10 flex flex-col md:flex-row"
            >
                {/* Left Side: Form */}
                <div className="p-8 md:w-1/2">
                    <div className="mb-6">
                        <Link href="/" className="inline-block mb-4">
                            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/30">
                                W
                            </div>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">新規登録</h1>
                        <p className="text-gray-500 mt-2 text-sm">アカウントを作成して、サービスを利用開始しましょう。</p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                        <button
                            onClick={() => setUserType('general')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${userType === 'general'
                                    ? 'bg-white text-emerald-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            一般の方
                        </button>
                        <button
                            onClick={() => setUserType('partner')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${userType === 'partner'
                                    ? 'bg-white text-emerald-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            パートナーの方
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {userType === 'general' ? (
                                <motion.div
                                    key="general-form"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">お名前</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-gray-800 placeholder-gray-400 text-base"
                                                placeholder="山田 太郎"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">メールアドレス</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-gray-800 placeholder-gray-400 text-base"
                                                placeholder="hello@example.com"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">パスワード</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-gray-800 placeholder-gray-400 text-base"
                                                placeholder="8文字以上"
                                                minLength={8}
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="partner-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">会社名</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-gray-800 placeholder-gray-400 text-base"
                                                placeholder="株式会社ウェルナビ"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">担当者名</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                value={contactName}
                                                onChange={(e) => setContactName(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-gray-800 placeholder-gray-400 text-base"
                                                placeholder="山田 太郎"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">メールアドレス</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="email"
                                                value={partnerEmail}
                                                onChange={(e) => setPartnerEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-gray-800 placeholder-gray-400 text-base"
                                                placeholder="partner@example.com"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">電話番号</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="tel"
                                                value={partnerPhone}
                                                onChange={(e) => setPartnerPhone(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-gray-800 placeholder-gray-400 text-base"
                                                placeholder="03-1234-5678"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">パスワード</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="password"
                                                value={partnerPassword}
                                                onChange={(e) => setPartnerPassword(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-gray-800 placeholder-gray-400 text-base"
                                                placeholder="8文字以上"
                                                minLength={8}
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {userType === 'general' ? 'アカウント作成' : 'パートナー登録申請'} <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-500 text-sm">
                            すでにアカウントをお持ちですか？{' '}
                            <Link href="/login" className="text-emerald-600 font-bold hover:text-emerald-700 underline decoration-2 decoration-transparent hover:decoration-emerald-600 transition-all">
                                ログインする
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right Side: Benefits */}
                <div className={`p-8 md:w-1/2 text-white flex flex-col justify-center relative overflow-hidden transition-colors duration-500 ${userType === 'general' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-blue-600 to-indigo-700'
                    }`}>
                    <div className="absolute inset-0 bg-[url('/images/mesh_gradient_background.png')] opacity-20 bg-cover bg-center" />
                    <div className="relative z-10">
                        <motion.div
                            key={userType}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-3xl font-bold mb-6">
                                {userType === 'general' ? 'Welcome to WellNavi' : 'Grow with WellNavi'}
                            </h2>
                            <p className="text-white/90 mb-8 text-lg">
                                {userType === 'general'
                                    ? (<>富山県で健康体験を始めましょう。<br />最新のウェルネスデバイスやサービスを、<br />もっと身近に、もっと気軽に。</>)
                                    : (<>あなたの製品・サービスを<br />健康意識の高いユーザーへ届けませんか？<br />ビジネスを加速させるパートナーシップ。</>)
                                }
                            </p>

                            <div className="space-y-4">
                                {(userType === 'general' ? generalBenefits : partnerBenefits).map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                        <div className="bg-white text-emerald-600 rounded-full p-1 flex-shrink-0">
                                            <Check className="w-4 h-4 stroke-[3px]" />
                                        </div>
                                        <span className="font-bold">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
