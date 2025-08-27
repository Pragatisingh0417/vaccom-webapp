"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewCoupons() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const res = await axios.get("/api/admin/coupons");
    setCoupons(res.data);
  };

  const deleteCoupon = async (id: string) => {
    await axios.delete(`/api/admin/coupons/${id}`);
    fetchCoupons();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">📋 Coupons List</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Code</th>
            <th className="p-2 border">Discount</th>
            <th className="p-2 border">Expiry</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon: any) => (
            <tr key={coupon._id}>
              <td className="p-2 border">{coupon.code}</td>
              <td className="p-2 border">
                {coupon.discountType} - {coupon.discountValue}
              </td>
              <td className="p-2 border">{coupon.expiryDate?.slice(0, 10)}</td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteCoupon(coupon._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
