"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600">Add some products to your cart.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 relative">
                <Image
                  src={item.imageUrl || "/placeholder.png"}
                  alt={item.name}
                  fill
                  className="object-contain rounded"
                  unoptimized
                />
              </div>

              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-red-600 font-bold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          onClick={() => router.push("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
