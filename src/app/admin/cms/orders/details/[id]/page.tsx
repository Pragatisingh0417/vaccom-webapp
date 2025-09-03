// app/admin/orders/details/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface OrderDetail {
  _id: string;
  user: { name: string; email: string };
  products: {
    productId: string;
    name: string;
    price: number | string;
    qty?: number | string;
    image?: string;
  }[];
  amount: number | string;
  status: string;
  createdAt: string;
  currency: string;
}

export default function AdminOrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/admin/orders/${id}`);
        const data = await res.json();
        if (data.success) setOrder(data.order);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  // Helper to render status badges
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded text-white text-sm font-semibold";
    switch (status.toLowerCase()) {
      case "pending":
        return <span className={`${baseClasses} bg-yellow-500`}>{status}</span>;
      case "completed":
        return <span className={`${baseClasses} bg-green-500`}>{status}</span>;
      case "cancelled":
        return <span className={`${baseClasses} bg-red-500`}>{status}</span>;
      case "processing":
        return <span className={`${baseClasses} bg-blue-500`}>{status}</span>;
      default:
        return <span className={`${baseClasses} bg-gray-500`}>{status}</span>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p>
        <strong>User:</strong> {order.user?.name} ({order.user?.email})
      </p>
      <p>
        <strong>Status:</strong> {getStatusBadge(order.status)}
      </p>
      <p>
        <strong>Amount:</strong> ₹{Number(order.amount).toLocaleString()} {order.currency.toUpperCase()}
      </p>
      <p>
        <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((p, index) => {
              const price = Number(p.price) || 0;
              const qty = Number(p.qty) || 1;
              const total = price * qty;

              return (
                <tr key={p.productId || index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={50}
                        height={50}
                        className="object-contain rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="border px-4 py-2">{p.name}</td>
                  <td className="border px-4 py-2">₹{price.toLocaleString()}</td>
                  <td className="border px-4 py-2">{qty}</td>
                  <td className="border px-4 py-2 font-semibold">₹{total.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
