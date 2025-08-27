// app/admin/orders/details/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface OrderDetail {
  _id: string;
  user: { name: string; email: string };
  products: {
    productId: string;
    name: string;
    price: number | string;
    qty?: number | string;
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p>
        <strong>User:</strong> {order.user?.name} ({order.user?.email})
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Amount:</strong> ₹{Number(order.amount).toLocaleString()} {order.currency.toUpperCase()}
      </p>
      <p>
        <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Products</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p) => {
            const price = Number(p.price) || 0;
            const qty = Number(p.qty) || 1; // default to 1 if missing
            const total = price * qty;

            return (
              <tr key={p.productId} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">₹{price.toLocaleString()}</td>
                <td className="border px-4 py-2">{qty}</td>
                <td className="border px-4 py-2">₹{total.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
