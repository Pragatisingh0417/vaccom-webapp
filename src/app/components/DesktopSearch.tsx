'use client';

import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  slug: string;
  images?: string[];
  price?: number;
}

export default function DesktopSearch() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products'); // your API endpoint
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowDropdown(e.target.value.trim().length > 0);
  };

  const handleSelect = () => {
    setQuery('');
    setShowDropdown(false);
  };

  return (
    <div className="relative w-[280px] hidden md:flex flex-col">
      <div className="flex items-center rounded overflow-hidden bg-white text-black border border-gray-300">
        <input
          type="text"
          placeholder="Search Products"
          className="px-3 py-2 text-sm w-full outline-none"
          value={query}
          onChange={handleChange}
        />
        <button className="bg-black px-4 py-2 text-white">
          <FaSearch />
        </button>
      </div>

      {showDropdown && filteredProducts.length > 0 && (
        <div className="absolute top-full mt-1 w-full text-black bg-white border border-gray-300 max-h-60 overflow-y-auto z-50">
          {filteredProducts.map((product) => (
            <Link
              href={`/products/${product.slug}`}
              key={product._id}
              onClick={handleSelect}
            >
              <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                {product.images?.[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="mr-2 object-cover"
                  />
                )}
                <span className="text-sm">{product.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {showDropdown && filteredProducts.length === 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 p-2 text-sm text-gray-500 z-50">
          No products found.
        </div>
      )}
    </div>
  );
}
