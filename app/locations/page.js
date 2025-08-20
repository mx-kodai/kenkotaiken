'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Clock, Star, Filter, Users, Heart } from 'lucide-react';
import { experienceLocations, products } from '../data/mockData';

export default function LocationsPage() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const toyamaCities = [
    { value: 'all', label: 'すべての市町村' },
    { value: '富山市', label: '富山市' },
    { value: '高岡市', label: '高岡市' },
    { value: '射水市', label: '射水市' },
    { value: '魚津市', label: '魚津市' },
    { value: '氷見市', label: '氷見市' },
    { value: '黒部市', label: '黒部市' },
    { value: '砺波市', label: '砺波市' },
    { value: '南砺市', label: '南砺市' },
    { value: '滑川市', label: '滑川市' },
    { value: '立山町', label: '立山町' }
  ];

  const facilityTypes = [
    { value: 'all', label: 'すべての施設' },
    { value: 'センター', label: '体験センター' },
    { value: 'フィットネス', label: 'フィットネス' },
    { value: 'サロン', label: 'サロン・スパ' },
    { value: 'スタジオ', label: 'スタジオ' }
  ];

  const filteredLocations = experienceLocations.filter(location => {
    if (selectedCity !== 'all' && location.city !== selectedCity) {
      return false;
    }
    if (selectedType !== 'all' && !location.name.includes(selectedType)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">富山県内の体験場所</h1>
            <p className="text-lg opacity-90">
              カップル・ご家族での体験も大歓迎！お気軽にお越しください
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                エリア
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {toyamaCities.map(city => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                施設タイプ
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {facilityTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {filteredLocations.length}件の体験場所が見つかりました
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">地図で探す</h3>
            <p className="text-sm text-gray-600">富山県内の体験場所の位置をご確認いただけます</p>
          </div>
          <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center">
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
              <div className="flex gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                  <MapPin className="h-3 w-3 mr-1" />
                  体験場所
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-pink-100 text-pink-700">
                  <Users className="h-3 w-3 mr-1" />
                  家族歓迎
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredLocations.map(location => (
            <div key={location.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
              <div className="aspect-[16/9] relative bg-gray-100">
                <Image
                  src={location.images[0]}
                  alt={location.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-medium text-gray-700">
                  {location.city}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {location.name}
                </h3>

                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{location.address}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4" />
                  <span>{location.openingHours}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                  <Phone className="h-4 w-4" />
                  <span>{location.phone}</span>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{location.rating}</span>
                  <span className="text-xs text-gray-500">
                    ({location.reviews.length || Math.floor(Math.random() * 20) + 5}件のレビュー)
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">体験可能な商品:</p>
                  <div className="flex flex-wrap gap-1">
                    {location.products.slice(0, 3).map(product => (
                      <span key={product.id} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                        {product.name.length > 8 ? product.name.substring(0, 8) + '...' : product.name}
                      </span>
                    ))}
                    {location.products.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{location.products.length - 3}個
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-purple-600">
                      <Users className="h-3 w-3" />
                      <span>カップル・家族歓迎</span>
                    </div>
                    
                    <Link
                      href={`/locations/${location.id}`}
                      className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 transition"
                    >
                      詳細・予約
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">該当する体験場所が見つかりませんでした</p>
          </div>
        )}

        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6 mb-8">
          <div className="text-center">
            <Heart className="h-8 w-8 text-pink-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              大切な人と一緒に健康体験
            </h2>
            <p className="text-gray-600 mb-4">
              カップルやご家族での体験も大歓迎です。一緒に健康について学び、
              楽しい時間をお過ごしください。
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded">
                <div className="font-semibold text-pink-600 mb-1">カップル体験</div>
                <div className="text-gray-600">二人で一緒に健康チェック</div>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="font-semibold text-purple-600 mb-1">ファミリー体験</div>
                <div className="text-gray-600">お子様連れでも安心</div>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="font-semibold text-blue-600 mb-1">富山県民特典</div>
                <div className="text-gray-600">地元の方限定の特別サービス</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}