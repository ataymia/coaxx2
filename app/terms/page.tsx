import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Coaxx',
  description: 'Read our terms of service and conditions for using the Coaxx website.',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using the Coaxx website, you agree to be bound by these Terms of Service and all applicable 
                laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Age Requirement</h2>
              <p className="text-gray-700 leading-relaxed">
                You must be at least 18 years old to use this website and purchase products. By using this site, you represent 
                and warrant that you are of legal age to form a binding contract.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Permission is granted to temporarily access and use the materials on Coaxx&apos;s website for personal, 
                non-commercial purposes only. This license does not include the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for commercial purposes</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove copyright or proprietary notations</li>
                <li>Transfer the materials to another person or mirror them on another server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Information</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that 
                product descriptions or other content is accurate, complete, reliable, or error-free. We reserve the right 
                to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pricing and Payment</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All prices are in USD and are subject to change without notice. We accept payment through Stripe and other 
                approved payment methods. By providing payment information, you represent and warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You have the legal right to use any payment method provided</li>
                <li>The information you provide is true and accurate</li>
                <li>You will pay charges incurred by you or any users of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping and Delivery</h2>
              <p className="text-gray-700 leading-relaxed">
                We ship to addresses within the United States and Canada. Shipping times and costs vary by location and 
                shipping method selected. All orders are shipped discreetly in unmarked packaging. Risk of loss and title 
                for items purchased pass to you upon delivery to the carrier.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Returns and Refunds</h2>
              <p className="text-gray-700 leading-relaxed">
                Our return policy allows returns of unworn, unwashed items with original tags within 30 days of delivery. 
                For hygiene and health reasons, items with removed hygiene seals cannot be returned. Please see our 
                <a href="/shipping" className="text-red-600 hover:text-red-700 ml-1">Shipping & Returns page</a> for complete details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Our use of your personal information is governed by our 
                <a href="/privacy" className="text-red-600 hover:text-red-700 ml-1">Privacy Policy</a>. 
                By using this site, you consent to our collection and use of personal information as outlined in that policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prohibited Uses</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You may not use our site:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>In any way that violates laws or regulations</li>
                <li>To engage in fraudulent activity</li>
                <li>To transmit harmful or malicious code</li>
                <li>To interfere with site security features</li>
                <li>To harass, abuse, or harm others</li>
                <li>To impersonate any person or entity</li>
                <li>For any automated or systematic data collection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of 
                Coaxx or its content suppliers and is protected by copyright and trademark laws. Unauthorized use of any 
                materials may violate copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed">
                This website and all products are provided &quot;as is&quot; without any warranties, express or implied. We do not 
                warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Coaxx shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                resulting from your use of or inability to use the website or products, even if we have been advised of 
                the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
                Coaxx operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately 
                upon posting to the website. Your continued use of the site after changes constitutes acceptance of the 
                modified terms.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> legal@coaxx.com<br />
                <strong>Phone:</strong> 1-800-COAXX-00
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
