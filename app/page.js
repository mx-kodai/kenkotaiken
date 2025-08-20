'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Sparkles, Users, Heart, ChevronRight, Play, Calendar, Star, Clock, AlertCircle, Zap, Activity, Shield, Dumbbell, Stethoscope, Brain, Target, Smile, ChevronDown, X } from 'lucide-react';
import ProductCard from './components/ProductCard';
import { products, categories, experienceLocations, experienceReports, experienceEvents } from './data/mockData';

export default function Home() {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
              健康デバイスを<br className="md:hidden" />
              <span className="text-emerald-500">無料で体験</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 px-2">
              高価な健康機器も、まずは試してから。<br className="hidden sm:inline" />
              全国の体験スポットで、あなたにぴったりのソリューションを見つけましょう
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8 px-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="商品名や悩みで検索..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                />
              </div>
              <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition font-medium text-sm md:text-base whitespace-nowrap">
                検索する
              </button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center px-2">
              <span className="text-xs md:text-sm text-gray-500 mb-1">人気のキーワード:</span>
              {['マッサージチェア', '睡眠改善', 'フィットネス', '肩こり'].map((keyword) => (
                <Link
                  key={keyword}
                  href={`/search?q=${keyword}`}
                  className="text-xs md:text-sm bg-white px-2 md:px-3 py-1 rounded-full border hover:border-emerald-500 transition text-gray-700"
                >
                  {keyword}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-pink-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              期間限定開催中
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ショッピングモールで健康体験イベント
            </h2>
            <p className="text-gray-600">
              ファボーレ・イオンモール高岡などで開催！お買い物ついでに気軽にどうぞ
            </p>
          </div>

          <div className="overflow-x-auto mb-8">
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ minWidth: 'fit-content' }}>
              {experienceEvents.slice(0, 6).map((event) => {
              const today = new Date();
              const isUpcoming = event.startDate >= today;
              const formatDate = (date) => date.toLocaleDateString('ja-JP', { 
                month: 'short', 
                day: 'numeric',
                weekday: 'short'
              });

              return (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer flex-none w-80 md:w-auto">
                    <div className="aspect-video relative bg-gray-100">
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
                      <div className="absolute bottom-3 left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                        残り{event.remainingSlots}枠
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                        {event.title}
                      </h3>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="line-clamp-1">{event.venue}</span>
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
                          <span>{event.timeSlots[0]}</span>
                          {event.timeSlots.length > 1 && (
                            <span className="text-xs text-gray-500 ml-1">他{event.timeSlots.length - 1}枠</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-purple-500" />
                          <span className="text-xs text-purple-600">
                            カップル・家族歓迎
                          </span>
                        </div>
                        
                        {event.registrationRequired ? (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            要予約
                          </span>
                        ) : (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            予約不要
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/events"
              className="inline-flex items-center bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition font-medium"
            >
              すべてのイベントを見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">体験方法を選ぶ</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Link href="/locations" className="group">
              <div className="text-center p-6 rounded-lg border hover:border-emerald-500 transition">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition">
                  <MapPin className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-semibold mb-2">店舗で体験</h3>
                <p className="text-sm text-gray-600">
                  お近くの体験センターで実際に試せます
                </p>
              </div>
            </Link>
            
            <div className="group cursor-pointer">
              <div className="text-center p-6 rounded-lg border hover:border-emerald-500 transition">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">自宅でお試し</h3>
                <p className="text-sm text-gray-600">
                  配送してもらい、自宅でゆっくり体験
                </p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="text-center p-6 rounded-lg border hover:border-emerald-500 transition">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">オンライン相談</h3>
                <p className="text-sm text-gray-600">
                  専門スタッフがオンラインでサポート
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">人気の体験商品</h2>
            <Link href="/products" className="text-emerald-500 hover:text-emerald-600 flex items-center">
              すべて見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4" style={{ minWidth: 'fit-content' }}>
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="flex-none w-72">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">カップル・ご家族での体験も大歓迎</h2>
          <div className="mb-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6 text-center">
                <Heart className="h-8 w-8 text-pink-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">カップル体験</h3>
                <p className="text-sm text-gray-600">富山ウェルネスパーク高岡でペア体験。マッサージチェアやフィットネスを二人で楽しめます</p>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-6 text-center">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">ファミリー体験</h3>
                <p className="text-sm text-gray-600">ファボーレでの親子健康チェック。お子様の成長測定と健康デバイス体験を一緒に</p>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-6 text-center">
                <Target className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">富山県民特典</h3>
                <p className="text-sm text-gray-600">県民証提示で体験料無料。立山町健康センターでの温泉×健康機器コラボ体験</p>
              </div>
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-6 text-center">
                <Smile className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">気軽に参加</h3>
                <p className="text-sm text-gray-600">予約不要で当日参加OK。イオンモール高岡でのお買い物ついでに健康体験</p>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4" style={{ minWidth: 'fit-content' }}>
              {products.filter(p => p.tags.includes('カップル限定') || p.tags.includes('ファミリー') || p.tags.includes('富山県民限定')).slice(0, 8).map((product) => (
                <div key={product.id} className="flex-none w-72">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">カテゴリーから探す</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto mb-6">
            {categories.slice(0, 6).map((category, index) => {
              const icons = [Zap, Activity, Shield, Dumbbell, Stethoscope];
              const IconComponent = icons[index] || Brain;
              const categoryProducts = products.filter(product => product.category.id === category.id);
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="group text-center p-4 rounded-lg bg-white hover:bg-emerald-50 transition shadow-sm border"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-3 group-hover:bg-emerald-200 transition flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-emerald-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{category.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{categoryProducts.length}件</p>
                </button>
              );
            })}
          </div>
          
          {expandedCategory && (
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border p-6">
              {(() => {
                const category = categories.find(c => c.id === expandedCategory);
                const categoryProducts = products.filter(product => product.category.id === expandedCategory);
                
                return (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{category?.name}の商品</h3>
                      <button
                        onClick={() => setExpandedCategory(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    {categoryProducts.length > 0 ? (
                      <div className="overflow-x-auto">
                        <div className="flex gap-4 pb-2" style={{ minWidth: 'fit-content' }}>
                          {categoryProducts.slice(0, 8).map((product) => (
                            <div key={product.id} className="flex-none w-64">
                              <ProductCard product={product} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">このカテゴリの商品は準備中です</p>
                    )}
                    <div className="text-center mt-4">
                      <Link
                        href={`/categories/${category?.slug}`}
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                      >
                        このカテゴリの商品をすべて見る
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-emerald-500 to-blue-500">
        <div className="container mx-auto px-4 text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 text-white" />
          <h2 className="text-3xl font-bold mb-4 text-white">
            あなたにぴったりの健康習慣を見つけよう
          </h2>
          <p className="text-lg mb-8 text-white opacity-90">
            簡単な質問に答えるだけで、おすすめの商品をご提案します
          </p>
          <Link
            href="/diagnosis"
            className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            診断を始める
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">みんなの体験レポート</h2>
            <Link href="/reports" className="text-purple-600 hover:text-purple-700 flex items-center">
              すべて見る
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4" style={{ minWidth: 'fit-content' }}>
              {experienceReports.slice(0, 8).map((report) => (
                <div key={report.id} className="flex-none w-80">
                  <Link href={`/reports/${report.id}`}>
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer">
                  <div className="aspect-video relative bg-gray-100">
                    <Image
                      src={report.images[0]}
                      alt={report.title}
                      fill
                      className="object-cover"
                    />
                    {report.videoUrl && (
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="bg-white bg-opacity-90 rounded-full p-3">
                          <Play className="h-6 w-6 text-purple-600 ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                      体験レポート
                    </div>
                  </div>

                  <div className="p-4 h-44 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                        <Image
                          src={report.reviewer.avatar}
                          alt={report.reviewer.name}
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-600 truncate">
                        {report.reviewer.name} • {report.reviewer.age} • {report.reviewer.city}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
                      {report.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        {report.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.experienceDate.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {report.likes}
                      </span>
                    </div>

                      <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                        {report.description}
                      </p>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">富山県内の体験場所</h2>
            <p className="text-gray-600">カップル・ご家族での体験も大歓迎です</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">地図で探す</h3>
              <p className="text-sm text-gray-600">お近くの体験スポットを見つけましょう</p>
            </div>
            <div className="aspect-[16/9] bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206314.3648746749!2d137.13756495!3d36.695932799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff78e1a1bfe21bb%3A0x7b4d4c8f5a3c8e9d!2z5bul5bGx55yM!5e0!3m2!1sja!2sjp!4v1642742069000!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="富山県内の体験場所マップ"
              ></iframe>
            </div>
            <div className="p-4 bg-gray-50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">マップ上のピンをクリックして詳細をご確認ください</span>
                <Link href="/locations" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  体験場所一覧を見る →
                </Link>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4" style={{ minWidth: 'fit-content' }}>
              {experienceLocations.slice(0, 8).map((location) => (
                <div key={location.id} className="flex-none w-80">
                  <Link href={`/locations/${location.id}`}>
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 cursor-pointer border">
                  <div className="aspect-[16/9] relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={location.images[0]}
                      alt={location.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                      {location.city}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{location.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">営業: {location.openingHours}</p>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-purple-500" />
                      <span className="text-xs text-purple-600">家族歓迎</span>
                    </div>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/locations"
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition font-medium"
            >
              すべての体験場所を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}