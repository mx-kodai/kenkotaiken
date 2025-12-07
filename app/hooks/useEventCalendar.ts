/**
 * イベントカレンダー用フック
 * カレンダー表示、イベントフィルタリング、日付選択を管理
 *
 * (ダミー) mockDataからイベントを取得
 * 本番ではSupabaseからデータ取得に差し替え
 */

import { useState, useCallback, useMemo } from 'react';
import { experienceEvents } from '../data/mockData';

// ============================================
// 型定義
// ============================================

export interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvent: boolean;
  events: typeof experienceEvents;
}

export interface EventFilter {
  type: 'all' | 'weekend' | 'weekday' | 'no-reservation' | 'free';
  city?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface EventStatus {
  label: string;
  color: string;
  bg: string;
  border: string;
}

// ============================================
// ヘルパー関数
// ============================================

// 日付が同じかどうかをチェック
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// 日付が範囲内かどうかをチェック
const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return d >= s && d <= e;
};

// 月の日数を取得
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// 月の最初の曜日を取得（0:日曜 ～ 6:土曜）
const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

// イベントのステータスを取得
export const getEventStatus = (remainingSlots: number, capacity: number): EventStatus => {
  const ratio = remainingSlots / capacity;
  if (ratio > 0.7) {
    return {
      label: '空きあり',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
    };
  }
  if (ratio > 0.3) {
    return {
      label: '残りわずか',
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
      border: 'border-yellow-400/20',
    };
  }
  if (ratio > 0) {
    return {
      label: 'あと少し',
      color: 'text-orange-400',
      bg: 'bg-orange-400/10',
      border: 'border-orange-400/20',
    };
  }
  return {
    label: 'キャンセル待ち',
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/20',
  };
};

// 日付をフォーマット
export const formatEventDate = (date: Date): string => {
  return date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
};

// ============================================
// メインフック
// ============================================

export function useEventCalendar() {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filter, setFilter] = useState<EventFilter>({ type: 'all' });

  // 前月へ移動
  const goToPrevMonth = useCallback(() => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  // 次月へ移動
  const goToNextMonth = useCallback(() => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  // 今月へ戻る
  const goToToday = useCallback(() => {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  }, [today]);

  // 特定の月へ移動
  const goToMonth = useCallback((year: number, month: number) => {
    setCurrentMonth(new Date(year, month, 1));
  }, []);

  // 日付選択
  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // 選択解除
  const clearSelection = useCallback(() => {
    setSelectedDate(null);
  }, []);

  // カレンダーグリッドの日付を生成
  const calendarDays = useMemo((): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: CalendarDay[] = [];

    // 前月の日を追加（グレーアウト表示用）
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      days.push({
        date,
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
        events: [],
      });
    }

    // 当月の日を追加
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const eventsOnDay = experienceEvents.filter(event =>
        isDateInRange(date, event.startDate, event.endDate)
      );

      days.push({
        date,
        day,
        isCurrentMonth: true,
        isToday: isSameDay(date, today),
        hasEvent: eventsOnDay.length > 0,
        events: eventsOnDay,
      });
    }

    // 次月の日を追加（6週分になるまで）
    const remainingDays = 42 - days.length; // 6週 x 7日 = 42
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        day: i,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
        events: [],
      });
    }

    return days;
  }, [currentMonth, today]);

  // フィルター済みイベント一覧
  const filteredEvents = useMemo(() => {
    let events = experienceEvents.filter(event => event.startDate >= today);

    // 日付選択がある場合、その日のイベントのみ
    if (selectedDate) {
      events = events.filter(event =>
        isDateInRange(selectedDate, event.startDate, event.endDate)
      );
    }

    // フィルタータイプ
    switch (filter.type) {
      case 'weekend':
        events = events.filter(event => event.isWeekendEvent);
        break;
      case 'weekday':
        events = events.filter(event => !event.isWeekendEvent);
        break;
      case 'no-reservation':
        events = events.filter(event => !event.registrationRequired);
        break;
      case 'free':
        events = events.filter(event => event.price === 0);
        break;
    }

    // 都市フィルター
    if (filter.city) {
      events = events.filter(event => event.city === filter.city);
    }

    // 日付範囲フィルター
    if (filter.dateRange) {
      events = events.filter(event =>
        isDateInRange(event.startDate, filter.dateRange!.start, filter.dateRange!.end) ||
        isDateInRange(event.endDate, filter.dateRange!.start, filter.dateRange!.end)
      );
    }

    return events;
  }, [selectedDate, filter, today]);

  // 選択日のイベント
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return experienceEvents.filter(event =>
      isDateInRange(selectedDate, event.startDate, event.endDate)
    );
  }, [selectedDate]);

  // 今月のイベント数
  const eventsThisMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);

    return experienceEvents.filter(event =>
      isDateInRange(event.startDate, monthStart, monthEnd) ||
      isDateInRange(event.endDate, monthStart, monthEnd)
    ).length;
  }, [currentMonth]);

  // 利用可能な都市リスト
  const availableCities = useMemo(() => {
    const cities = new Set(experienceEvents.map(event => event.city));
    return Array.from(cities).sort();
  }, []);

  return {
    // 状態
    currentMonth,
    selectedDate,
    filter,
    today,

    // カレンダーデータ
    calendarDays,

    // イベントデータ
    filteredEvents,
    selectedDateEvents,
    eventsThisMonth,
    availableCities,

    // アクション
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    goToMonth,
    selectDate,
    clearSelection,
    setFilter,
  };
}

// ============================================
// イベント詳細用フック
// ============================================

export function useEventDetail(eventId: string) {
  const event = useMemo(() => {
    return experienceEvents.find(e => e.id === eventId);
  }, [eventId]);

  const relatedEvents = useMemo(() => {
    if (!event) return [];
    // 同じ都市または同じタグのイベントを取得
    return experienceEvents
      .filter(e =>
        e.id !== eventId &&
        (e.city === event.city || e.tags.some(tag => event.tags.includes(tag)))
      )
      .slice(0, 3);
  }, [event, eventId]);

  const status = useMemo(() => {
    if (!event) return null;
    return getEventStatus(event.remainingSlots, event.capacity);
  }, [event]);

  const isUpcoming = useMemo(() => {
    if (!event) return false;
    return event.startDate >= new Date();
  }, [event]);

  const daysUntilEvent = useMemo(() => {
    if (!event) return null;
    const today = new Date();
    const diffTime = event.startDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : null;
  }, [event]);

  return {
    event,
    relatedEvents,
    status,
    isUpcoming,
    daysUntilEvent,
  };
}

// ============================================
// イベント予約用フック
// ============================================

export function useEventReservation(eventId: string) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const event = experienceEvents.find(e => e.id === eventId);

  const availableSlots = useMemo(() => {
    if (!event) return [];
    // (ダミー) 各タイムスロットの空き状況をシミュレート
    return event.timeSlots.map(slot => ({
      time: slot,
      available: Math.floor(Math.random() * 10) + 1, // ダミー: ランダムな空き
    }));
  }, [event]);

  const reserve = useCallback(async (contactInfo: {
    name: string;
    email: string;
    phone: string;
  }) => {
    if (!selectedTimeSlot) {
      setError('時間帯を選択してください');
      return false;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // (ダミー) 予約処理をシミュレート
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('(ダミー) イベント予約:', {
        eventId,
        timeSlot: selectedTimeSlot,
        numberOfPeople,
        contactInfo,
      });

      setIsReserved(true);
      return true;
    } catch (err) {
      setError('予約に失敗しました。もう一度お試しください。');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [eventId, selectedTimeSlot, numberOfPeople]);

  const reset = useCallback(() => {
    setSelectedTimeSlot(null);
    setNumberOfPeople(1);
    setIsReserved(false);
    setError(null);
  }, []);

  return {
    event,
    selectedTimeSlot,
    numberOfPeople,
    availableSlots,
    isSubmitting,
    isReserved,
    error,
    setSelectedTimeSlot,
    setNumberOfPeople,
    reserve,
    reset,
  };
}
