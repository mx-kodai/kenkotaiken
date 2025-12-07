'use client';

/**
 * 予約フック
 * TODO: Supabaseに差し替え予定
 *
 * (ダミー) 実装 - ローカルストレージベース
 */

import { useState, useCallback } from 'react';

export interface ReservationData {
  itemId: string;
  itemType: 'location' | 'event';
  itemName: string;
  date: string;
  time: string;
  numberOfPeople: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface Reservation extends ReservationData {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

const RESERVATIONS_STORAGE_KEY = 'wellnavi_reservations'; // (ダミー)

export function useReservation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getReservations = useCallback((): Reservation[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  }, []);

  const createReservation = useCallback(async (data: ReservationData): Promise<{ success: boolean; reservation?: Reservation; error?: string }> => {
    setIsSubmitting(true);
    setError(null);

    try {
      // (ダミー) バリデーション
      if (!data.name || !data.email || !data.phone) {
        throw new Error('必須項目を入力してください');
      }

      if (!data.date || !data.time) {
        throw new Error('日時を選択してください');
      }

      // (ダミー) APIコール遅延をシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newReservation: Reservation = {
        ...data,
        id: `res-${Date.now()}`,
        status: 'pending',
        createdAt: new Date(),
      };

      // ローカルストレージに保存
      const existing = getReservations();
      const updated = [...existing, newReservation];
      localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(updated));

      // (ダミー) 確認メール送信をシミュレート
      console.log('[ダミー] 予約確認メール送信:', data.email);

      setIsSubmitting(false);
      return { success: true, reservation: newReservation };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '予約に失敗しました';
      setError(errorMessage);
      setIsSubmitting(false);
      return { success: false, error: errorMessage };
    }
  }, [getReservations]);

  const cancelReservation = useCallback(async (reservationId: string): Promise<boolean> => {
    const existing = getReservations();
    const updated = existing.map(r =>
      r.id === reservationId ? { ...r, status: 'cancelled' as const } : r
    );
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(updated));

    // (ダミー) キャンセル確認メール送信
    console.log('[ダミー] キャンセル確認メール送信');

    return true;
  }, [getReservations]);

  return {
    isSubmitting,
    error,
    createReservation,
    cancelReservation,
    getReservations,
  };
}
