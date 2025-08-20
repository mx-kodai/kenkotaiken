'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Phone, Clock, Users, Calendar, CheckCircle, Navigation, Heart, Share2 } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { experienceLocations, products } from '../../data/mockData';

export default function LocationDetailPage({ params }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [liked, setLiked] = useState(false);
  
  const location = experienceLocations.find(l => l.id === params.id);
  
  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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

  const handleLike = () => {
    setLiked(!liked);
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/locations" 
            className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            体験場所一覧に戻る
          </Link>
        </div>

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
                onClick={handleLike}
                className={`p-2 rounded-full backdrop-blur-sm transition ${
                  liked ? 'bg-red-100/80 text-red-600' : 'bg-white/80 text-gray-600 hover:bg-red-50/80'
                }`}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
              </button>
              
              <button className="p-2 bg-white/80 backdrop-blur-sm text-gray-600 rounded-full hover:bg-gray-100/80 transition">
                <Share2 className="h-5 w-5" />
              </button>
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
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">レビュー</h3>
                  <div className="space-y-6">
                    {location.reviews.slice(0, 3).map(review => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                            {review.userAvatar && (
                              <Image
                                src={review.userAvatar}
                                alt={review.userName}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-gray-800">{review.userName}</span>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${
                                      i < review.rating 
                                        ? 'text-yellow-400 fill-current' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {review.createdAt.toLocaleDateString('ja-JP')}
                              </span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {location.reviews.length > 3 && (
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
                      className="w-full bg-emerald-500 text-white px-4 py-3 rounded-lg hover:bg-emerald-600 transition font-medium"
                      disabled={!selectedDate || !selectedTime}
                    >
                      体験予約をする
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