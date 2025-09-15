"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  brand: string;
  category: string;
  images: string[];
  isTodayDeal?: boolean;
  stock: number;
  isActive: boolean;
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle isActive
  const handleToggleActive = async (product: Product) => {
    setSavingSlug(product.slug);

    // Optimistic update
    setProducts((prev) =>
      prev.map((p) =>
        p.slug === product.slug ? { ...p, isActive: !p.isActive } : p
      )
    );

    try {
      const res = await fetch(`/api/products/${product.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !product.isActive }),
      });

      if (!res.ok) throw new Error("Failed to update product");
      const updated = await res.json();

      setProducts((prev) =>
        prev.map((p) =>
          p.slug === updated.slug ? { ...p, isActive: updated.isActive } : p
        )
      );
    } catch (err) {
      console.error(err);
      setError("Error updating product status.");
      // Rollback
      setProducts((prev) =>
        prev.map((p) =>
          p.slug === product.slug ? { ...p, isActive: product.isActive } : p
        )
      );
    } finally {
      setSavingSlug(null);
    }
  };

  // Delete product
  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    setDeletingSlug(product.slug);

    try {
      const res = await fetch(`/api/products/${product.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p.slug !== product.slug));
    } catch (err) {
      console.error(err);
      setError("Error deleting product.");
    } finally {
      setDeletingSlug(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return <p className="text-center py-6 text-gray-600">Loading products...</p>;

  if (error)
    return (
      <div className="text-center text-red-600 py-6 font-semibold">{error}</div>
    );

  if (!products.length)
    return (
      <p className="text-center py-6 text-gray-600">No products found.</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <button
        className="bg-green-500 hover:bg-green-600 text-white mb-5 px-4 py-2 rounded"
        onClick={() => router.push("/admin/cms/add-product")}
      >
        Add Product
      </button>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Brand</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Today’s Deal</th>
              <th className="border px-4 py-2">Images</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-gray-100 odd:bg-white even:bg-gray-50"
              >
                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">
                  {p.salePrice ? (
                    <>
                      <span className="line-through text-gray-500 mr-2">
                        ${p.price}
                      </span>
                      <span className="text-green-600 font-semibold">
                        ${p.salePrice}
                      </span>
                    </>
                  ) : (
                    `$${p.price}`
                  )}
                </td>
                <td className="border px-4 py-2">{p.brand}</td>
                <td className="border px-4 py-2">{p.category}</td>
                <td className="border px-4 py-2">
                  {p.stock > 0 ? (
                    p.stock
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {p.isTodayDeal ? "✅" : "❌"}
                </td>
                <td className="border px-4 py-2">
                  {p.images?.length ? (
                    p.images.map((img, i) => (
                      <img
                        key={`${p._id}-${i}`}
                        src={img || "/placeholder.png"}
                        alt={p.name}
                        className="w-16 h-16 object-cover mr-2 inline-block rounded"
                      />
                    ))
                  ) : (
                    <img
                      src="/placeholder.png"
                      alt="No image"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="border px-4 py-2 flex gap-3 items-center">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => router.push(`/products/${p.slug}`)}
                  >
                    View
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50"
                    onClick={() =>
                      router.push(`/admin/cms/edit-product/${p.slug}`)
                    }
                    disabled={p.stock === 0}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
                    onClick={() => handleDelete(p)}
                    disabled={deletingSlug === p.slug}
                  >
                    {deletingSlug === p.slug ? "Deleting..." : "Delete"}
                  </button>

                  {/* Accessible Toggle */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      aria-label={`Toggle active for ${p.name}`}
                      checked={p.isActive}
                      onChange={() => handleToggleActive(p)}
                      disabled={savingSlug === p.slug}
                      className="sr-only peer"
                    />
                    <span
                      className={`w-11 h-6 rounded-full transition-colors ${
                        p.isActive ? "bg-green-500" : "bg-gray-300"
                      } ${savingSlug === p.slug ? "opacity-50" : ""}`}
                    />
                    <span
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        p.isActive ? "translate-x-5" : ""
                      }`}
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
