"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Coupon {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  expiryDate?: string;
  usageLimit: number;
  usedBy: string[];
}

export default function AddCoupon() {
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    expiryDate: "",
    minPurchase: 0,
    usageLimit: 1,
  });
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Coupon>>({});
  const [error, setError] = useState("");

  // Fetch coupons
  const fetchCoupons = async () => {
    try {
      const res = await axios.get("/api/admin/coupons");
      setCoupons(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Validate form
  const validateCoupon = (data: typeof form | Partial<Coupon>) => {
    if (!data.code || data.code.trim() === "") return "Coupon code is required";
    if (data.discountValue === undefined || data.discountValue < 0)
      return "Discount value must be >= 0";
    if (data.minPurchase !== undefined && data.minPurchase < 0)
      return "Minimum purchase must be >= 0";
    if (data.usageLimit !== undefined && data.usageLimit < 1)
      return "Usage limit must be at least 1";
    return "";
  };

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ["discountValue", "minPurchase", "usageLimit"].includes(name)
        ? Math.max(0, Number(value))
        : value,
    });
  };

  // Submit new coupon
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateCoupon(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const payload = {
        ...form,
        expiryDate: form.expiryDate ? new Date(form.expiryDate).toISOString() : undefined,
      };
      const res = await axios.post("/api/admin/coupons", payload);
      setCoupons([...coupons, res.data]); // add new coupon locally
      setForm({ code: "", discountType: "percentage", discountValue: 0, expiryDate: "", minPurchase: 0, usageLimit: 1 });
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create coupon");
    }
  };

  // Delete coupon
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await axios.delete("/api/admin/coupons", { data: { id } });
      setCoupons(coupons.filter((c) => c._id !== id)); // remove locally
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to delete coupon");
    }
  };

  // Edit coupon
  const handleEdit = (coupon: Coupon) => {
    setEditingId(coupon._id);
    setEditForm({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minPurchase: coupon.minPurchase,
      expiryDate: coupon.expiryDate ? coupon.expiryDate.split("T")[0] : "",
      usageLimit: coupon.usageLimit,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: ["discountValue", "minPurchase", "usageLimit"].includes(name)
        ? Math.max(0, Number(value))
        : value,
    });
  };

  const handleSave = async (id: string) => {
    const validationError = validateCoupon(editForm);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const payload = {
        ...editForm,
        expiryDate: editForm.expiryDate ? new Date(editForm.expiryDate).toISOString() : undefined,
      };
      const res = await axios.put("/api/admin/coupons", { id, ...payload });
      setCoupons(coupons.map((c) => (c._id === id ? res.data : c))); // update locally
      setEditingId(null);
      setEditForm({});
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update coupon");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
    setError("");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Add Coupon Form */}
      <div className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">➕ Add New Coupon</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="code" placeholder="Coupon Code" value={form.code} onChange={handleChange} className="border p-2 rounded w-full" required />
          <select name="discountType" value={form.discountType} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
          <input type="number" name="discountValue" placeholder="Discount Value" value={form.discountValue} onChange={handleChange} className="border p-2 rounded w-full" required />
          <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} className="border p-2 rounded w-full" />
          <input type="number" name="minPurchase" placeholder="Minimum Purchase" value={form.minPurchase} onChange={handleChange} className="border p-2 rounded w-full" />
          <input type="number" name="usageLimit" placeholder="Usage Limit" value={form.usageLimit} onChange={handleChange} className="border p-2 rounded w-full" />
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded col-span-1 md:col-span-3">Save Coupon</button>
        </form>
      </div>

      {/* Coupon Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">All Coupons</h2>
        {loading ? (
          <p>Loading...</p>
        ) : coupons.length === 0 ? (
          <p>No coupons found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Code</th>
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Value</th>
                  <th className="border px-4 py-2">Min Purchase</th>
                  <th className="border px-4 py-2">Expiry Date</th>
                  <th className="border px-4 py-2">Usage Limit</th>
                  <th className="border px-4 py-2">Used By</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c) => (
                  <tr key={c._id}>
                    {editingId === c._id ? (
                      <>
                        <td className="border px-4 py-2"><input name="code" value={editForm.code || ""} onChange={handleEditChange} className="border p-1 rounded w-full" /></td>
                        <td className="border px-4 py-2">
                          <select name="discountType" value={editForm.discountType || ""} onChange={handleEditChange} className="border p-1 rounded w-full">
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed</option>
                          </select>
                        </td>
                        <td className="border px-4 py-2"><input type="number" name="discountValue" value={editForm.discountValue || 0} onChange={handleEditChange} className="border p-1 rounded w-full" /></td>
                        <td className="border px-4 py-2"><input type="number" name="minPurchase" value={editForm.minPurchase || 0} onChange={handleEditChange} className="border p-1 rounded w-full" /></td>
                        <td className="border px-4 py-2"><input type="date" name="expiryDate" value={editForm.expiryDate || ""} onChange={handleEditChange} className="border p-1 rounded w-full" /></td>
                        <td className="border px-4 py-2"><input type="number" name="usageLimit" value={editForm.usageLimit || 1} onChange={handleEditChange} className="border p-1 rounded w-full" /></td>
                        <td className="border px-4 py-2">{c.usedBy.length}</td>
                        <td className="border px-4 py-2 flex gap-2">
                          <button onClick={() => handleSave(c._id)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Save</button>
                          <button onClick={handleCancel} className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border px-4 py-2">{c.code}</td>
                        <td className="border px-4 py-2">{c.discountType}</td>
                        <td className="border px-4 py-2">{c.discountValue}</td>
                        <td className="border px-4 py-2">{c.minPurchase}</td>
                        <td className="border px-4 py-2">{c.expiryDate ? new Date(c.expiryDate).toLocaleDateString() : "-"}</td>
                        <td className="border px-4 py-2">{c.usageLimit}</td>
                        <td className="border px-4 py-2">{c.usedBy.length}</td>
                        <td className="border px-4 py-2 flex gap-2">
                          <button onClick={() => handleEdit(c)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Edit</button>
                          <button onClick={() => handleDelete(c._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
