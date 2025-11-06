"use client";
import React from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { cart, addToCart, increaseQuantity } = useCart();

  const handleAddToCart = (product: any) => {
    const inCart = cart.find((i) => i.id === product.id);
    if (inCart) {
      increaseQuantity(product.id, 1);
    } else {
      addToCart(product, 1);
    }
    // ✅ remove from wishlist automatically
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-700">
        <p className="text-2xl mb-4">Your wishlist is empty 💔</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {wishlist.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded shadow hover:shadow-lg transition relative"
        >
          <img
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <Link href={`/products/${product.slug}`}>
            <h2 className="font-semibold text-lg hover:text-blue-600 cursor-pointer">
              {product.name}
            </h2>
          </Link>
          <p className="text-gray-700">${product.price}</p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handleAddToCart(product)}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              <FiShoppingCart /> Add to Cart
            </button>

            <button
              onClick={() => removeFromWishlist(product.id)}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-400 px-3 py-2 rounded hover:bg-gray-100"
            >
              <FiTrash2 /> Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
