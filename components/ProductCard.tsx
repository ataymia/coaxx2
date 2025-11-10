'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscountPercent } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import toast from 'react-hot-toast';
import Badge from './Badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const displayPrice = product.sale_price ?? product.price;
  const discountPercent = hasDiscount 
    ? calculateDiscountPercent(product.price, product.sale_price!)
    : 0;
  
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 10;
  const isSoldOut = product.stock_quantity <= 0;
  
  // Calculate isNew using a stable date
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const isNew = product.created_at && new Date(product.created_at) > sevenDaysAgo;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock_quantity <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    
    addItem(product);
    toast.success('Added to cart!');
  };

  return (
    <Link href={`/shop/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {hasDiscount && (
              <Badge type="deal" text={`${discountPercent}% OFF`} />
            )}
            {isNew && !hasDiscount && <Badge type="new" />}
            {isLowStock && !isSoldOut && <Badge type="low-stock" />}
          </div>
          
          {isSoldOut && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge type="sold-out" className="text-lg px-4 py-2" />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {hasDiscount && (
                <span className="text-gray-500 line-through text-sm">
                  {formatPrice(product.price)}
                </span>
              )}
              <span className={`font-bold text-lg ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                {formatPrice(displayPrice)}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock_quantity <= 0}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
