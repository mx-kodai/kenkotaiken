'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPasswordPage() {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await resetPassword(email);
            if (result.success) {
                setIsSubmitted(true);
            } else {
                setError(result.error || 'エラーが発生しました');
            }
        } catch (err) {
            setError('エラーが発生しました。もう一度お試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative"
            >
                {!isSubmitted ? (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">パスワードの再設定</h1>
                            <p className="text-gray-500 text-sm">
                                登録したメールアドレスを入力してください。<br />
                                再設定用のリンクをお送りします。
                            </p>
                        </div>

                        {/* (ダミー) 注意書き */}
                        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                            デモ版のため、実際のメールは送信されません。送信完了画面のみ表示されます。
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
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-base"
                                        placeholder="hello@example.com"
                                        required
                                        autoFocus
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 hover:translate-y-px transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        送信中...
                                    </>
                                ) : (
                                    <>
                                        メールを送信する <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <Link href="/login" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                ログイン画面に戻る
                            </Link>
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                    >
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">送信しました</h2>
                        <p className="text-gray-600 mb-8 text-sm">
                            <span className="font-bold text-gray-800">{email}</span> 宛に<br />
                            パスワード再設定のメールをお送りしました。<br />
                            メールをご確認の上、手続きを進めてください。
                        </p>
                        <p className="text-xs text-gray-400 mb-6">
                            ※デモ版のため、実際のメールは送信されていません
                        </p>
                        <Link
                            href="/login"
                            className="bg-gray-100 text-gray-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-200 transition-colors inline-block"
                        >
                            ログイン画面へ
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
