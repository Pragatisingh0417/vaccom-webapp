"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  _id: string;
  name: string;
  email?: string;
}

interface Order {
  _id: string;
  orderId?: string;
  user: User;
  amount: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
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

  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Processing: "bg-blue-100 text-blue-800",
  };

  if (loading) return <p className="text-center py-10">Loading orders...</p>;

  if (!orders.length)
    return <p className="text-center py-10 text-gray-600">No orders found.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 font-medium">
                  {order.orderId || order._id}
                </td>

                <td className="px-6 py-4">
                  {order.user?.name || "Unknown"}{" "}
                  <span className="text-gray-400 text-sm">
                    ({order.user?._id})
                  </span>
                </td>

                <td className="px-6 py-4 font-semibold text-gray-700">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "USD",
                  }).format(order.amount)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      statusColors[order.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td className="px-6 py-4">
                  <Link
                    href={`/admin/cms/orders/details/${order._id}`}
                    className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
