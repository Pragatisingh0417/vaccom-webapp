"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  shortDesc: string;
  longDesc: string;
  brand: string;
  category: string;
  images: string[];
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Short Desc</th>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Category</th>
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
              <td className="border px-4 py-2">{p.price}</td>
              <td className="border px-4 py-2">{p.shortDesc}</td>
              <td className="border px-4 py-2">{p.brand}</td>
              <td className="border px-4 py-2">{p.category}</td>
              <td className="border px-4 py-2">
                {p.images?.length ? (
                  p.images.map((img, i) => (
                    <img
                      key={`${p._id}-${i}`}
                      src={img}
                      alt={p.name}
                      className="w-16 h-16 object-cover mr-2 inline-block"
                    />
                  ))
                ) : (
                  <span>No images</span>
                )}
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => router.push(`/admin/cms/products/${p._id}`)}
                >
                  View
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() =>
                    router.push(`/admin/cms/edit-product/${p._id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
