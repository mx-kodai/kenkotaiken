'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Play, Heart, Calendar, Clock, MapPin, Star, User } from 'lucide-react';
import { experienceReports } from '../data/mockData';

export default function ExperienceReportsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredReports = experienceReports.filter(report => {
    if (selectedFilter === 'all') return true;
    return report.tags.some(tag => tag.includes(selectedFilter));
  });

  const filters = [
    { value: 'all', label: 'すべて' },
    { value: '改善', label: '効果実感' },
    { value: 'リラックス', label: 'リラックス' },
    { value: '美容', label: '美容・エステ' },
    { value: 'スポーツ', label: 'スポーツ' },
    { value: '子ども', label: '子ども向け' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">体験レポート</h1>
            <p className="text-lg opacity-90">
              実際に体験された方の生の声をお届けします
            </p>
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
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-purple-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReports.map(report => (
            <div key={report.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
              <div className="aspect-video relative bg-gray-100">
                {report.videoUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={report.images[0]}
                      alt={report.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition">
                        <Play className="h-8 w-8 text-purple-600 ml-1" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={report.images[0]}
                    alt={report.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {report.reviewer.avatar ? (
                      <Image
                        src={report.reviewer.avatar}
                        alt={report.reviewer.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{report.reviewer.name}</span>
                    <span className="mx-1">•</span>
                    <span>{report.reviewer.age} {report.reviewer.gender}</span>
                    <span className="mx-1">•</span>
                    <span>{report.reviewer.city}</span>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                  {report.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {report.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    {report.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {report.experienceDate.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {report.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {report.location.city}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {report.product.name}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {report.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {report.beforeAfter && (
                  <div className="border-l-4 border-purple-200 pl-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1">
                      <span className="font-medium text-red-500">Before:</span> {report.beforeAfter.before}
                    </p>
                    <p className="text-xs text-gray-500">
                      <span className="font-medium text-green-500">After:</span> {report.beforeAfter.after}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{report.likes}</span>
                  </button>
                  
                  <Link
                    href={`/reports/${report.id}`}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    詳細を見る →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">該当するレポートが見つかりませんでした</p>
          </div>
        )}
      </div>
    </div>
  );
}