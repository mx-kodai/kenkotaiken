'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar as CalendarIcon, MapPin, Clock, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../components/PageHero';
import { useEventCalendar, getEventStatus, formatEventDate } from '../hooks/useEventCalendar';

export default function EventsPage() {
  // フック接続
  const {
    currentMonth,
    selectedDate,
    filter,
    today,
    calendarDays,
    filteredEvents,
    eventsThisMonth,
    availableCities,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    clearSelection,
    setFilter,
  } = useEventCalendar();

  const filters = [
    { value: 'all', label: 'すべて' },
    { value: 'weekend', label: '土日開催' },
    { value: 'weekday', label: '平日開催' },
    { value: 'no-reservation', label: '予約不要' },
    { value: 'free', label: '無料' }
  ];

  // フックから取得したカレンダー日付を使って表示
  const renderCalendarDays = () => {
    return calendarDays.map((day, index) => {
      const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString();

      return (
        <button
          key={index}
          onClick={() => day.isCurrentMonth && day.hasEvent && selectDate(day.date)}
          disabled={!day.isCurrentMonth}
          className={`h-10 w-10 md:h-12 md:w-12 flex items-center justify-center relative ${!day.isCurrentMonth ? 'opacity-30' : ''
            }`}
        >
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${day.isToday ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' :
              isSelected ? 'bg-emerald-400 text-white' :
                day.hasEvent ? 'bg-white text-gray-800 border-2 border-emerald-400 font-bold cursor-pointer hover:bg-emerald-50' : 'text-gray-400'
            }`}>
            {day.day}
          </div>
          {day.hasEvent && !day.isToday && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-emerald-500 rounded-full"></div>}
        </button>
      );
    });
  };

  // イベントステータスの取得（フックからインポートした関数を使用）
  const getEventStatusLocal = (event) => {
    return getEventStatus(event.remainingSlots, event.capacity);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHero
        title="Active Events"
        subtitle="体験イベント"
        image="/images/hero-events.png"
        description="ショッピングモールや特設会場で開催される、期間限定の健康体験イベント情報。家族や友人と一緒に楽しめるコンテンツが満載です。"
      />

      <div className="container mx-auto px-4 py-12 relative z-10 -mt-10">

        {/* Calendar and Highlight Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Calendar Widget */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-500/5"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-emerald-500" />
                Event Calendar
              </h2>
              <div className="flex gap-2">
                <button onClick={goToPrevMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition"><ChevronLeft className="w-5 h-5" /></button>
                <span className="text-gray-800 font-bold py-2">{currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月</span>
                <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 text-center text-xs font-bold text-gray-400">
              <div>日</div><div>月</div><div>火</div><div>水</div><div>木</div><div>金</div><div>土</div>
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-2 justify-items-center">
              {renderCalendarDays()}
            </div>
          </motion.div>

          {/* Featured Event / Highlight */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-emerald-500/20 group"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse"></div>
            <div className="relative z-10 flex flex-col items-start h-full justify-between">
              <div>
                <span className="bg-white text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block shadow-sm">PICK UP</span>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                  今週末の<br />注目イベント
                </h2>
                <p className="text-emerald-50 max-w-lg mb-8 font-medium">
                  最新の睡眠改善デバイス体験会が、イオンモール高岡で開催されます。
                  専門家による無料相談も実施中。
                </p>
              </div>
              <Link href="#events-list" className="bg-white text-emerald-800 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition shadow-lg flex items-center gap-2 group-hover:px-10 duration-300">
                イベント一覧を見る <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div id="events-list" className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter({ ...filter, type: f.value })}
              className={`px-6 py-3 rounded-full font-bold transition-all border ${filter.type === f.value
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/30'
                : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-500 hover:text-emerald-600 scroll-mt-24'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 選択した日付の表示とクリア */}
        {selectedDate && (
          <div className="flex justify-center mb-8">
            <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full flex items-center gap-2 font-bold">
              <CalendarIcon className="w-4 h-4" />
              <span>{formatEventDate(selectedDate)} のイベント</span>
              <button onClick={clearSelection} className="ml-2 hover:bg-emerald-200 rounded-full w-5 h-5 flex items-center justify-center transition">×</button>
            </div>
          </div>
        )}

        {filteredEvents.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <CalendarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl font-bold text-gray-500 mb-2">現在開催予定のイベントはありません</p>
            <p className="text-gray-400">新しいイベント情報は随時更新いたします</p>
          </div>
        )}

        <div className="grid gap-8 max-w-5xl mx-auto">
          {filteredEvents.map((event, index) => {
            const status = getEventStatusLocal(event);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 group md:flex h-full md:h-[320px] hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
              >
                {/* Image Section */}
                <div className="md:w-2/5 relative h-64 md:h-full overflow-hidden">
                  <Image
                    src={event.images[0]}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-none opacity-60" />

                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {event.isWeekendEvent && (
                      <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        週末限定
                      </span>
                    )}
                    {event.price === 0 && (
                      <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        無料
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-8 flex flex-col justify-between relative">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-sm font-bold text-emerald-600 mb-1 flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        {formatEventDate(event.startDate)}
                        {event.startDate.getTime() !== event.endDate.getTime() && ` - ${formatEventDate(event.endDate)}`}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold border ${status.bg} ${status.color} ${status.border}`}>
                        {status.label}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        {event.venue} ({event.city})
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        {event.timeSlots[0]}〜
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-emerald-500" />
                        定員{event.capacity}名
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex gap-2">
                      {event.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/30"
                    >
                      詳細・予約 <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}