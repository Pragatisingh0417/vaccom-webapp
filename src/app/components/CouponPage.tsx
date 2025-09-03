"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Coupon {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  expiryDate?: string;
  usedBy: string[];
}

export default function CouponPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const userId = "USER_ID"; // Replace with your auth system user ID
  const totalAmount = 1000; // Example cart total, replace with real total

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("/api/coupons");
        setCoupons(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const applyCoupon = async (code: string) => {
    try {
      const res = await axios.post("/api/coupons/apply", { code, userId, totalAmount });
      if (res.data.success) {
        setMessage(
          `✅ Coupon applied! Discount: ₹${res.data.discount}, Final Amount: ₹${res.data.finalAmount}`
        );

        // Update usedBy locally
        setCoupons((prev) =>
          prev.map((c) =>
            c.code === code ? { ...c, usedBy: [...c.usedBy, userId] } : c
          )
        );
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading coupons...</p>;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Available Coupons</h1>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">{message}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map((coupon) => {
          const isExpired = coupon.expiryDate && new Date(coupon.expiryDate) < new Date();
          const isUsed = coupon.usedBy.includes(userId);

          return (
            <div
              key={coupon._id}
              className={`border p-4 rounded shadow hover:shadow-md transition ${
                isExpired ? "bg-red-100" : isUsed ? "bg-gray-100" : "bg-white"
              }`}
            >
              <h2 className="text-lg font-semibold">{coupon.code}</h2>
              <p>
                Discount:{" "}
                {coupon.discountType === "percentage"
                  ? `${coupon.discountValue}%`
                  : `₹${coupon.discountValue}`}
              </p>
              <p>Minimum Purchase: ₹{coupon.minPurchase}</p>
              {coupon.expiryDate && (
                <p>Expires on: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
              )}
              <button
                onClick={() => applyCoupon(coupon.code)}
                disabled={isExpired || isUsed || totalAmount < coupon.minPurchase}
                className={`mt-2 px-4 py-2 rounded text-white ${
                  isExpired || isUsed || totalAmount < coupon.minPurchase
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isUsed
                  ? "Already Used"
                  : isExpired
                  ? "Expired"
                  : totalAmount < coupon.minPurchase
                  ? `Min ₹${coupon.minPurchase}`
                  : "Apply Coupon"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
