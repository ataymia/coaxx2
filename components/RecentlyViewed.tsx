'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { Eye } from 'lucide-react';

export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Defer to avoid cascading renders
    const timer = setTimeout(() => {
      // In a real implementation, this would load from localStorage or API
      // For now, it's a stub that shows nothing until products are tracked
      const stored = localStorage.getItem('coaxx_recently_viewed');
      if (stored) {
        try {
          const products = JSON.parse(stored);
          setRecentProducts(products.slice(0, 4)); // Show max 4 products
        } catch {
          // Invalid data, ignore
        }
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Eye className="h-6 w-6 text-gray-600" />
          <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to add product to recently viewed
export function addToRecentlyViewed(product: Product) {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem('coaxx_recently_viewed');
    let products: Product[] = stored ? JSON.parse(stored) : [];
    
    // Remove if already exists
    products = products.filter(p => p.id !== product.id);
    
    // Add to front
    products.unshift(product);
    
    // Keep only last 10
    products = products.slice(0, 10);
    
    localStorage.setItem('coaxx_recently_viewed', JSON.stringify(products));
  } catch {
    // Ignore errors
  }
}
