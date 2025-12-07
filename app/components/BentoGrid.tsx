'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function BentoGrid({ items }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {items.map((item, index) => {
                // First item is large (2x2) on desktop
                const isLarge = index === 0;
                // Second and third items are medium wide (2x1) on some layouts
                const isWide = index === 1 || index === 6;

                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`
              relative group overflow-hidden rounded-3xl bg-gray-100 
              ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
              ${isWide ? 'md:col-span-2' : ''}
              cursor-pointer
            `}
                    >
                        <Link href={item.href} className="block w-full h-full">
                            {/* Background with zoom effect */}
                            {item.image && (
                                <div className="absolute inset-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </div>
                            )}

                            {/* Content Content */}
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                {item.icon && (
                                    <div className="mb-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                        <item.icon size={20} />
                                    </div>
                                )}

                                <h3 className={`font-bold text-white mb-1 ${isLarge ? 'text-2xl' : 'text-lg'}`}>
                                    {item.title}
                                </h3>

                                <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                                    {item.description}
                                </p>

                                <div className="flex items-center text-white text-sm font-medium opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    もっと見る <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}
