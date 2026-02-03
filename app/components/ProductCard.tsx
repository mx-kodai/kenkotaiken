'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <span className="bg-white/95 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded text-gray-900 shadow-sm border border-gray-100">
              {product.category?.name || 'カテゴリ'}
            </span>
          </div>

          {/* Location Badge (Bottom Left) */}
          <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1 text-[10px] font-medium bg-black/50 backdrop-blur-md px-2 py-1 rounded-full">
              <MapPin className="w-3 h-3" />
              <span>{product.location || '富山県'}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Floating Action Button (Heart) - Separate from Link to prevent navigation when clicking heart */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all active:scale-95 z-10"
        aria-label={isLiked ? "お気に入りから削除" : "お気に入りに追加"}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
        />
      </button>

      {/* Content Content - Dense & Clean */}
      <div className="p-3">
        <h3 className="text-sm font-bold text-gray-800 mb-1 leading-snug line-clamp-2 min-h-[2.5em] group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-end justify-between mt-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-0.5">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-bold text-gray-700">{product.rating}</span>
              <span className="text-[10px] text-gray-400">({product.reviewCount || 0})</span>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
            無料体験
          </span>
        </div>
      </div>
    </motion.div>
  );
}