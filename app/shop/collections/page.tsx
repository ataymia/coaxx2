import Link from 'next/link';
import Image from 'next/image';
import { Collection } from '@/types';
import { Heart, Sparkles } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

// Main collections based on brand
const collections: Collection[] = [
  { 
    id: '1', 
    name: 'Barely Proper', 
    slug: 'barely-proper',
    description: 'Delicate pieces that walk the line between innocent and alluring. Soft fabrics, subtle details, and classic silhouettes.',
    image_url: 'https://images.unsplash.com/photo-1583225173950-c83b8aecb14a?w=800&h=600&fit=crop',
    featured: true,
  },
  { 
    id: '2', 
    name: 'Pretty Ruthless', 
    slug: 'pretty-ruthless',
    description: 'Bold, confident designs for those who know what they want. Statement pieces with daring cuts and luxurious finishes.',
    image_url: 'https://images.unsplash.com/photo-1611506152948-c29c0e4b2e87?w=800&h=600&fit=crop',
    featured: true,
  },
  { 
    id: '3', 
    name: 'Essentials', 
    slug: 'essentials',
    description: 'Everyday comfort meets sophisticated style. Your go-to pieces for any occasion.',
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
  },
  { 
    id: '4', 
    name: 'New Arrivals', 
    slug: 'new-arrivals',
    description: 'Fresh styles just added to our collection. Be the first to discover our latest designs.',
    image_url: 'https://images.unsplash.com/photo-1583225177606-eb913480f3a1?w=800&h=600&fit=crop',
  },
];

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: 'Shop', href: '/shop' },
        { label: 'Collections' }
      ]} />

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Collections</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Curated styles for every mood and moment. Find your perfect expression of confidence and elegance.
        </p>
      </div>

      {/* Featured Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {collections.filter(c => c.featured).map((collection) => (
          <Link
            key={collection.id}
            href={`/shop/collections/${collection.slug}`}
            className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={collection.image_url!}
                alt={collection.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  {collection.slug === 'barely-proper' ? (
                    <Heart className="h-5 w-5 text-red-400" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-amber-400" />
                  )}
                  <span className="text-sm font-semibold uppercase tracking-wide">Featured</span>
                </div>
                <h2 className="text-3xl font-bold mb-2 group-hover:text-red-300 transition">
                  {collection.name}
                </h2>
                <p className="text-gray-200 leading-relaxed">
                  {collection.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Other Collections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {collections.filter(c => !c.featured).map((collection) => (
          <Link
            key={collection.id}
            href={`/shop/collections/${collection.slug}`}
            className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-video">
              <Image
                src={collection.image_url!}
                alt={collection.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-red-300 transition">
                  {collection.name}
                </h3>
                <p className="text-gray-200 text-sm">
                  {collection.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
