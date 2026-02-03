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
import RadarChart from '../components/RadarChart';
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

            {/* Result Section - Zero-Base Rebuild for Storytelling */
              isComplete && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/50 backdrop-blur-sm -mx-4 md:mx-0 min-h-screen md:min-h-0"
                >
                  {/* 1. The Reveal (Header) */}
                  <div className="text-center py-10 px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="inline-block py-1 px-4 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm mb-4 tracking-wider">
                        DIAGNOSIS COMPLETE
                      </span>
                      <h2 className="text-gray-500 text-sm font-medium mb-1">あなたの健康タイプは...</h2>
                      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                          {result.mainCategory}
                        </span>
                      </h1>
                      <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
                        {result.message}
                      </p>
                    </motion.div>
                  </div>

                  {/* 2. Visual Proof (Radar Chart & Stats) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-[2.5rem] shadow-xl shadow-emerald-500/10 mx-4 md:mx-0 p-8 mb-8 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="flex-1 w-full max-w-xs">
                        <h3 className="text-center font-bold text-gray-400 text-xs tracking-widest mb-6">PERSONAL BALANCE</h3>
                        <RadarChart
                          data={[
                            { label: '休息', value: result.scores?.rest || 80, fullMark: 100 },
                            { label: '運動', value: result.scores?.activity || 40, fullMark: 100 },
                            { label: '栄養', value: result.scores?.nutrition || 60, fullMark: 100 },
                            { label: 'メンタル', value: result.scores?.mental || 50, fullMark: 100 },
                            { label: '環境', value: result.scores?.environment || 70, fullMark: 100 },
                          ]}
                        />
                      </div>

                      <div className="flex-1 w-full">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                          AI分析レポート
                        </h3>
                        <div className="space-y-4">
                          {result.tips.map((tip, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + (i * 0.1) }}
                              className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3"
                            >
                              <span className="flex-none w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs mt-0.5">
                                {i + 1}
                              </span>
                              <p className="text-gray-700 text-sm font-medium leading-relaxed">{tip}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* 3. The Prescription (Solution) */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="px-4 md:px-0 mb-24"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">あなたへの処方箋</h3>
                      <Link href="/products" className="text-emerald-600 text-sm font-bold flex items-center hover:underline">
                        すべて見る <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>

                    {result.recommendedProducts.length > 0 ? (
                      <div className="grid gap-6">
                        {result.recommendedProducts.slice(0, 1).map(product => (
                          <Link key={product.id} href={`/products/${product.id}`} className="block group">
                            <div className="bg-white rounded-3xl p-4 shadow-xl shadow-gray-200/50 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 relative overflow-hidden">
                              <div className="absolute top-0 left-0 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-br-2xl z-20">
                                MATCH 98%
                              </div>
                              <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-48 aspect-video md:aspect-square rounded-2xl overflow-hidden relative">
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                  />
                                </div>
                                <div className="flex-1 py-2">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">必須</span>
                                    <span className="text-xs text-gray-500">{product.category.name}</span>
                                  </div>
                                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                    {product.name}
                                  </h4>
                                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                    {product.description}
                                  </p>
                                  <div className="flex items-center justify-between mt-auto">
                                    <span className="font-bold text-lg text-gray-900">
                                      {product.price === 0 ? '無料体験' : `¥${product.price.toLocaleString()}`}
                                    </span>
                                    <span className="bg-gray-900 text-white px-6 py-2 rounded-full font-bold text-sm group-hover:bg-emerald-600 transition-colors">
                                      詳細を見る
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                        {/* Secondary Recommendations */}
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {result.recommendedProducts.slice(1, 3).map(product => (
                            <Link key={product.id} href={`/products/${product.id}`} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
                              <div className="aspect-video relative rounded-xl overflow-hidden mb-3">
                                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                              </div>
                              <h5 className="font-bold text-gray-800 text-sm line-clamp-1 mb-1">{product.name}</h5>
                              <p className="text-emerald-600 font-bold text-xs mt-auto">マッチ度 85%</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                        <p className="text-gray-500">条件に一致する体験が見つかりませんでした。</p>
                      </div>
                    )}

                    <div className="mt-12 flex justify-center">
                      <button
                        onClick={resetQuiz}
                        className="text-gray-400 hover:text-gray-600 font-bold text-sm flex items-center gap-2 transition-colors px-6 py-3 rounded-full hover:bg-gray-100"
                      >
                        <RefreshCw className="w-4 h-4" />
                        診断をやり直す
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}