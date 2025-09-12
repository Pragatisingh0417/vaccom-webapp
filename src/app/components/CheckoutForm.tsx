"use client";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

type CheckoutFormProps = {
  cart: any[];
  email: string;
  totalAmount: number;
};

export default function CheckoutForm({ cart, email, totalAmount }: CheckoutFormProps) {
  const { clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    try {
      // 1️⃣ Create PaymentIntent on backend
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount * 100, currency: "usd" }), // amount in cents
      });

      if (!checkoutRes.ok) throw new Error("Failed to create PaymentIntent");
      const { clientSecret } = await checkoutRes.json();

      // 2️⃣ Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: { email: email || "guest@example.com" },
        },
      });

      if (error) {
        console.error("❌ Payment failed:", error.message);
        router.push("/cancel");
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // 3️⃣ Create order in your database
        const orderRes = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            items: cart.map((item) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              qty: item.quantity,
              image: item.imageUrl || "/placeholder.png",
            })),
            amount: totalAmount,
            currency: "usd",
            paymentId: paymentIntent.id,
            userEmail: email,
          }),
        });

        if (!orderRes.ok) throw new Error("Failed to save order");
        const data = await orderRes.json();

        if (data.success) {
          const orderWithEmail = { ...data.order, userEmail: email };
          localStorage.setItem("latestOrder", JSON.stringify(orderWithEmail));

          // 4️⃣ Clear cart & redirect to success
          clearCart();
          router.push("/success");
        }
      }
    } catch (err: any) {
      console.error("❌ Checkout error:", err.message);
      router.push("/cancel");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
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
        {processing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
}
