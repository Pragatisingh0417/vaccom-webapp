"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

interface Order {
  _id: string;
  orderId: string;
  products: OrderItem[];
  amount: number;
  currency: string;
  createdAt: string;
  status?: string;
}

interface OrdersApiResponse {
  success?: boolean;
  orders?: any[];
  error?: string;
}

const getUserToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [statusFilters, setStatusFilters] = useState<string[]>(["all"]);
  const [timeFilters, setTimeFilters] = useState<string[]>([]);

  const router = useRouter();

  async function fetchOrders() {
    const token = getUserToken();
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        throw new Error(`Failed to fetch orders (${res.status})`);
      }

      const data: OrdersApiResponse = await res.json();
      if (!data.success || !data.orders) {
        setOrders([]);
        setError(data.error || "No orders found.");
        return;
      }

      const mappedOrders: Order[] = data.orders.map((o, idx) => ({
        _id: o._id,
        orderId: o.orderId || o._id || `order-${idx}`,
        products: (o.products || []).map((p: any, i: number) => ({
          id: p._id || p.id || i,
          name: p.name || "Unnamed product",
          price: Number(p.price) || 0,
          qty: Number(p.qty) || 1,
          image: p.image || "/placeholder.png",
        })),
        amount: Number(o.amount) || 0,
        currency: o.currency || "usd",
        createdAt: o.createdAt,
        status: o.status || "Pending",
      }));

      setOrders(mappedOrders);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong while fetching orders.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="p-6">Loading orders...</p>;

  if (error)
    return (
      <p className="p-6 text-center text-red-600">
        {error} <br />
        <a href="/shop" className="text-blue-600 underline">
          Shop now
        </a>
        .
      </p>
    );

  if (!orders.length)
    return (
      <p className="p-6 text-center">
        No orders found yet.{" "}
        <a href="/shop" className="text-blue-600 underline">
          Shop now
        </a>
        .
      </p>
    );

  // ✅ Apply filters
  const filteredOrders = orders.filter((o) => {
    // Status filter
    if (
      !statusFilters.includes("all") &&
      !statusFilters.includes(o.status || "Pending")
    ) {
      return false;
    }

    // Time filter
    if (timeFilters.length > 0) {
      const orderDate = new Date(o.createdAt);
      const year = orderDate.getFullYear();
      const now = new Date();

      let matches = false;
      for (const filter of timeFilters) {
        if (filter === "last30") {
          const diff = now.getTime() - orderDate.getTime();
          const days = diff / (1000 * 60 * 60 * 24);
          if (days <= 30) matches = true;
        } else if (filter === "older") {
          if (year < 2021) matches = true;
        } else if (Number(filter) === year) {
          matches = true;
        }
      }
      if (!matches) return false;
    }

    return true;
  });

  const handleStatusChange = (status: string) => {
    if (status === "all") {
      setStatusFilters(["all"]);
    } else {
      setStatusFilters((prev) => {
        const newFilters = prev.includes(status)
          ? prev.filter((f) => f !== status)
          : [...prev.filter((f) => f !== "all"), status];
        return newFilters.length ? newFilters : ["all"];
      });
    }
  };

  const handleTimeChange = (time: string) => {
    setTimeFilters((prev) =>
      prev.includes(time) ? prev.filter((f) => f !== time) : [...prev, time]
    );
  };

  return (
    <div className="flex p-6 gap-6 bg-pink-100">
      {/* Sidebar Filters */}
      <aside className="w-1/6 border rounded-lg p-4 shadow bg-blue-50 h-fit">
        <h2 className="text-lg font-semibold mb-3">Filters</h2>

        {/* Order Status */}
        <div className="mb-4">
          <p className="font-medium mb-2">Order Status</p>
          {["all", "Pending", "Completed", "Cancelled"].map((status) => (
            <label key={status} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={statusFilters.includes(status)}
                onChange={() => handleStatusChange(status)}
              />
              {status === "all" ? "All Orders" : status}
            </label>
          ))}
        </div>

        {/* Order Time */}
        <div>
          <p className="font-medium mb-2">Order Time</p>
          <label className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={timeFilters.includes("last30")}
              onChange={() => handleTimeChange("last30")}
            />
            Last 30 days
          </label>
          {[2024, 2023, 2022, 2021].map((yr) => (
            <label key={yr} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={timeFilters.includes(String(yr))}
                onChange={() => handleTimeChange(String(yr))}
              />
              {yr}
            </label>
          ))}
          <label className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={timeFilters.includes("older")}
              onChange={() => handleTimeChange("older")}
            />
            Older
          </label>
        </div>
      </aside>

      {/* Orders Section */}
      <main className="w-3/2 space-y-4 bg-pink-100" >

        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg bg-blue-50 shadow p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold">Order ID: {order.orderId}</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      order.status === "Completed"
                        ? "text-green-600"
                        : order.status === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
              {order.status === "Pending" && (
                <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Cancel Order
                </button>
              )}
            </div>

            {/* Products */}
            {order.products.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-t py-2"
              >
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  width={150}
                  height={20}
                  className="rounded object-cover border"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Qty: {item.qty} × ₹{item.price}
                  </p>
                </div>
                <p className="font-semibold">
                  ₹{(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            ))}

            {/* Total */}
            <div className="border-t pt-3 flex justify-between items-center mt-2">
              <span className="font-medium">Total Amount:</span>
              <span className="font-bold text-lg">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: order.currency,
                }).format(order.amount)}
              </span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
