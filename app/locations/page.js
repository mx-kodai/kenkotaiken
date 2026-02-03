'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Clock, Star, Filter, Users, Heart, Search, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../components/PageHero';
import { experienceLocations } from '../data/mockData';

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
      <PageHero
        title="Wellness Spots"
        subtitle="体験場所を探す"
        image="/images/hero-locations.png"
        description="富山県内の提携施設で、実際に見て、触れて、体験してください。あなたの街の隠れたウェルネススポットが見つかります。"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-6 mb-12 shadow-sm border border-gray-100 relative -mt-20 z-20">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                エリア
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none font-medium text-gray-700"
                >
                  {toyamaCities.map(city => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                施設タイプ
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none font-medium text-gray-700"
                >
                  {facilityTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <div className="w-full bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl flex items-center justify-center font-bold">
                {filteredLocations.length}件のスポット
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 mb-12 overflow-hidden border border-gray-100"
        >
          <div className="aspect-[21/9] bg-gray-100 relative group cursor-pointer isolate">
            {/* Scroll Protection Overlay */}
            <div
              className="absolute inset-0 z-10 bg-transparent flex items-center justify-center pointer-events-auto"
              onClick={(e) => {
                e.currentTarget.style.pointerEvents = 'none';
              }}
              onTouchStart={(e) => {
                // For mobile, we might want different behavior, but click-to-activate is standard pattern
                // Or we use two-finger scroll requirement which Maps API handles if configured, but for iframe overlay is best.
                // Simple overlay that disappears on interact
                e.currentTarget.style.pointerEvents = 'none';
              }}
            >
              <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full font-bold text-gray-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                マップを操作するにはタップしてください
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206314.3648746749!2d137.13756495!3d36.695932799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff78e1a1bfe21bb%3A0x7b4d4c8f5a3c8e9d!2z5bul5bGx55yM!5e0!3m2!1sja!2sjp!4v1642742069000!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="富山県内の体験場所マップ"
              className="grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 relative z-0"
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-sm font-bold text-gray-800 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-500" />
              富山県全域の体験スポット
            </div>
          </div>
        </motion.div>

        {/* Locations Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <AnimatePresence>
            {filteredLocations.map((location, index) => (
              <motion.div
                key={location.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 group"
              >
                <div className="aspect-[4/3] relative bg-gray-100 overflow-hidden">
                  <Image
                    src={location.images[0]}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    {location.city}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-xl mb-1 text-shadow">{location.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-200">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate max-w-[200px]">{location.address}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 bg-gray-50 rounded-xl p-3 flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm font-medium text-gray-700">{location.openingHours}</span>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-3 flex items-center justify-center gap-1 min-w-[80px]">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-bold text-gray-800">{location.rating}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">体験可能な商品</p>
                    <div className="flex flex-wrap gap-2">
                      {location.products.slice(0, 3).map(product => (
                        <span key={product.id} className="text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100">
                          {product.name.length > 10 ? product.name.substring(0, 10) + '...' : product.name}
                        </span>
                      ))}
                      {location.products.length > 3 && (
                        <span className="text-xs font-medium bg-gray-50 text-gray-500 px-3 py-1.5 rounded-lg border border-gray-100">
                          +{location.products.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/locations/${location.id}`}
                    className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition shadow-lg shadow-gray-200"
                  >
                    詳細を見る・予約する
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed">
            <p className="text-xl font-bold text-gray-400">該当する体験場所が見つかりませんでした</p>
          </div>
        )}

        {/* Feature Section - Vitality Flow Design */}
        <div className="relative rounded-3xl overflow-hidden py-16 px-6 md:px-12 mt-20">
          {/* Background with Abstract Shapes */}
          <div className="absolute inset-0 bg-gray-900">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-xl mb-8">
              <Heart className="h-10 w-10 text-pink-400" fill="currentColor" />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Wellness Together
              <span className="block text-xl md:text-2xl font-medium text-emerald-400 mt-2">大切な人と、心身を整える体験を。</span>
            </h2>

            <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
              カップルやご家族でのご利用も大歓迎です。<br className="hidden md:block" />
              非日常的な空間で、互いの健康を気遣う特別なひとときをお過ごしください。
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              {/* Card 1 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/15 transition-all group"
              >
                <div className="bg-pink-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-pink-300 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white mb-3">Couples</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  二人で受けるAI健康診断やペアストレッチ。デートコースの新しい定番として、多くのカップルに選ばれています。
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/15 transition-all group"
              >
                <div className="bg-blue-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-blue-300 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white mb-3">Families</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  お子様連れでも安心のキッズスペース完備。ご家族全員で楽しめる「健康クイズ大会」も開催中です。
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/15 transition-all group"
              >
                <div className="bg-emerald-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-emerald-300 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white mb-3">Toyama Residents</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  富山県在住の方限定の「地元応援プラン」をご用意。身分証のご提示で、体験料が最大50%OFFになります。
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}