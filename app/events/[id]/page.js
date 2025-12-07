'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Phone, Mail, Tag, Star, Heart, Share2, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { experienceEvents } from '../../data/mockData';
import { useLikes, useFavorites } from '../../hooks/useFavorites';
import { useShare } from '../../hooks/useShare';
import { useEventReservation } from '../../hooks/useEventCalendar';

export default function EventDetailPage({ params }) {
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: 1
  });

  // フック接続
  const { isLiked, likeCount, toggleLike, isLoading: likeLoading } = useLikes(params.id, 'event');
  const { isFavorite, toggleFavorite, isLoading: favoriteLoading } = useFavorites(params.id, 'event');
  const { shareToTwitter, shareToFacebook, shareToLine, copyLink } = useShare();
  const { reserve, isSubmitting: reservationSubmitting, isReserved, error: reservationError } = useEventReservation(params.id);
  
  const event = experienceEvents.find(e => e.id === params.id);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">イベントが見つかりません</h1>
          <Link href="/events" className="text-emerald-600 hover:text-emerald-700">
            イベント一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const today = new Date();
  const isUpcoming = event.startDate >= today;
  const isPast = event.endDate < today;
  const isOngoing = event.startDate <= today && event.endDate >= today;

  const getEventStatus = () => {
    const ratio = event.remainingSlots / event.capacity;
    if (ratio > 0.7) return { status: 'plenty', color: 'text-green-600', bg: 'bg-green-100', text: '空きあり' };
    if (ratio > 0.3) return { status: 'limited', color: 'text-yellow-600', bg: 'bg-yellow-100', text: '残りわずか' };
    if (ratio > 0) return { status: 'few', color: 'text-red-600', bg: 'bg-red-100', text: '残りわずか' };
    return { status: 'full', color: 'text-gray-600', bg: 'bg-gray-100', text: '満席' };
  };

  const statusInfo = getEventStatus();

  // シェア処理
  const handleShare = (platform) => {
    const shareData = {
      title: event.title,
      text: event.description.slice(0, 100) + '...',
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    switch (platform) {
      case 'twitter':
        shareToTwitter(shareData);
        break;
      case 'facebook':
        shareToFacebook(shareData);
        break;
      case 'line':
        shareToLine(shareData);
        break;
      case 'copy':
        copyLink(shareData.url);
        break;
    }
  };

  // 予約処理
  const handleReservation = async () => {
    if (!registrationData.name || !registrationData.email || !registrationData.phone) {
      alert('必須項目を入力してください');
      return;
    }

    const success = await reserve({
      name: registrationData.name,
      email: registrationData.email,
      phone: registrationData.phone,
    });

    if (success) {
      // 予約完了 - isReservedがtrueになる
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ja-JP', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  const relatedEvents = experienceEvents
    .filter(e => e.id !== event.id && e.venue === event.venue)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/events" 
            className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            イベント一覧に戻る
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-video relative bg-gray-100">
            <Image
              src={event.images[0]}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              {event.price === 0 && (
                <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                  無料
                </span>
              )}
              {event.isWeekendEvent && (
                <span className="bg-purple-500 text-white text-sm px-3 py-1 rounded-full">
                  週末開催
                </span>
              )}
            </div>
            
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={toggleLike}
                disabled={likeLoading}
                className={`p-2 rounded-full backdrop-blur-sm transition flex items-center gap-1 ${
                  isLiked ? 'bg-red-100/80 text-red-600' : 'bg-white/80 text-gray-600 hover:bg-red-50/80'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                {likeCount > 0 && <span className="text-sm">{likeCount}</span>}
              </button>

              <div className="relative group">
                <button className="p-2 bg-white/80 backdrop-blur-sm text-gray-600 rounded-full hover:bg-gray-100/80 transition">
                  <Share2 className="h-5 w-5" />
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[120px]">
                  <button onClick={() => handleShare('twitter')} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">Twitter</button>
                  <button onClick={() => handleShare('facebook')} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">Facebook</button>
                  <button onClick={() => handleShare('line')} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">LINE</button>
                  <button onClick={() => handleShare('copy')} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">URLコピー</button>
                </div>
              </div>
            </div>
            
            <div className="absolute top-4 left-4 bg-pink-500 text-white text-sm px-3 py-1 rounded-full">
              期間限定イベント
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {event.title}
                </h1>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-800">{event.venue}</div>
                        <div className="text-sm text-gray-600">{event.address}</div>
                        <div className="text-sm text-gray-600">{event.city}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {formatDate(event.startDate)}
                          {event.startDate.getTime() !== event.endDate.getTime() && 
                            ` - ${formatDate(event.endDate)}`
                          }
                        </div>
                        <div className="text-sm text-gray-600">
                          開催時間: {event.timeSlots.join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-800">定員{event.capacity}名</div>
                        <div className={`text-sm font-medium ${statusInfo.color}`}>
                          残り{event.remainingSlots}枠 ({statusInfo.text})
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {event.registrationRequired ? (
                      <div className="flex items-center gap-3 text-orange-600">
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-medium">要予約</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">予約不要・当日参加OK</span>
                      </div>
                    )}

                    {event.contact.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">{event.contact.phone}</span>
                      </div>
                    )}

                    {event.contact.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">{event.contact.email}</span>
                      </div>
                    )}

                    <div className="text-sm text-gray-600">
                      主催: {event.organizer.name}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${statusInfo.bg} ${statusInfo.color} ml-4`}>
                {statusInfo.text}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">イベント詳細</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                {event.description}
              </p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">タグ</h4>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {event.products.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  体験可能な商品
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {event.products.map(product => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <div className="border rounded-lg p-4 hover:border-pink-500 hover:shadow-md transition">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.company.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                          
                          <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                            イベント特別価格
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {event.registrationRequired && !isPast && (
              <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  イベント参加予約
                </h3>
                
                {statusInfo.status === 'full' ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">満席です</h4>
                    <p className="text-gray-600">
                      キャンセル待ちをご希望の場合は、お電話にてお問い合わせください
                    </p>
                  </div>
                ) : isReserved ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">予約が完了しました！</h4>
                    <p className="text-gray-600">
                      確認メールをお送りしましたのでご確認ください。
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          お名前 *
                        </label>
                        <input
                          type="text"
                          value={registrationData.name}
                          onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="山田太郎"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          メールアドレス *
                        </label>
                        <input
                          type="email"
                          value={registrationData.email}
                          onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          電話番号 *
                        </label>
                        <input
                          type="tel"
                          value={registrationData.phone}
                          onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="090-1234-5678"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          参加人数
                        </label>
                        <select
                          value={registrationData.participants}
                          onChange={(e) => setRegistrationData({...registrationData, participants: parseInt(e.target.value)})}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          {[1,2,3,4,5].map(num => (
                            <option key={num} value={num}>{num}名</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      {reservationError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                          {reservationError}
                        </div>
                      )}
                      <button
                        onClick={handleReservation}
                        disabled={reservationSubmitting}
                        className="w-full bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition font-medium flex items-center justify-center gap-2"
                      >
                        {reservationSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            予約処理中...
                          </>
                        ) : (
                          '参加予約を申し込む'
                        )}
                      </button>

                      <p className="text-xs text-gray-600 mt-2">
                        ※予約確定後、確認メールをお送りいたします
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!event.registrationRequired && !isPast && (
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  予約不要でご参加いただけます
                </h3>
                <p className="text-gray-600 mb-4">
                  当日会場にお越しいただくだけで体験できます。お気軽にお立ち寄りください。
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span>開催時間: {event.timeSlots.join(', ')}</span>
                  <span>•</span>
                  <span>残り{event.remainingSlots}枠</span>
                </div>
              </div>
            )}

            {isPast && (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  このイベントは終了しました
                </h3>
                <p className="text-gray-600">
                  今後開催予定のイベントは、イベント一覧ページでご確認ください。
                </p>
              </div>
            )}
          </div>
        </div>

        {relatedEvents.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {event.venue}の他のイベント
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedEvents.map(relatedEvent => (
                <Link key={relatedEvent.id} href={`/events/${relatedEvent.id}`}>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                    <div className="aspect-video relative bg-gray-100">
                      <Image
                        src={relatedEvent.images[0]}
                        alt={relatedEvent.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        {relatedEvent.price === 0 && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-semibold">
                            無料
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
                        {relatedEvent.title}
                      </h4>
                      <div className="text-sm text-gray-600 mb-2">
                        {formatDate(relatedEvent.startDate)}
                      </div>
                      <div className="text-xs text-gray-500">
                        残り{relatedEvent.remainingSlots}枠
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}