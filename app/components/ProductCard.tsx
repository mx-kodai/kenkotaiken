'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MapPin, Package, Star, Heart, MessageCircle, ThumbsUp } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 10);

  const experienceTypeIcons = {
    visit: <MapPin className="h-4 w-4" />,
    delivery: <Package className="h-4 w-4" />,
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const totalReviewLikes = product.reviews.reduce((sum, review) => sum + review.helpful, 0);

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
          <Image
            src={product.images[0] || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.tags.includes('人気') && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              人気
            </span>
          )}
          {product.tags.includes('無料体験') && (
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              無料体験
            </span>
          )}
          <button
            onClick={handleLike}
            className={`absolute bottom-2 right-2 p-2 rounded-full ${
              liked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600'
            } hover:scale-110 transition`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{product.category.name}</div>
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
              {product.reviews.length > 0 && (
                <span className="text-xs text-gray-500">({product.reviews.length}件)</span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {product.experienceType.slice(0, 2).map((type) => (
                <span key={type} className="text-gray-500" title={type === 'visit' ? '店舗体験' : '配送'}>
                  {experienceTypeIcons[type as 'visit' | 'delivery']}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {likeCount}
              </span>
              {product.reviews.length > 0 && (
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {product.reviews.length}
                </span>
              )}
              {totalReviewLikes > 0 && (
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  {totalReviewLikes}
                </span>
              )}
            </div>
            {product.price === 0 ? (
              <span className="text-green-600 font-semibold">無料</span>
            ) : product.price && (
              <span className="text-gray-700">¥{product.price.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}