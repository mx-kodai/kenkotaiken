'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mail, Lock, Loader2, Copy, Check, Eye, EyeOff, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const demoEmail = 'demo@wellnavi.jp';
    const demoPassword = 'demo1234';

    const copyToClipboard = async (text, type) => {
        try {
            await navigator.clipboard.writeText(text);
            if (type === 'email') {
                setCopiedEmail(true);
                setTimeout(() => setCopiedEmail(false), 2000);
            } else {
                setCopiedPassword(true);
                setTimeout(() => setCopiedPassword(false), 2000);
            }
        } catch (err) {
            console.error('コピーに失敗しました');
        }
    };

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
            const result = await login(email, password);
            if (result.success) {
                router.push('/');
            } else {
                setError(result.error || 'ログインに失敗しました');
            }
        } catch (err) {
            setError('エラーが発生しました。もう一度お試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-40 left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative z-10"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block mb-4">
                        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-lg shadow-emerald-500/30">
                            W
                        </div>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">おかえりなさい</h1>
                    <p className="text-gray-500 mt-2">アカウントにログインして体験を始めましょう</p>
                </div>

                {/* (ダミー) デモ用ログイン情報 */}
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm">
                    <p className="font-bold text-emerald-700 mb-2">デモ用アカウント</p>
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <p className="text-emerald-600">メール: <span className="font-mono bg-white px-2 py-0.5 rounded">{demoEmail}</span></p>
                        <button
                            type="button"
                            onClick={() => copyToClipboard(demoEmail, 'email')}
                            className="p-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                            title="メールをコピー"
                        >
                            {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-emerald-500" />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                        <p className="text-emerald-600">
                            パスワード: <span className="font-mono bg-white px-2 py-0.5 rounded">{demoPassword}</span>
                        </p>
                        <button
                            type="button"
                            onClick={() => copyToClipboard(demoPassword, 'password')}
                            className="p-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                            title="パスワードをコピー"
                        >
                            {copiedPassword ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-emerald-500" />}
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => { setEmail(demoEmail); setPassword(demoPassword); }}
                        className="w-full bg-emerald-500 text-white font-bold py-2 rounded-lg hover:bg-emerald-600 transition-colors text-xs flex items-center justify-center gap-2"
                    >
                        <Zap className="w-4 h-4" />
                        デモ情報を自動入力
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-bold text-gray-700">パスワード</label>
                            <Link href="/forgot-password" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                                パスワードをお忘れですか？
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-gray-800 placeholder-gray-400 text-base"
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                title={showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                ログイン中...
                            </>
                        ) : (
                            <>
                                ログイン <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                    <p className="text-gray-500 text-sm">
                        アカウントをお持ちでないですか？{' '}
                        <Link href="/register" className="text-emerald-600 font-bold hover:text-emerald-700 underline decoration-2 decoration-transparent hover:decoration-emerald-600 transition-all">
                            無料で登録する
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
