'use client';

/**
 * お問い合わせ・ニュースレターフック
 * TODO: Supabaseに差し替え予定
 *
 * (ダミー) 実装
 */

import { useState, useCallback } from 'react';
import { isValidEmail } from '../lib/validation';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
}

export function useContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = useCallback(async (data: ContactFormData): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      // (ダミー) バリデーション
      if (!data.name || !data.email || !data.message) {
        throw new Error('必須項目を入力してください');
      }

      // メールアドレスのバリデーション
      if (!isValidEmail(data.email)) {
        throw new Error('有効なメールアドレスを入力してください');
      }

      // (ダミー) APIコール遅延をシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000));

      // (ダミー) お問い合わせ保存・メール送信
      console.log('[ダミー] お問い合わせ受信:', data);
      console.log('[ダミー] 確認メール送信:', data.email);
      console.log('[ダミー] 管理者通知メール送信');

      setIsSubmitted(true);
      setIsSubmitting(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '送信に失敗しました';
      setError(errorMessage);
      setIsSubmitting(false);
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setIsSubmitted(false);
    setError(null);
  }, []);

  return {
    isSubmitting,
    isSubmitted,
    error,
    submitContact,
    reset,
  };
}

export function useNewsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = useCallback(async (email: string): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      // メールアドレスのバリデーション
      if (!isValidEmail(email)) {
        throw new Error('有効なメールアドレスを入力してください');
      }

      // (ダミー) APIコール遅延をシミュレート
      await new Promise(resolve => setTimeout(resolve, 800));

      // (ダミー) ニュースレター登録
      console.log('[ダミー] ニュースレター登録:', email);

      // ローカルストレージに保存
      const subscribers = JSON.parse(localStorage.getItem('wellnavi_newsletter') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('wellnavi_newsletter', JSON.stringify(subscribers));
      }

      setIsSubscribed(true);
      setIsSubmitting(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '登録に失敗しました';
      setError(errorMessage);
      setIsSubmitting(false);
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setIsSubscribed(false);
    setError(null);
  }, []);

  return {
    isSubmitting,
    isSubscribed,
    error,
    subscribe,
    reset,
  };
}
