"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function EditProductPage() {
  const { id } = useParams(); 
  const router = useRouter();

  // Same arrays as in AddProductPage
  const brands = [
    "Akitas", "Bissell", "Black Decker", "Bosch", "Dreame", "Dyson", 
    "Ecovacs", "Enzyme Wizard", "Hoover", "i-Vac", "Kobold", "Nilfisk", "Numatic", 
    "Midea", "Miele", "Panasonic", "Pullman", "Roborock", "Sauber", "Sebo", 
    "Shark", "Tineco", "Vax", "Wertheim"
  ];

  const categories = [
    "Corded Vacuums", "Cordless Vacuums", "Robots", "Carpet Washers", 
    "Hard Floor Cleaners", "Steamers", "Commercial", "Cleaning Chemicals", 
    "Accessories & Parts", "Vacuum Bags & Filters"
  ];

  const [product, setProduct] = useState<Product>({
    _id: "",
    name: "",
    price: 0,
    shortDesc: "",
    longDesc: "",
    brand: "",
    category: "",
    images: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        alert("Product updated successfully");
        router.push("/admin/cms/product-list");
      } else {
        alert("Failed to update product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={product.name} onChange={handleChange} placeholder="Name" className="w-full border px-3 py-2"/>
        <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Price" className="w-full border px-3 py-2"/>
        <input name="shortDesc" value={product.shortDesc} onChange={handleChange} placeholder="Short Description" className="w-full border px-3 py-2"/>
        <textarea name="longDesc" value={product.longDesc} onChange={handleChange} placeholder="Long Description" className="w-full border px-3 py-2"/>
        
        <select name="brand" value={product.brand} onChange={handleChange} className="w-full border px-3 py-2">
          <option value="">Select Brand</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select name="category" value={product.category} onChange={handleChange} className="w-full border px-3 py-2">
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update Product</button>
      </form>
    </div>
  );
}
