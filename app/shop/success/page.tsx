import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// Mock recommended products
const recommendedProducts: Product[] = [
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Latest smartwatch with health tracking',
    price: 399.99,
    stock_quantity: 30,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
  },
  {
    id: '3',
    name: 'Designer Sunglasses',
    description: 'Stylish sunglasses with UV protection',
    price: 159.99,
    sale_price: 99.99,
    stock_quantity: 100,
    image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
  },
  {
    id: '4',
    name: 'Leather Messenger Bag',
    description: 'Handcrafted genuine leather bag',
    price: 249.99,
    stock_quantity: 20,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
  },
  {
    id: '5',
    name: 'Wireless Keyboard',
    description: 'Mechanical keyboard with RGB lighting',
    price: 149.99,
    sale_price: 119.99,
    stock_quantity: 75,
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
  },
];

export default function SuccessPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success Message */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12 text-center">
        <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <p className="text-gray-700 mb-8">
          We've sent a confirmation email with your order details and receipt.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-red-600 hover:text-red-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* You Might Also Like */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">You Might Also Like</h2>
        <p className="text-gray-600 mb-6">Check out these similar products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
