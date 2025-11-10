"use client";

import { useEffect, useState } from "react";
import { FaHome, FaTrash, FaPlus } from "react-icons/fa";

interface Address {
  _id?: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Address>({
    line1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🟢 Load addresses on mount
  useEffect(() => {
    async function fetchAddresses() {
      try {
        const res = await fetch("/api/user/addresses", {
          credentials: "include", // ✅ send NextAuth session cookie
        });

        if (res.ok) {
          const data = await res.json();
          setAddresses(data.addresses || []);
        } else if (res.status === 401) {
          console.warn("⚠️ Not authorized — user session not found");
        } else {
          console.error("Failed to fetch addresses:", await res.text());
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAddresses();
  }, []);

  // 🟢 Add new address
  const handleAddAddress = async () => {
    const { line1, city, state, zip, country } = newAddress;
    if (!line1 || !city || !state || !zip || !country) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/user/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ ensures cookies/session sent
        body: JSON.stringify(newAddress), // ✅ send fields directly
      });

      if (res.ok) {
        const data = await res.json();
        setAddresses((prev) => [...prev, data.address]);
        setNewAddress({ line1: "", city: "", state: "", zip: "", country: "" });
        setShowForm(false);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to add address");
      }
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

  // 🟢 Delete address locally (can integrate backend later)
  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a._id !== id));
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaHome className="text-red-600" /> My Addresses
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          <FaPlus /> Add New
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              placeholder="Address line"
              className="border p-2 rounded"
              value={newAddress.line1}
              onChange={(e) =>
                setNewAddress({ ...newAddress, line1: e.target.value })
              }
            />
            <input
              placeholder="City"
              className="border p-2 rounded"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
            />
            <input
              placeholder="State"
              className="border p-2 rounded"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
            />
            <input
              placeholder="ZIP"
              className="border p-2 rounded"
              value={newAddress.zip}
              onChange={(e) =>
                setNewAddress({ ...newAddress, zip: e.target.value })
              }
            />
            <input
              placeholder="Country"
              className="border p-2 rounded"
              value={newAddress.country}
              onChange={(e) =>
                setNewAddress({ ...newAddress, country: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3 mt-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAddress}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* 🟢 Address List */}
      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className="flex justify-between items-start p-4 bg-gray-50 rounded-lg border"
          >
            <p className="text-gray-700">
              {addr.line1}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}
            </p>
            <button
              onClick={() => handleDeleteAddress(addr._id!)}
              className="text-red-500 hover:text-red-700"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        ))}

        {addresses.length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            No saved addresses yet.
          </p>
        )}
      </div>
    </div>
  );
}
