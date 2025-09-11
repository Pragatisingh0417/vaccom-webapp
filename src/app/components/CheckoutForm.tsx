"use client";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { error } = await stripe.createPaymentMethod({ type: "card", card });
      if (error) {
        console.error(error);
        router.push("/cancel");
        return;
      }

      const amount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // ✅ Get user email from localStorage
      const userEmail = localStorage.getItem("userEmail");

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            qty: item.quantity,
            image: item.imageUrl || "/placeholder.png",
          })),
          amount,
          currency: "usd",
          userEmail, // ✅ Include userEmail in order
        }),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const data = await res.json();
      console.log("✅ Order created:", data);

      if (data.success) {
        // ✅ Save full order with email in localStorage
        const orderWithEmail = { ...data.order, userEmail };
        localStorage.setItem("latestOrder", JSON.stringify(orderWithEmail));

        clearCart();
        router.push("/success"); // confirmation page
      }
    } catch (err) {
      console.error("❌ Error in checkout:", err);
      router.push("/cancel");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Card Details</label>
        <div className="border p-3 rounded-md">
          <CardElement />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
