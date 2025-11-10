import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// Mock products for demo - will be replaced with API calls
const mockProducts: Product[] = [
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
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Latest smartwatch with health tracking and GPS',
    price: 399.99,
    stock_quantity: 30,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
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
  {
    id: '6',
    name: 'Portable Speaker',
    description: 'Waterproof Bluetooth speaker',
    price: 89.99,
    stock_quantity: 120,
    image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
  },
];

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop All Products</h1>
        <p className="text-gray-600">Discover our curated collection of premium products</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Accessories</option>
        </select>
        
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600">
          <option>Sort By</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
          <option>Popular</option>
        </select>
        
        <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Filter
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
          Load More Products
        </button>
      </div>
    </div>
  );
}
