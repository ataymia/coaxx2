import Link from 'next/link';
import { Package, ShoppingCart, Tags, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  // Mock stats - would come from database
  const stats = {
    totalProducts: 24,
    totalOrders: 156,
    totalRevenue: 12450.00,
    totalTags: 8,
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">Total Products</h3>
            <Package className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
          <Link href="/admin/products" className="text-sm text-red-600 hover:underline mt-2 inline-block">
            Manage Products →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">Total Orders</h3>
            <ShoppingCart className="h-8 w-8 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
          <Link href="/admin/orders" className="text-sm text-amber-600 hover:underline mt-2 inline-block">
            View Orders →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">Total Revenue</h3>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            ${stats.totalRevenue.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mt-2">All time</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium">Total Tags</h3>
            <Tags className="h-8 w-8 text-gray-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalTags}</p>
          <Link href="/admin/tags" className="text-sm text-gray-600 hover:underline mt-2 inline-block">
            Manage Tags →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products/new"
            className="p-4 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition text-center font-semibold"
          >
            + Add New Product
          </Link>
          <Link
            href="/admin/orders"
            className="p-4 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition text-center font-semibold"
          >
            View Recent Orders
          </Link>
          <Link
            href="/admin/tags/new"
            className="p-4 border-2 border-gray-600 text-gray-600 rounded-lg hover:bg-gray-50 transition text-center font-semibold"
          >
            + Add New Tag
          </Link>
        </div>
      </div>
    </div>
  );
}
