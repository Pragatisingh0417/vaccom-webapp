"use client";

import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  brand: string;
  categories: string[];
  images: string[];
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading products...</div>;

  if (!products.length)
    return <div className="text-center py-20 text-gray-500">No products available.</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded-xl shadow-sm hover:shadow-md transition bg-white"
          >
            <img
              src={p.images?.[0] || "/placeholder.png"}
              alt={p.name}
              className="w-full h-56 object-cover rounded-t-xl"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-500">{p.brand}</p>
              <p className="text-red-600 font-bold">
                ${p.salePrice || p.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
