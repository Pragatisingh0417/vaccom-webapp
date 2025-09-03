"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/app/components/ProductCard";
import ProductToolbar from "@/app/components/ProductToolbar";

interface Props {
  params: Promise<{ slug: string }>;
}

function normalizeSlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BrandPage({ params }: Props) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const { slug: rawSlug } = await params;
      const normalizedSlug = normalizeSlug(rawSlug);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const apiUrl = `${baseUrl}/api/products?brand=${encodeURIComponent(normalizedSlug)}`;

      console.log("Fetching products from:", apiUrl);

      try {
        const res = await fetch(apiUrl, { cache: "no-store" });
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (e) {
        console.error("❌ Failed to fetch products:", e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [params]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div>
      {/* Banner */}
      <div className="bg-[url('https://vaccom.com.au/wp-content/uploads/2025/06/VACCUM-GP-2.jpg')] bg-cover bg-center h-64 md:h-72 flex items-center">
        <div className="flex flex-col justify-center ml-6 md:ml-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {products[0]?.brand || "Brand"}
          </h1>
          <span className="text-white text-xl md:text-2xl">
            Brand: {products[0]?.brand}
          </span>
        </div>
      </div>

      {/* ✅ Toolbar */}
      <div className="max-w-6xl mx-auto p-6">
        <ProductToolbar
          results={products.length}
          sort={sort}
          setSort={setSort}
          view={view}
          setView={setView}
        />

        {/* Products */}
        {products.length > 0 ? (
          <div
            className={`grid gap-6 ${
              view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} view={view} />
            ))}
          </div>
        ) : (
          <p>No products found for this brand.</p>
        )}
      </div>
    </div>
  );
}
