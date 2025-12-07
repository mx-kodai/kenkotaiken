'use client';

/**
 * 健康診断ロジックフック
 * TODO: AIサービス連携予定
 *
 * (ダミー) 実装 - ルールベースの診断
 */

import { useState, useCallback } from 'react';
import { products } from '../data/mockData';

// 診断の質問
export interface DiagnosisQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; icon?: string }[];
}

export const diagnosisQuestions: DiagnosisQuestion[] = [
  {
    id: 'concern',
    question: '今、一番気になっている健康の悩みは？',
    options: [
      { value: 'fatigue', label: '疲れやすい・だるい' },
      { value: 'stress', label: 'ストレスが溜まっている' },
      { value: 'sleep', label: '睡眠の質が悪い' },
      { value: 'posture', label: '肩こり・腰痛' },
      { value: 'weight', label: '体重・体型が気になる' },
      { value: 'skin', label: '肌の調子が悪い' },
    ],
  },
  {
    id: 'lifestyle',
    question: 'あなたのライフスタイルは？',
    options: [
      { value: 'desk', label: 'デスクワークが多い' },
      { value: 'active', label: '体を動かすことが多い' },
      { value: 'home', label: '家にいることが多い' },
      { value: 'busy', label: '忙しくて時間がない' },
    ],
  },
  {
    id: 'experience',
    question: 'どんな体験に興味がありますか？',
    options: [
      { value: 'device', label: '健康機器を試したい' },
      { value: 'relax', label: 'リラクゼーション' },
      { value: 'fitness', label: '運動・フィットネス' },
      { value: 'checkup', label: '健康チェック・測定' },
    ],
  },
  {
    id: 'time',
    question: '体験に使える時間は？',
    options: [
      { value: 'short', label: '30分以内' },
      { value: 'medium', label: '1時間程度' },
      { value: 'long', label: '2時間以上OK' },
    ],
  },
  {
    id: 'company',
    question: '誰と体験したいですか？',
    options: [
      { value: 'alone', label: '一人で' },
      { value: 'partner', label: 'パートナーと' },
      { value: 'family', label: '家族と' },
      { value: 'friends', label: '友人と' },
    ],
  },
];

// 診断結果の型
export interface DiagnosisResult {
  mainCategory: string;
  subCategories: string[];
  recommendedProducts: typeof products;
  message: string;
  tips: string[];
}

// 診断ロジック（ルールベース）
function calculateDiagnosis(answers: Record<string, string>): DiagnosisResult {
  const categoryScores: Record<string, number> = {
    '健康診断・測定': 0,
    'フィットネス・運動': 0,
    'リラクゼーション': 0,
    'メンタルケア': 0,
  };

  // 悩みに基づくスコア
  switch (answers.concern) {
    case 'fatigue':
    case 'stress':
      categoryScores['メンタルケア'] += 3;
      categoryScores['リラクゼーション'] += 2;
      break;
    case 'sleep':
      categoryScores['リラクゼーション'] += 3;
      categoryScores['メンタルケア'] += 2;
      break;
    case 'posture':
      categoryScores['フィットネス・運動'] += 3;
      categoryScores['リラクゼーション'] += 2;
      break;
    case 'weight':
      categoryScores['フィットネス・運動'] += 3;
      categoryScores['健康診断・測定'] += 2;
      break;
    case 'skin':
      categoryScores['リラクゼーション'] += 3;
      categoryScores['健康診断・測定'] += 1;
      break;
  }

  // 興味に基づくスコア
  switch (answers.experience) {
    case 'device':
      categoryScores['健康診断・測定'] += 3;
      break;
    case 'relax':
      categoryScores['リラクゼーション'] += 3;
      break;
    case 'fitness':
      categoryScores['フィットネス・運動'] += 3;
      break;
    case 'checkup':
      categoryScores['健康診断・測定'] += 3;
      break;
  }

  // ライフスタイルに基づくスコア
  switch (answers.lifestyle) {
    case 'desk':
      categoryScores['フィットネス・運動'] += 1;
      categoryScores['リラクゼーション'] += 1;
      break;
    case 'active':
      categoryScores['健康診断・測定'] += 1;
      break;
    case 'home':
      categoryScores['健康診断・測定'] += 1;
      break;
    case 'busy':
      categoryScores['リラクゼーション'] += 2;
      break;
  }

  // スコアをソートしてトップカテゴリを取得
  const sortedCategories = Object.entries(categoryScores)
    .sort((a, b) => b[1] - a[1]);

  const mainCategory = sortedCategories[0][0];
  const subCategories = sortedCategories.slice(1, 3).map(c => c[0]);

  // カテゴリに基づいて商品をフィルタリング
  // カテゴリに基づいて商品をフィルタリング
  const recommendedProducts = products
    .filter(p => p.category.name === mainCategory || subCategories.includes(p.category.name))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  // メッセージとヒントを生成
  const messages: Record<string, string> = {
    '健康診断・測定': 'あなたには健康チェックから始めることをおすすめします！自分の体の状態を知ることで、より効果的な健康管理ができます。',
    'フィットネス・運動': '体を動かすことがあなたの健康維持に最適です！無理なく続けられる運動体験から始めてみましょう。',
    'リラクゼーション': 'まずはリラックスすることが大切です！心身のリフレッシュで、健康的な毎日を送りましょう。',
    'メンタルケア': '心の健康を整えることから始めましょう！ストレス解消や心のケアが、体の健康にもつながります。',
  };

  const tips: Record<string, string[]> = {
    '健康診断・測定': [
      '定期的な測定で変化を把握しましょう',
      '数値の記録をつけると効果的です',
      '気になる数値は専門家に相談を',
    ],
    'フィットネス・運動': [
      '週2-3回から始めてみましょう',
      '無理のない強度で継続が大切',
      '運動前後のストレッチを忘れずに',
    ],
    'リラクゼーション': [
      '自分へのご褒美時間を作りましょう',
      '呼吸を意識するだけでもリラックス効果',
      '定期的なケアで効果アップ',
    ],
    'メンタルケア': [
      '睡眠時間を十分に確保しましょう',
      '自分の感情を否定せず受け入れて',
      '一人で抱え込まないことが大切',
    ],
  };

  return {
    mainCategory,
    subCategories,
    recommendedProducts,
    message: messages[mainCategory],
    tips: tips[mainCategory],
  };
}

export function useDiagnosis() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = diagnosisQuestions[currentStep];
  const totalSteps = diagnosisQuestions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const answerQuestion = useCallback((value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 診断完了
      const diagnosisResult = calculateDiagnosis(newAnswers);
      setResult(diagnosisResult);
      setIsComplete(true);
    }
  }, [answers, currentQuestion, currentStep, totalSteps]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setIsComplete(false);
  }, []);

  return {
    currentStep,
    currentQuestion,
    totalSteps,
    progress,
    answers,
    result,
    isComplete,
    answerQuestion,
    goBack,
    reset,
  };
}
