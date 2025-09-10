'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const getStoredCart = () =>
  typeof window !== "undefined"
    ? JSON.parse(sessionStorage.getItem("latestCart") || "[]")
    : [];
const getUserToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
const getUserEmail = () =>
  typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    async function saveOrderAndSendEmail() {
      const cartItems = getStoredCart();
      const token = getUserToken();
      const userEmail = getUserEmail();

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
        // 1️⃣ Save Order
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

        if (!res.ok) {
          setError(data.error || "Failed to save order.");
          setLoading(false);
          return;
        }

        setOrderId(data.order._id);
        localStorage.setItem("latestOrderId", data.order._id);
        localStorage.setItem("latestTransactionId", data.transaction._id);

        // Clear session cart (not localStorage)
        sessionStorage.removeItem("latestCart");
        localStorage.removeItem("cart"); // optional cleanup

        // 2️⃣ Update transaction → completed
        await fetch(`/api/admin/transactions/${data.transaction._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "completed" }),
        });

        // 3️⃣ Send confirmation email
        const emailRes = await fetch("/api/orders/confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: data.order._id,
            email: data.order.userEmail || userEmail,
            items: data.order.items,
            amount: data.order.amount,
          }),
        });

        if (emailRes.ok) {
          setEmailSent(true);
        } else {
          console.error("Email sending failed:", await emailRes.json());
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    saveOrderAndSendEmail();

    // Redirect home after 6s
    const timer = setTimeout(() => router.push("/"), 6000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-center px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h1>
        <p className="mt-4 text-gray-600">
          {loading
            ? "Processing your order..."
            : error
            ? error
            : `Your Order ID: ${orderId}`}
        </p>
        {!loading && !error && (
          <p className="mt-2 text-gray-500 text-sm">
            {emailSent
              ? "A confirmation email has been sent to your registered email."
              : "Sending confirmation email..."}
          </p>
        )}
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
