import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package, RefreshCw, Shield, Truck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns - Coaxx',
  description: 'Learn about our shipping policy, delivery times, and hassle-free returns process.',
};

export default function ShippingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping & Returns</h1>

          {/* Key Points */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Free Shipping</h3>
              <p className="text-xs text-gray-600 mt-1">Orders over $100</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Discreet Packaging</h3>
              <p className="text-xs text-gray-600 mt-1">Unmarked boxes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="h-6 w-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">30-Day Returns</h3>
              <p className="text-xs text-gray-600 mt-1">Hassle-free</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Secure Checkout</h3>
              <p className="text-xs text-gray-600 mt-1">SSL encrypted</p>
            </div>
          </div>

          {/* Shipping Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Policy</h2>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Discreet Shipping</h3>
                <p className="text-gray-700">
                  All orders are shipped in plain, unmarked packaging to protect your privacy. 
                  The return address and billing statements will show a discreet business name.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Delivery Times</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Standard Shipping (3-5 business days): $5.99</li>
                  <li>Express Shipping (1-2 business days): $12.99</li>
                  <li>Free Standard Shipping on orders over $100</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Processing Time</h3>
                <p className="text-gray-700">
                  Orders are typically processed within 1-2 business days. You&apos;ll receive a tracking number once your order ships.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">International Shipping</h3>
                <p className="text-gray-700">
                  We currently ship to the US and Canada. International shipping rates and times vary by location. 
                  Customs fees and duties are the responsibility of the customer.
                </p>
              </div>
            </div>
          </section>

          {/* Returns Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Returns & Exchanges</h2>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">30-Day Return Policy</h3>
                <p className="text-gray-700">
                  We want you to love your purchase! If you&apos;re not completely satisfied, you can return unworn, 
                  unwashed items with original tags within 30 days of delivery for a full refund or exchange.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Hygiene & Safety</h3>
                <p className="text-gray-700">
                  For health and hygiene reasons, intimate apparel must be unworn and in original condition. 
                  Items with removed hygiene seals cannot be returned.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How to Return</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-1">
                  <li>Contact our customer service team at support@coaxx.com</li>
                  <li>Receive your return authorization and shipping label</li>
                  <li>Pack items securely with original tags attached</li>
                  <li>Ship using the provided label</li>
                  <li>Receive your refund within 5-7 business days after we receive your return</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Exchange Process</h3>
                <p className="text-gray-700">
                  Need a different size or color? We&apos;ll expedite your exchange at no additional cost. 
                  Contact us and we&apos;ll help you find the perfect fit.
                </p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Have Questions About Your Order?
            </h3>
            <p className="text-gray-700 mb-6">
              Our customer service team is here to help with shipping, returns, or any other concerns.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
