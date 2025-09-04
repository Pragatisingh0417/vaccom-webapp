"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const getStoredCart = () =>
  typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart") || "[]") : [];
const getUserToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function saveOrder() {
      const cartItems = getStoredCart();
      const token = getUserToken();

      if (!cartItems.length) {
        setError("Cart is empty.");
        setLoading(false);
        return;
      }
      if (!token) {
        setError("Login required.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cartItems,
            amount: cartItems.reduce((sum: number, item: any) => sum + item.price * item.qty, 0),
            paymentMethod: "stripe",
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setOrderId(data.order._id);
          localStorage.setItem("latestOrderId", data.order._id);
          localStorage.setItem("latestTransactionId", data.transaction._id); // ✅ save tx id
          localStorage.removeItem("cart");

          // ✅ update transaction → completed
          await fetch(`/api/admin/transactions/${data.transaction._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "completed" }),
          });
        } else {
          setError(data.error || "Failed to save order.");
        }
      } catch (err) {
        setError("Unexpected error while saving order.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    saveOrder();
    const timer = setTimeout(() => router.push("/"), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-center px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h1>
        <p className="mt-4 text-gray-600">
          {loading
            ? "Saving your order..."
            : error
            ? error
            : `Your Order ID: ${orderId}`}
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Go to Home Now
        </button>
      </div>
    </div>
  );
}
