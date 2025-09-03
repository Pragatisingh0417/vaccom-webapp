"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Order {
  _id: string;
  user: { name: string; email: string };
  amount: number | string;
  status: string;
  createdAt: string;
  currency: string;
  products: {
    productId: string;
    name: string;
    price: number | string;
    qty?: number | string;
    image?: string;
  }[];
}

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        if (data.success) setOrders(data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders found.</p>;

  // Helper to render status badge
  const getStatusBadge = (status: string) => {
    const base = "px-2 py-1 rounded text-white text-xs font-semibold";
    switch (status.toLowerCase()) {
      case "pending":
        return <span className={`${base} bg-yellow-500`}>{status}</span>;
      case "completed":
        return <span className={`${base} bg-green-500`}>{status}</span>;
      case "cancelled":
        return <span className={`${base} bg-red-500`}>{status}</span>;
      case "processing":
        return <span className={`${base} bg-blue-500`}>{status}</span>;
      default:
        return <span className={`${base} bg-gray-500`}>{status}</span>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders List</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-sm p-4 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">
                Order #{order._id.slice(-6)}
              </h2>
              <Link
                href={`/admin/cms/orders/details/${order._id}`}
                className="text-blue-600 text-sm underline"
              >
                View Full Details
              </Link>
            </div>
            <p>
              <strong>User:</strong> {order.user?.name} ({order.user?.email})
            </p>
            <p>
              <strong>Status:</strong> {getStatusBadge(order.status)}
            </p>
            <p>
              <strong>Amount:</strong> ₹
              {Number(order.amount).toLocaleString()}{" "}
              {order.currency.toUpperCase()}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            {/* Mini Products Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 py-1">Image</th>
                    <th className="border px-2 py-1">Name</th>
                    <th className="border px-2 py-1">Qty</th>
                    <th className="border px-2 py-1">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((p, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border px-2 py-1">
                        {p.image ? (
                          <Image
                            src={p.image}
                            alt={p.name}
                            width={40}
                            height={40}
                            className="object-contain rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                            N/A
                          </div>
                        )}
                      </td>
                      <td className="border px-2 py-1">{p.name}</td>
                      <td className="border px-2 py-1">{p.qty || 1}</td>
                      <td className="border px-2 py-1">
                        ₹{Number(p.price).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
