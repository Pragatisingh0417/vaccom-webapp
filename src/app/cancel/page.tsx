"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    async function cancelTransaction() {
      const latestTx = localStorage.getItem("latestTransactionId");
      if (latestTx) {
        await fetch(`/api/admin/transactions/${latestTx}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "failed" }),
        });
      }
    }

    cancelTransaction();

    const timer = setTimeout(() => {
      router.push("/checkout");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-center px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-red-600">❌ Payment Cancelled</h1>
        <p className="mt-4 text-gray-600">
          Your payment was not completed. You’ll be redirected back to the
          checkout page in 5 seconds.
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
