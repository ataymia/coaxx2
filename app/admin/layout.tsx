import Link from 'next/link';
import { Package, Tags, ShoppingCart, Settings } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">
            <span className="text-red-600">Co</span>
            <span className="text-amber-600">ax</span>
            <span>x</span> Admin
          </h1>
        </div>
        
        <nav className="mt-6">
          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
          >
            <Package className="h-5 w-5" />
            <span>Products</span>
          </Link>
          
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Orders</span>
          </Link>
          
          <Link
            href="/admin/tags"
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
          >
            <Tags className="h-5 w-5" />
            <span>Tags</span>
          </Link>
          
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
          
          <div className="border-t border-gray-700 mt-6 pt-6 px-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition">
              ← Back to Store
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
