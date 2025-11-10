import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Coaxx',
  description: 'Learn about Coaxx, your destination for premium intimate apparel and lingerie.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Coaxx</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Coaxx is your destination for sultry, tasteful intimate apparel that makes you feel confident and beautiful. 
                We believe that lingerie should be both empowering and elegant, combining sophisticated design with exceptional comfort.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Founded with a passion for quality and style, we curate collections that celebrate every body type and personal style. 
                From our &quot;Barely Proper&quot; collection to &quot;Pretty Ruthless&quot;, each piece is selected to help you express your unique confidence.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl">✓</span>
                  <div>
                    <strong className="text-gray-900">Quality First:</strong>
                    <span className="text-gray-700"> We source only body-safe, premium materials that feel as good as they look.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl">✓</span>
                  <div>
                    <strong className="text-gray-900">Inclusive Sizing:</strong>
                    <span className="text-gray-700"> Beautiful lingerie for every body, with comprehensive sizing guides to ensure the perfect fit.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl">✓</span>
                  <div>
                    <strong className="text-gray-900">Discreet Service:</strong>
                    <span className="text-gray-700"> Your privacy matters. All orders ship in unmarked packaging with discreet billing.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl">✓</span>
                  <div>
                    <strong className="text-gray-900">Exceptional Service:</strong>
                    <span className="text-gray-700"> Our team is here to help you find exactly what you&apos;re looking for.</span>
                  </div>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Collections</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-red-600 mb-2">Barely Proper</h3>
                  <p className="text-gray-700">
                    Delicate pieces that walk the line between innocent and alluring. 
                    Soft fabrics, subtle details, and classic silhouettes.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-amber-600 mb-2">Pretty Ruthless</h3>
                  <p className="text-gray-700">
                    Bold, confident designs for those who know what they want. 
                    Statement pieces with daring cuts and luxurious finishes.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-red-50 to-amber-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-4">
                Have questions or need help finding the perfect piece? Our team is here for you.
              </p>
              <a 
                href="/contact" 
                className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
              >
                Contact Us
              </a>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
