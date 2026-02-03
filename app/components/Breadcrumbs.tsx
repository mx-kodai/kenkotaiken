'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }) {
    return (
        <nav className="flex items-center text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap hide-scrollbar py-1">
            <Link href="/" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span>ホーム</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    <ChevronRight className="w-4 h-4 mx-2 text-gray-300 flex-shrink-0" />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-emerald-600 transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-gray-800">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
