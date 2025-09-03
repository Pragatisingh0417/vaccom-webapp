"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart, Product as CartProduct } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { FiHeart } from "react-icons/fi";

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  slug: string;
  brand?: string;
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
  const [currentImage, setCurrentImage] = useState(
    product.images?.[0] || "/placeholder.png"
  );

  const productForCart: CartProduct = {
    id: product._id,
    name: product.name,
    price: product.salePrice || product.price,
    imageUrl: product.images?.[0] || "/placeholder.png",
    slug: product.slug,
    brand: product.brand || "Unknown",
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
      className={`relative bg-white border rounded-2xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-1 p-4
        ${view === "list" ? "flex gap-6 items-center" : ""}`}
        
    >
      {/* Wishlist Heart */}
      <button
        onClick={handleWishlist}
        className="absolute bottom-5 right-3 p-2 rounded-full bg-white shadow hover:scale-110 transition"
      >
        <FiHeart
          className={`w-6 h-6 ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-500"}`}
        />
      </button>

      {/* Toast */}
      {showToast && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-2 rounded text-xs shadow">
          {showToast}
        </div>
      )}

      {/* Badge */}
      {product.salePrice || product.badge ? (
        <span
          className={`absolute -top-2 -left-2 z-10 text-xs font-bold px-6 py-3 rounded-full shadow-md ${
            product.salePrice || product.badge === "sale"
              ? "bg-red-600 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {product.salePrice || product.badge === "sale" ? "ON SALE" : "NEW"}
        </span>
      ) : null}

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="flex-shrink-0 relative">
        <img
          src={currentImage}
          alt={product.name}
          className={`rounded-xl object-cover transition-all duration-500
            ${view === "list" ? "w-40 h-40" : "w-full h-52 md:h-56 mx-auto mb-3"}`}
          onMouseEnter={() => {
            if (product.images?.[1]) setCurrentImage(product.images[1]);
          }}
          onMouseLeave={() =>
            setCurrentImage(product.images?.[0] || "/placeholder.png")
          }
        />
      </Link>

      {/* Product Info */}
      <div className={view === "list" ? "flex-1" : ""}>
        <Link href={`/products/${product.slug}`}>
          <h2
            className={`font-semibold hover:text-red-600 ${
              view === "list"
                ? "text-lg md:text-xl mb-2"
                : "text-base md:text-lg line-clamp-2"
            }`}
          >
            {product.name}
          </h2>
        </Link>

        {/* Pricing */}
        <div className="mt-2">
          {product.salePrice ? (
            <>
              <span className="text-gray-400 line-through mr-2 text-sm">
                ${product.price}
              </span>
              <span className="text-red-600 font-bold text-lg">
                ${product.salePrice}
              </span>
            </>
          ) : (
            <span className="text-red-600 font-bold text-lg">${product.price}</span>
          )}
        </div>

        {/* Add to Cart */}
       {/* Add to Cart */}
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
      onClick={() => {
        addToCart(productForCart, 1); // Add to cart
        setShowToast("Item added to cart"); // Show toast
        setTimeout(() => setShowToast(null), 1500); // Hide toast after 1.5s
      }}
      className={`flex justify-center gap-2 bg-gradient-to-r from-red-500 to-red-500 text-white px-8 py-2 rounded-full hover:opacity-90 transition
        ${view === "list" ? "mt-2" : ""}`}
    >
      Add To Cart
    </button>
  )}
</div>

      </div>
    </div>
  );
}
