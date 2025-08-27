"use client";

import { useState } from "react";
import axios from "axios";

export default function AddCoupon() {
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    expiryDate: "",
    minPurchase: 0,
    usageLimit: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/admin/coupons", form);
    alert("Coupon Created!");
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">➕ Add New Coupon</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="code"
          placeholder="Coupon Code"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <select
          name="discountType"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
        <input
          type="number"
          name="discountValue"
          placeholder="Discount Value"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          name="expiryDate"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="minPurchase"
          placeholder="Minimum Purchase"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="usageLimit"
          placeholder="Usage Limit"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
          Save Coupon
        </button>
      </form>
    </div>
  );
}
