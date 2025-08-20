'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Heart, MapPin, Phone, Clock, Users, Share2, Calendar, CheckCircle, Info } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { products, experienceLocations } from '../../data/mockData';

export default function ProductDetailPage({ params }) {
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  
  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">商品が見つかりません</h1>
          <Link href="/products" className="text-emerald-600 hover:text-emerald-700">
            商品一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const availableLocations = experienceLocations.filter(loc =>
    loc.products.some(p => p.id === product.id)
  );

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category.id === product.category.id)
    .slice(0, 4);

  const handleLike = () => {
    setLiked(!liked);
  };

  const tabs = [
    { id: 'overview', label: '概要' },
    { id: 'features', label: '特徴' },
    { id: 'reviews', label: 'レビュー' },
    { id: 'locations', label: '体験場所' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/products" 
            className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            商品一覧に戻る
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            <div>
              <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-none w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === index ? 'border-emerald-500' : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-emerald-600 font-medium mb-2">
                    {product.category.name}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h1>
                  <div className="text-gray-600 mb-4">
                    by {product.company.name}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLike}
                    className={`p-2 rounded-full transition ${
                      liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium text-lg">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews.length}件のレビュー)</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    無料体験
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">
                    {availableLocations.length}箇所で体験可能
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.experienceType.map(type => (
                    <span 
                      key={type} 
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                    >
                      {type === 'visit' ? '店舗体験' : 
                       type === 'delivery' ? '自宅お試し' :
                       type === 'consultation' ? '相談' : 'オンライン'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="#locations"
                  className="flex-1 bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition font-medium text-center"
                >
                  体験場所を見る
                </Link>
                <button className="flex-1 border border-emerald-500 text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition font-medium">
                  お気に入りに追加
                </button>
              </div>
            </div>
          </div>

          <div className="border-t">
            <div className="flex border-b">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition ${
                    activeTab === tab.id
                      ? 'border-b-2 border-emerald-500 text-emerald-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">商品概要</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">タグ</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map(tag => (
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
              )}

              {activeTab === 'features' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">主な特徴</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-none" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">
                    レビュー ({product.reviews.length}件)
                  </h3>
                  <div className="space-y-6">
                    {product.reviews.map(review => (
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
                            <p className="text-gray-700 mb-2">{review.comment}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <button className="hover:text-emerald-600 transition">
                                参考になった ({review.helpful})
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'locations' && (
                <div id="locations">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">
                    体験可能な場所 ({availableLocations.length}箇所)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {availableLocations.map(location => (
                      <Link key={location.id} href={`/locations/${location.id}`}>
                        <div className="border rounded-lg p-6 hover:border-emerald-500 hover:shadow-md transition">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">{location.name}</h4>
                              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                                <MapPin className="h-4 w-4" />
                                <span>{location.address}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                                <Clock className="h-4 w-4" />
                                <span>{location.openingHours}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Phone className="h-4 w-4" />
                                <span>{location.phone}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{location.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-purple-600">
                              <Users className="h-4 w-4" />
                              <span>カップル・家族歓迎</span>
                            </div>
                            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                              詳細・予約 →
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">関連商品</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}