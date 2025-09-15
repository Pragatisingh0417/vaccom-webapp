"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CancelPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    async function handleFailedOrder() {
      const latestPaymentId = localStorage.getItem("latestPaymentId");
      const email = localStorage.getItem("userEmail");
      const selectedCountry = localStorage.getItem("selectedCountry");
      const coupon = localStorage.getItem("appliedCoupon")
        ? JSON.parse(localStorage.getItem("appliedCoupon")!)
        : null;
      const shipping = Number(localStorage.getItem("shipping") || 0);
      const cart = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems")!)
        : [];

      if (latestPaymentId && email && cart.length > 0) {
        await fetch("/api/orders/failed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            paymentId: latestPaymentId,
            email,
            cart,
            amount:
              (coupon ? coupon.finalAmount : cart.reduce((sum: any, i: any) => sum + i.price * i.quantity, 0)) +
              shipping,
            shipping,
            selectedCountry,
            coupon: coupon?.code || null,
          }),
        });
      }

      // Clear cart after saving failed order
      clearCart();
    }

    handleFailedOrder();

    const timer = setTimeout(() => router.push("/checkout"), 5000);
    return () => clearTimeout(timer);
  }, [clearCart, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-center px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-red-600">❌ Payment Failed</h1>
        <p className="mt-4 text-gray-600">
          Your payment was not completed. A failed order has been recorded.
          You’ll be redirected back to checkout in 5 seconds.
        </p>
        <button
          onClick={() => router.push("/checkout")}
          className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
