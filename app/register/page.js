'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mail, Lock, User, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
    const router = useRouter();
    const { register, isLoggedIn } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // 既にログイン済みならトップへリダイレクト
    if (isLoggedIn) {
        router.push('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await register(email, password, name);
            if (result.success) {
                router.push('/');
            } else {
                setError(result.error || '登録に失敗しました');
            }
        } catch (err) {
            setError('エラーが発生しました。もう一度お試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    const benefits = [
        '富山県内の限定体験イベントに参加可能',
        '自分に合った健康法が見つかる診断機能',
        'お得なキャンペーン情報の先行配信'
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
                    <div className="mb-8">
                        <Link href="/" className="inline-block mb-4">
                            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/30">
                                W
                            </div>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">新規登録（無料）</h1>
                        <p className="text-gray-500 mt-2">1分で完了します。クレジットカードは不要です。</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
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

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    登録中...
                                </>
                            ) : (
                                <>
                                    アカウント作成 <ArrowRight className="w-5 h-5" />
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
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 md:w-1/2 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/mesh_gradient_background.png')] opacity-20 bg-cover bg-center" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-6">Welcome to WellNavi</h2>
                        <p className="text-emerald-100 mb-8 text-lg">
                            富山県で健康体験を始めましょう。<br />
                            最新のウェルネスデバイスやサービスを、<br />
                            もっと身近に、もっと気軽に。
                        </p>

                        <div className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <div className="bg-white text-emerald-600 rounded-full p-1 flex-shrink-0">
                                        <Check className="w-4 h-4 stroke-[3px]" />
                                    </div>
                                    <span className="font-bold">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
