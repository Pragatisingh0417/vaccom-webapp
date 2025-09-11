"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("latestOrder");
    if (storedOrder) setOrder(JSON.parse(storedOrder));
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      {order ? (
        <p className="mb-6">
          Your order #{order._id} has been placed. Confirmation email sent to {order.userEmail || order.email}.
        </p>
      ) : (
        <p className="mb-6">Your order has been placed. Confirmation email sent.</p>
      )}
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded"
        onClick={() => router.push("/orders")}
      >
        View My Orders
      </button>
    </div>
  );
}
