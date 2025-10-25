'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState , Suspense} from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationNewPage />
    </Suspense>
  );
}

function ConfirmationNewPage()  {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const confirmOrder = async () => {
      const transactionId = searchParams.get("transactionId");
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail");

      if (!transactionId) {
        setError("Missing transaction ID.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/orders/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ transactionId, userEmail }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Order confirmation failed.");
        } else {
          setOrderId(data.orderId);
          setEmailSent(data.emailSent);
        }
      } catch (err) {
        console.error("Error confirming order:", err);
        setError("Unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    confirmOrder();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-center px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h1>
        <p className="mt-4 text-gray-600">
          {loading
            ? "Finalizing your order..."
            : error
            ? error
            : `Your Order ID: ${orderId}`}
        </p>
        {!loading && !error && (
          <p className="mt-2 text-gray-500 text-sm">
            {emailSent
              ? "A confirmation email has been sent to your registered email."
              : "Email confirmation pending..."}
          </p>
        )}
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
