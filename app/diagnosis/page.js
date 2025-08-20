'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { diagnosisQuestions, products, categories } from '../data/mockData';

export default function DiagnosisPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const currentQuestion = diagnosisQuestions[currentStep];
  const progress = ((currentStep + 1) / diagnosisQuestions.length) * 100;

  const handleAnswer = (questionId, optionId) => {
    const newAnswers = { ...answers };
    
    if (currentQuestion.type === 'multiple') {
      if (!newAnswers[questionId]) {
        newAnswers[questionId] = [];
      }
      const index = newAnswers[questionId].indexOf(optionId);
      if (index > -1) {
        newAnswers[questionId].splice(index, 1);
      } else {
        newAnswers[questionId].push(optionId);
      }
    } else {
      newAnswers[questionId] = optionId;
    }
    
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentStep < diagnosisQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendations = () => {
    const recommendedCategoryIds = new Set();
    
    Object.entries(answers).forEach(([questionId, answerIds]) => {
      const question = diagnosisQuestions.find(q => q.id === questionId);
      if (question) {
        const selectedOptions = Array.isArray(answerIds) ? answerIds : [answerIds];
        selectedOptions.forEach(optionId => {
          const option = question.options.find(o => o.id === optionId);
          if (option?.relatedCategories) {
            option.relatedCategories.forEach(catId => recommendedCategoryIds.add(catId));
          }
        });
      }
    });

    const recommended = products.filter(product => 
      recommendedCategoryIds.has(product.category.id)
    ).slice(0, 3);

    if (recommended.length === 0) {
      setRecommendedProducts(products.slice(0, 3));
    } else {
      setRecommendedProducts(recommended);
    }
    
    setShowResult(true);
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setRecommendedProducts([]);
  };

  const isAnswerSelected = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === 'multiple') {
      return answer && answer.length > 0;
    }
    return !!answer;
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              診断結果
            </h1>
            <p className="text-lg text-gray-600">
              あなたにおすすめの商品をご紹介します
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={restart}
              className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition font-medium"
            >
              もう一度診断する
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm text-gray-500">
                質問 {currentStep + 1} / {diagnosisQuestions.length}
              </h2>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% 完了
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              {currentQuestion.question}
            </h1>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = currentQuestion.type === 'multiple'
                  ? answers[currentQuestion.id]?.includes(option.id)
                  : answers[currentQuestion.id] === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(currentQuestion.id, option.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={isSelected ? 'font-medium' : ''}>
                        {option.text}
                      </span>
                      {currentQuestion.type === 'multiple' && (
                        <div className={`w-5 h-5 rounded border-2 ${
                          isSelected
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <svg className="w-full h-full text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {currentQuestion.type === 'multiple' && (
              <p className="text-sm text-gray-500 mt-3">
                複数選択可能です
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-lg transition ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              前へ
            </button>

            <button
              onClick={handleNext}
              disabled={!isAnswerSelected()}
              className={`flex items-center px-6 py-3 rounded-lg transition font-medium ${
                !isAnswerSelected()
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              {currentStep === diagnosisQuestions.length - 1 ? '結果を見る' : '次へ'}
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}