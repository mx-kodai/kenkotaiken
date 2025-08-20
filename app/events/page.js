'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock, Users, AlertCircle, CheckCircle, Phone, Mail, Tag, Star } from 'lucide-react';
import { experienceEvents } from '../data/mockData';

export default function EventsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const today = new Date();
  
  const upcomingEvents = experienceEvents.filter(event => 
    event.startDate >= today
  );

  const filteredEvents = upcomingEvents.filter(event => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'weekend') return event.isWeekendEvent;
    if (selectedFilter === 'weekday') return !event.isWeekendEvent;
    if (selectedFilter === 'no-reservation') return !event.registrationRequired;
    return true;
  });

  const filters = [
    { value: 'all', label: 'すべて' },
    { value: 'weekend', label: '土日開催' },
    { value: 'weekday', label: '平日開催' },
    { value: 'no-reservation', label: '予約不要' }
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('ja-JP', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  const getEventStatus = (event) => {
    const ratio = event.remainingSlots / event.capacity;
    if (ratio > 0.7) return { status: 'plenty', color: 'text-green-600', bg: 'bg-green-100' };
    if (ratio > 0.3) return { status: 'limited', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'few', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-white">期間限定イベント</h1>
            <p className="text-lg text-white/90 mb-6">
              富山県内のショッピングモールで開催される特別な健康体験イベント！
              お買い物ついでにカップル・ご家族でお気軽にどうぞ
            </p>
            <div className="bg-white/20 rounded-lg p-4 inline-block">
              <p className="text-white font-semibold">
                🛍️ ショッピングついでに健康体験 🛍️
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedFilter === filter.value
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-pink-50 border'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">現在開催予定のイベントはありません</p>
            <p className="text-sm text-gray-400">新しいイベント情報は随時更新いたします</p>
          </div>
        )}

        <div className="space-y-6">
          {filteredEvents.map(event => {
            const status = getEventStatus(event);
            return (
              <div key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="aspect-video md:aspect-[4/3] relative bg-gray-100">
                      <Image
                        src={event.images[0]}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        {event.price === 0 && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-semibold">
                            無料
                          </span>
                        )}
                        {event.isWeekendEvent && (
                          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                            週末開催
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 flex-1">
                        {event.title}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color} ml-4`}>
                        残り{event.remainingSlots}枠
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium">{event.venue}</div>
                            <div className="text-xs">{event.city}</div>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>
                            {formatDate(event.startDate)} 
                            {event.startDate.getTime() !== event.endDate.getTime() && 
                              ` - ${formatDate(event.endDate)}`
                            }
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{event.timeSlots.join(', ')}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          <span>定員{event.capacity}名</span>
                        </div>

                        {event.registrationRequired ? (
                          <div className="flex items-center text-sm text-orange-600">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <span className="font-medium">要予約</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span className="font-medium">予約不要・当日参加OK</span>
                          </div>
                        )}

                        {event.contact.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{event.contact.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        主催: {event.organizer.name}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {event.registrationRequired && (
                          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition text-sm font-medium">
                            予約・詳細
                          </button>
                        )}
                        <Link
                          href={`/events/${event.id}`}
                          className="border border-pink-500 text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-50 transition text-sm font-medium"
                        >
                          詳しく見る
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-pink-100 to-orange-100 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🛍️ ショッピングモールでの健康体験の魅力
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <Users className="h-8 w-8 text-pink-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">家族みんなで楽しめる</h3>
                <p className="text-sm text-gray-600">
                  お子様連れでも安心。買い物ついでに家族の健康チェック
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <MapPin className="h-8 w-8 text-pink-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">アクセス抜群</h3>
                <p className="text-sm text-gray-600">
                  駐車場完備の大型ショッピングモールだから車でのアクセスも便利
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <Tag className="h-8 w-8 text-pink-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">特別価格</h3>
                <p className="text-sm text-gray-600">
                  イベント限定の特別価格や無料体験をご用意しています
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}