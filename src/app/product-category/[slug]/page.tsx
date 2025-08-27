import ProductCard from "@/app/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>; // ✅ params is a Promise
}

function normalizeSlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function CategoryPage({ params }: Props) {
  const { slug: rawSlug } = await params; // ✅ await params
  const normalizedSlug = normalizeSlug(rawSlug);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=${rawSlug}`, 
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  const products = Array.isArray(data) ? data : data.products || [];

  return (
    <div>
       <div className="bg-[url('https://vaccom.com.au/wp-content/uploads/2025/06/VACCUM-GP-2.jpg')] bg-cover bg-center h-64 md:h-72 flex items-center">
        <div className="flex flex-col justify-center ml-6 md:ml-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{normalizedSlug}</h1>
          <span className="text-white text-xl md:text-2xl">Brand: {normalizedSlug}</span>
        </div>
      </div>

            {/* Products */}

    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{normalizedSlug}</h1>


      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
    </div>
  );
}
