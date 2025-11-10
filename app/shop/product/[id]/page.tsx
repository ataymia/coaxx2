'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, Share2, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice, calculateDiscountPercent } from '@/lib/utils';
import { Product } from '@/types';
import toast from 'react-hot-toast';
import Breadcrumbs from '@/components/Breadcrumbs';

// Mock product data - will be replaced with API call
const getProductById = (id: string): Product => {
  const mockProducts: Record<string, Product> = {
    '1': {
      id: '1',
      name: 'Premium Wireless Headphones',
      description: 'Experience superior sound quality with our premium wireless headphones. Featuring advanced noise cancellation technology, these headphones deliver crystal-clear audio whether you\'re listening to music, taking calls, or enjoying your favorite podcasts. With up to 30 hours of battery life and comfortable over-ear design, they\'re perfect for all-day use.',
      price: 299.99,
      sale_price: 199.99,
      stock_quantity: 50,
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
      ],
      featured: true,
    },
  };
  return mockProducts[id] || mockProducts['1'];
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = getProductById(resolvedParams.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const displayPrice = product.sale_price ?? product.price;
  const discountPercent = hasDiscount
    ? calculateDiscountPercent(product.price, product.sale_price!)
    : 0;

  const handleAddToCart = () => {
    if (product.stock_quantity <= 0) {
      toast.error('Product is out of stock');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const images = product.images && product.images.length > 0 ? product.images : [product.image_url || ''];

  // Calculate valid until date for schema
  const validUntilDate = new Date();
  validUntilDate.setDate(validUntilDate.getDate() + 30);

  // Generate schema.org Product markup
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": images,
    "offers": {
      "@type": "Offer",
      "url": typeof window !== 'undefined' ? window.location.href : '',
      "priceCurrency": "USD",
      "price": displayPrice.toFixed(2),
      "availability": product.stock_quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "priceValidUntil": validUntilDate.toISOString().split('T')[0],
    },
    "brand": {
      "@type": "Brand",
      "name": "Coaxx"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "89"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: 'Shop', href: '/shop' },
        { label: product.name }
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            {images[selectedImage] ? (
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            {hasDiscount && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {discountPercent}% OFF
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'ring-2 ring-red-600' : ''
                  }`}
                >
                  {img && (
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            {hasDiscount && (
              <span className="text-2xl text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
            <span className={`text-4xl font-bold ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
              {formatPrice(displayPrice)}
            </span>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.stock_quantity > 0 ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                In Stock ({product.stock_quantity} available)
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                disabled={quantity >= product.stock_quantity}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock_quantity <= 0}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
            <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 transition">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 transition">
              <Share2 className="h-6 w-6" />
            </button>
          </div>

          {/* Discreet Shipping Note */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Discreet Shipping & Billing
              </h3>
              <p className="text-sm text-gray-600">
                All orders ship in plain, unmarked packaging. Your billing statement will show a discreet descriptor. 
                Your privacy is our priority.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> Free shipping on orders over $100
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> 30-day money-back guarantee
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> Body-safe, premium materials
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16 border-t border-gray-200 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Material:</span>
                <span>Premium blend</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Care:</span>
                <span>Hand wash cold</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Origin:</span>
                <span>Imported</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Care Instructions</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Hand wash in cold water</li>
              <li>• Use mild detergent</li>
              <li>• Do not bleach</li>
              <li>• Lay flat to dry</li>
              <li>• Do not iron</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Size Guide</h3>
            <p className="text-gray-700 mb-3">
              Find your perfect fit with our comprehensive size guide.
            </p>
            <button className="text-red-600 hover:text-red-700 font-semibold">
              View Size Guide →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
