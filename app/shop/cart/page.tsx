'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Start shopping to add items to your cart!</p>
        <Link
          href="/shop"
          className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = total();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const totalAmount = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {items.map((item) => {
              const displayPrice = item.product.sale_price ?? item.product.price;
              const itemTotal = displayPrice * item.quantity;

              return (
                <div key={item.product.id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.image_url ? (
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link
                        href={`/shop/product/${item.product.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-red-600 transition"
                      >
                        {item.product.name}
                      </Link>
                      <div className="mt-2 flex items-center gap-3">
                        {item.product.sale_price && item.product.sale_price < item.product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.product.price)}
                          </span>
                        )}
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(displayPrice)}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                            disabled={item.quantity >= item.product.stock_quantity}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="text-sm">Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">
                        {formatPrice(itemTotal)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Estimated Tax</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              {subtotal < 100 && shipping > 0 && (
                <div className="text-sm text-gray-600 bg-amber-50 p-3 rounded border border-amber-200">
                  💡 Add {formatPrice(100 - subtotal)} more for free shipping!
                </div>
              )}
              <div className="text-xs text-gray-500 italic">
                * Tax and shipping calculated at checkout
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/shop/checkout"
              className="block w-full px-6 py-4 bg-red-600 text-white text-center font-semibold rounded-lg hover:bg-red-700 transition mb-4"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/shop"
              className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-700 text-center font-medium rounded-lg hover:border-red-600 hover:text-red-600 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
