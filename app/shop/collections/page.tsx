import Link from 'next/link';
import { Tag } from '@/types';

// Mock collections/tags
const collections: Tag[] = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Fashion', slug: 'fashion' },
  { id: '3', name: 'Accessories', slug: 'accessories' },
  { id: '4', name: 'Home & Living', slug: 'home-living' },
  { id: '5', name: 'Sports & Outdoors', slug: 'sports-outdoors' },
  { id: '6', name: 'Books & Media', slug: 'books-media' },
];

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Collections</h1>
      <p className="text-gray-600 mb-8">Browse products by category</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/shop/collections/${collection.slug}`}
            className="group relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 hover:from-red-50 hover:to-amber-50 transition overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition mb-2">
                {collection.name}
              </h2>
              <p className="text-gray-600 group-hover:text-gray-700 transition">
                Explore our {collection.name.toLowerCase()} collection
              </p>
            </div>
            <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
