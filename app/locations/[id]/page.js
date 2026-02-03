'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Phone, Clock, Users, Calendar, CheckCircle, Navigation, Heart, Share2, ThumbsUp, Loader2 } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import Breadcrumbs from '../../components/Breadcrumbs';
import { experienceLocations, products } from '../../data/mockData';
import { useLikes, useFavorites } from '../../hooks/useFavorites';
import { useShare } from '../../hooks/useShare';
import { useReviews } from '../../hooks/useReviews';
import { useReservation } from '../../hooks/useReservation';

export default function LocationDetailPage({ params }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // フック接続
  const { isLiked, likeCount, toggleLike, isLoading: likeLoading } = useLikes(params.id, 'location');
  const { isFavorite, toggleFavorite, isLoading: favoriteLoading } = useFavorites(params.id, 'location');
  const { shareToTwitter, shareToFacebook, shareToLine, copyLink } = useShare();
  const { reviews, isLoading: reviewsLoading, markHelpful, hasMarkedHelpful } = useReviews(params.id, 'location');
  const { createReservation, isSubmitting: reservationSubmitting } = useReservation();

  const location = experienceLocations.find(l => l.id === params.id);

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50 pt-14 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">体験場所が見つかりません</h1>
          <Link href="/locations" className="text-emerald-600 hover:text-emerald-700">
            体験場所一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const availableTimes = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  const relatedLocations = experienceLocations
    .filter(l => l.id !== location.id && l.city === location.city)
    .slice(0, 3);

  // シェア処理
  const handleShare = (platform) => {
    const shareData = {
      title: location.name,
      text: `${location.name} - ${location.address}`,
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
    if (!selectedDate || !selectedTime) return;

    const reservationData = {
      itemId: params.id,
      itemType: 'location',
      date: new Date(selectedDate),
      time: selectedTime,
      numberOfPeople: 1,
    };

    const success = await createReservation(reservationData);
    if (success) {
      alert('予約が完了しました！確認メールをお送りします。');
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      <div className="container mx-auto px-4 py-8">

        <Breadcrumbs items={[
          { label: '体験場所一覧', href: '/locations' },
          { label: location.name }
        ]} />

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-[16/9] relative bg-gray-100">
            <Image
              src={location.images[0]}
              alt={location.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={toggleLike}
                disabled={likeLoading}
                className={`p-2 rounded-full backdrop-blur-sm transition flex items-center gap-1 ${isLiked ? 'bg-red-100/80 text-red-600' : 'bg-white/80 text-gray-600 hover:bg-red-50/80'
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
            <div className="absolute top-4 left-4 bg-emerald-500 text-white text-sm px-3 py-1 rounded-full">
              {location.city}
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {location.name}
                </h1>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>{location.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>{location.openingHours}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-5 w-5" />
                    <span>{location.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium text-lg">{location.rating}</span>
                    <span className="text-gray-600">({location.reviews.length}件のレビュー)</span>
                  </div>

                  <div className="flex items-center gap-2 text-purple-600">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">カップル・家族歓迎</span>
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                <Navigation className="h-4 w-4" />
                <span>地図で見る</span>
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">体験可能な商品</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {location.products.slice(0, 4).map(product => (
                      <Link key={product.id} href={`/products/${product.id}`}>
                        <div className="border rounded-lg p-4 hover:border-emerald-500 hover:shadow-md transition">
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

                            <div className="flex flex-wrap gap-1">
                              {product.tags.slice(0, 2).map(tag => (
                                <span
                                  key={tag}
                                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {location.products.length > 4 && (
                    <div className="text-center mt-4">
                      <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                        すべての商品を見る（+{location.products.length - 4}件）
                      </button>
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">施設の特徴</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-none" />
                      <div>
                        <h4 className="font-medium text-green-800 mb-1">カップル・家族向け</h4>
                        <p className="text-sm text-green-700">二人以上での体験を歓迎。専用スペースもご用意</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-none" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">駐車場完備</h4>
                        <p className="text-sm text-blue-700">無料駐車場あり。お車でのアクセスも安心</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-none" />
                      <div>
                        <h4 className="font-medium text-purple-800 mb-1">専門スタッフ常駐</h4>
                        <p className="text-sm text-purple-700">経験豊富なスタッフがサポート</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-none" />
                      <div>
                        <h4 className="font-medium text-orange-800 mb-1">清潔な環境</h4>
                        <p className="text-sm text-orange-700">定期的な清掃・消毒を実施</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    レビュー ({reviews.length}件)
                  </h3>
                  {reviewsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      まだレビューがありません
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviews.slice(0, 3).map(review => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-gray-500">
                              {review.userAvatar ? (
                                <Image
                                  src={review.userAvatar}
                                  alt={review.userName}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              ) : (
                                <span className="text-lg font-bold">{review.userName.charAt(0)}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-gray-800">{review.userName}</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                        }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.createdAt).toLocaleDateString('ja-JP')}
                                </span>
                              </div>
                              {review.title && (
                                <h4 className="font-medium text-gray-800 mb-1">{review.title}</h4>
                              )}
                              <p className="text-gray-700 mb-2">{review.content || review.comment}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <button
                                  onClick={() => markHelpful(review.id)}
                                  disabled={hasMarkedHelpful(review.id)}
                                  className={`flex items-center gap-1 transition ${hasMarkedHelpful(review.id)
                                    ? 'text-emerald-600'
                                    : 'hover:text-emerald-600'
                                    }`}
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                  参考になった ({review.helpful})
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {reviews.length > 3 && (
                    <div className="text-center mt-4">
                      <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                        すべてのレビューを見る
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">予約・お問い合わせ</h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        希望日
                      </label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">日付を選択</option>
                        {getNextWeekDates().map(date => (
                          <option key={date.toISOString()} value={date.toISOString()}>
                            {date.toLocaleDateString('ja-JP', {
                              month: 'short',
                              day: 'numeric',
                              weekday: 'short'
                            })}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        希望時間
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        disabled={!selectedDate}
                      >
                        <option value="">時間を選択</option>
                        {availableTimes.map(time => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleReservation}
                      className="w-full bg-emerald-500 text-white px-4 py-3 rounded-lg hover:bg-emerald-600 transition font-medium flex items-center justify-center gap-2"
                      disabled={!selectedDate || !selectedTime || reservationSubmitting}
                    >
                      {reservationSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          予約処理中...
                        </>
                      ) : (
                        '体験予約をする'
                      )}
                    </button>

                    <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition">
                      電話で問い合わせ
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>営業時間: {location.openingHours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{location.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedLocations.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {location.city}の他の体験場所
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedLocations.map(relatedLocation => (
                <Link key={relatedLocation.id} href={`/locations/${relatedLocation.id}`}>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                    <div className="aspect-[16/9] relative bg-gray-100">
                      <Image
                        src={relatedLocation.images[0]}
                        alt={relatedLocation.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800 mb-2">{relatedLocation.name}</h4>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{relatedLocation.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({relatedLocation.reviews.length}件)
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{relatedLocation.address}</p>
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