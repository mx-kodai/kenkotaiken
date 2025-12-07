'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-200 transition-all duration-300"
      whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(16, 185, 129, 0.15)" }}
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        {/* Image Container with Overlay */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full text-gray-800 shadow-sm">
            {product.category?.name || 'カテゴリ'}
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5 text-xs font-medium bg-black/40 backdrop-blur-md w-fit px-2 py-1 rounded-md mb-2">
              <MapPin className="w-3 h-3" />
              <span>{product.location || '富山県'}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-bold text-gray-800">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviewCount || 0}件)</span>
            </div>

            <div className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              無料体験
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}