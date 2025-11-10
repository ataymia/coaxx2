import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// Mock search results
const searchProducts = (query: string): Product[] => {
  const allProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones',
      price: 299.99,
      sale_price: 199.99,
      stock_quantity: 50,
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
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
  
  return allProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
  );
};

function SearchResults({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || '';
  const results = query ? searchProducts(query) : [];

  if (!query) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600">Enter a search term to find products</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600">No products found for &quot;{query}&quot;</p>
        <p className="text-gray-500 mt-2">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-gray-600">
          Found {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Search Results</h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults searchParams={params} />
      </Suspense>
    </div>
  );
}
