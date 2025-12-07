'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, RefreshCw, CheckCircle, ArrowRight, Activity, Moon, Sun, Heart, ChevronLeft,
  Frown, Battery, Sofa, Users, User, Clock, Briefcase, Home, Brain, Scale, Sparkles, Smartphone, Stethoscope
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { useDiagnosis } from '../hooks/useDiagnosis';

export default function DiagnosisPage() {
  // フック接続
  const {
    currentStep,
    currentQuestion,
    totalSteps,
    progress,
    result,
    isComplete,
    answerQuestion,
    goBack,
    reset,
  } = useDiagnosis();

  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const handleAnswer = (option) => {
    if (currentStep < totalSteps - 1) {
      answerQuestion(option.value);
    } else {
      // 最後の質問の場合、診断中表示を挟む
      setIsDiagnosing(true);
      setTimeout(() => {
        answerQuestion(option.value);
        setIsDiagnosing(false);
      }, 1500);
    }
  };

  const resetQuiz = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <PageHero
        title="AI Health Check"
        subtitle="AIヘルスチェック診断"
        image="/images/hero-diagnosis.png"
        description="3つの質問に答えるだけで、今のあなたに最適な健康体験をご提案します。AIがあなたの状態を分析し、パーソナライズされたプランを導き出します。"
      />

      <div className="container mx-auto px-4 max-w-2xl -mt-10 relative z-20">

        <div className="relative min-h-[500px]">
          <AnimatePresence mode='wait'>
            {/* Quiz Section */}
            {!isComplete && !isDiagnosing && currentQuestion && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl shadow-xl shadow-emerald-500/10 border border-gray-100 p-8"
              >
                <div className="mb-8">
                  <div className="flex justify-between text-sm font-bold text-gray-400 mb-2">
                    <span>QUESTION {currentStep + 1}</span>
                    <span>{currentStep + 1} / {totalSteps}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500"
                      initial={{ width: `${((currentStep) / totalSteps) * 100}%` }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* 戻るボタン */}
                {currentStep > 0 && (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-1 text-gray-500 hover:text-emerald-600 text-sm mb-4 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    前の質問に戻る
                  </button>
                )}

                <h2 className="text-xl font-bold text-gray-800 mb-4 leading-relaxed">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-4">
                  {currentQuestion.options.map((option, idx) => {
                    // Icon mapping based on value
                    const getIcon = (val) => {
                      switch (val) {
                        case 'fatigue': return <Battery className="w-5 h-5" />;
                        case 'stress': return <Frown className="w-5 h-5" />;
                        case 'sleep': return <Moon className="w-5 h-5" />;
                        case 'posture': return <Activity className="w-5 h-5" />;
                        case 'weight': return <Scale className="w-5 h-5" />;
                        case 'skin': return <Sparkles className="w-5 h-5" />;

                        case 'desk': return <Briefcase className="w-5 h-5" />;
                        case 'active': return <Activity className="w-5 h-5" />;
                        case 'home': return <Home className="w-5 h-5" />;
                        case 'busy': return <Clock className="w-5 h-5" />;

                        case 'device': return <Smartphone className="w-5 h-5" />;
                        case 'relax': return <Sofa className="w-5 h-5" />;
                        case 'fitness': return <Activity className="w-5 h-5" />;
                        case 'checkup': return <Stethoscope className="w-5 h-5" />;

                        case 'short': return <Activity className="w-5 h-5" />;
                        case 'medium': return <Clock className="w-5 h-5" />;
                        case 'long': return <Sun className="w-5 h-5" />;

                        case 'alone': return <User className="w-5 h-5" />;
                        case 'partner': return <Users className="w-5 h-5" />;
                        case 'family': return <Home className="w-5 h-5" />;
                        case 'friends': return <Users className="w-5 h-5" />;
                        default: return <span className="text-lg font-bold">{String.fromCharCode(65 + idx)}</span>;
                      }
                    };

                    return (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(option)}
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 group flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          {getIcon(option.value)}
                        </div>
                        <span className="font-bold text-gray-700 group-hover:text-emerald-700">
                          {option.label}
                        </span>
                        <ChevronRight className="w-5 h-5 ml-auto text-gray-300 group-hover:text-emerald-500" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Loading/Diagnosing State */}
            {isDiagnosing && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl z-10"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full mb-6"
                />
                <h3 className="text-xl font-bold text-gray-800 animate-pulse">
                  最適なプランを分析中...
                </h3>
              </motion.div>
            )}

            {/* Result Section */}
            {isComplete && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-2xl shadow-emerald-500/20 border border-emerald-100 overflow-hidden"
              >
                <div className="relative h-48 bg-emerald-600">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <span className="text-emerald-100 font-bold tracking-wider text-sm mb-2">DIAGNOSIS RESULT</span>
                    <h2 className="text-3xl font-bold mb-2">{result.mainCategory}</h2>
                    <div className="w-16 h-1 bg-white/50 rounded-full" />
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-8 text-center">
                    {result.message}
                  </p>

                  {/* ヒント */}
                  <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      健康アドバイス
                    </h3>
                    <ul className="space-y-3">
                      {result.tips.map((tip, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700 bg-white p-3 rounded-lg shadow-sm border border-emerald-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* おすすめ商品 */}
                  {result.recommendedProducts.length > 0 && (
                    <div className="mb-8">
                      <h3 className="font-bold text-gray-800 mb-4">おすすめの体験</h3>
                      <div className="grid gap-4">
                        {result.recommendedProducts.slice(0, 3).map(product => (
                          <Link key={product.id} href={`/products/${product.id}`}>
                            <div className="flex items-center gap-4 p-4 border rounded-xl hover:border-emerald-500 hover:shadow-md transition">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative flex-shrink-0">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800">{product.name}</h4>
                                <p className="text-sm text-gray-500">{product.category.name}</p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-gray-300" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/products"
                      className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 hover:translate-y-px transition-all flex items-center justify-center gap-2 group"
                    >
                      すべての体験を見る
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button
                      onClick={resetQuiz}
                      className="w-full bg-white text-gray-500 font-bold py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      もう一度診断する
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}