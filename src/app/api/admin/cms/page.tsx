// src/app/admin/cms/page.tsx
'use client';

import Link from 'next/link';

export default function CMSDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">CMS Dashboard</h1>

      <div className="space-y-4">
        <Link
          href="/admin/cms/products"
          className="block p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Manage Products
        </Link>

        <Link
          href="/admin/cms/brands"
          className="block p-4 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Manage Brands
        </Link>

        <Link
          href="/admin/cms/categories"
          className="block p-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Manage Categories
        </Link>
      </div>
    </div>
  );
}
