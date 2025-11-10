'use client';

import Link from 'next/link';
import { Flame } from 'lucide-react';

interface HotItem {
  id: string;
  name: string;
  discount?: number;
}

const hotItems: HotItem[] = [
  { id: '1', name: 'Premium Wireless Headphones', discount: 33 },
  { id: '3', name: 'Designer Sunglasses', discount: 38 },
  { id: '5', name: 'Wireless Keyboard', discount: 20 },
];

export default function HotItemsTicker() {
  // Double the items for seamless loop
  const items = [...hotItems, ...hotItems];

  return (
    <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white py-2 overflow-hidden relative">
      <div className="flex items-center">
        <div className="flex items-center gap-8 animate-[scroll-left_30s_linear_infinite] whitespace-nowrap">
          {items.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              href={`/shop/product/${item.id}`}
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Flame className="h-4 w-4 flex-shrink-0" />
              <span className="font-semibold">🔥 {item.name}</span>
              {item.discount && (
                <span className="bg-white text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {item.discount}% OFF
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
