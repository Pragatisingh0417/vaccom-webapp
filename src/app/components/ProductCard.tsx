"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart, Product as CartProduct } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
  brand?: string;   // 👈 make optional
  oldPrice?: number;
  badge?: "sale" | "new";
}


interface Props {
  product: Product;
  view?: "grid" | "list";
}

export default function ProductCard({ product, view = "grid" }: Props) {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showToast, setShowToast] = useState<string | null>(null);

 const productForCart: CartProduct = {
  id: product._id,
  name: product.name,
  price: product.price,
  imageUrl: product.images?.[0] || "/placeholder.png",
  slug: product.slug,
  brand: product.brand || "Unknown", // 👈 safe fallback
};


  const cartItem = cart.find((item) => item.id === productForCart.id);
  const inWishlist = isInWishlist(productForCart.id);

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(productForCart.id);
      setShowToast("Removed from wishlist");
    } else {
      addToWishlist(productForCart);
      setShowToast("Added to wishlist");
    }
    setTimeout(() => setShowToast(null), 1500);
  };

  return (
    <div
      className={`relative bg-white border rounded-2xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-1 p-4 ${
        view === "list" ? "flex gap-4 items-center" : ""
      }`}
    >
      {/* ✅ Wishlist Heart (Top-Right) */}
      <button
        onClick={handleWishlist}
        className="absolute bottom-5 right-3 p-2 rounded-full bg-white shadow hover:scale-110 transition"
      >
        <FiHeart
          className={`w-6 h-6 ${
            inWishlist ? "fill-red-500 text-red-500" : "text-gray-500"
          }`}
        />
      </button>

      {/* ✅ Toast Notification */}
      {showToast && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-2 rounded text-xs shadow">
          {showToast}
        </div>
      )}

      {/* ✅ Badge */}
      {product.badge && (
        <span
          className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
            product.badge === "sale"
              ? "bg-red-600 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {product.badge === "sale" ? "ON SALE" : "NEW"}
        </span>
      )}

      {/* ✅ Product Image */}
      <Link href={`/products/${product.slug}`} className="flex-shrink-0">
        <img
          src={productForCart.imageUrl}
          alt={product.name}
          className={`rounded-xl object-cover transition-transform duration-300 hover:scale-105 ${
            view === "list"
              ? "w-40 h-40"
              : "w-full h-48 md:h-56 mx-auto mb-3"
          }`}
        />
      </Link>

      {/* ✅ Product Info */}
      <div className={view === "list" ? "flex-1" : ""}>
        <Link href={`/products/${product.slug}`}>
          <h2 className="font-semibold text-lg md:text-xl hover:text-red-600 line-clamp-2">
            {product.name}
          </h2>
        </Link>

        {/* ✅ Pricing */}
        <div className="mt-2">
          {product.oldPrice && (
            <span className="text-gray-400 line-through mr-2 text-sm">
              ${product.oldPrice}
            </span>
          )}
          <span className="text-red-600 font-bold text-lg">
            ${product.price}
          </span>
        </div>

        {/* ✅ Add to Cart */}
        <div className="flex gap-2 mt-4">
          {cartItem ? (
            <div className="flex items-center gap-2 border rounded-full px-6 py-1 bg-gray-50">
              <button
                onClick={() => decreaseQuantity(cartItem.id, 1)}
                className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-medium">{cartItem.quantity}</span>
              <button
                onClick={() => increaseQuantity(cartItem.id, 1)}
                className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(productForCart, 1)}
              className=" flex items-left justify-center gap-2 bg-gradient-to-r from-red-500 to-red-500 text-white px-8 py-2 rounded-full hover:opacity-90 transition"
            >
              {/* <FiShoppingCart /> */}
               Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
