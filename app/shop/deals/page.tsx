import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { Percent } from 'lucide-react';

// Mock products on sale
const saleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    sale_price: 199.99,
    stock_quantity: 50,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    featured: true,
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
    id: '5',
    name: 'Wireless Keyboard',
    description: 'Mechanical keyboard with RGB lighting',
    price: 149.99,
    sale_price: 119.99,
    stock_quantity: 75,
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
  },
];

export default function DealsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 to-amber-600 rounded-lg p-12 mb-12 text-white text-center">
        <Percent className="h-16 w-16 mx-auto mb-4" />
        <h1 className="text-5xl font-bold mb-4">Amazing Deals</h1>
        <p className="text-xl mb-2">Save big on our hottest products!</p>
        <p className="text-lg opacity-90">Limited time offers - Don't miss out!</p>
      </div>

      {/* Deals Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">Up to 40% OFF</div>
          <p className="text-gray-600">On selected items</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-amber-600 mb-2">Free Shipping</div>
          <p className="text-gray-600">Orders over $100</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-gray-700 mb-2">24/7 Support</div>
          <p className="text-gray-600">We're here to help</p>
        </div>
      </div>

      {/* Deal Products */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hot Deals</h2>
        <p className="text-gray-600 mb-6">Products with special discounts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {saleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gray-100 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Want More Exclusive Deals?
        </h3>
        <p className="text-gray-600 mb-6">
          Sign up for our newsletter to get notified about new deals and promotions
        </p>
        <form className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
