"use client";
import { useRouter } from "next/navigation"; // ✅ Import this


import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  FaRegUser,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { UserContext } from "@/context/UserContext";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Order {
  id: string;
  createdAt: string;
  status: string;
  amount: number;
  currency: string;
  products: OrderProduct[];
}

interface Address {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProfileDashboard() {
    const router = useRouter(); // ✅ initialize router

  const { user, setUser } = useContext(UserContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState<
    "dashboard" | "orders" | "wishlist" | "addresses" | "logout"
  >("dashboard");
useEffect(() => {
  async function loadData() {
    const token = localStorage.getItem("token"); // ✅ get token
    if (!token) return; // optional: stop if no token

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const [userRes, ordersRes, addressesRes, wishlistRes] = await Promise.all([
        axios.get<{ user: User }>("/api/user/profile", config),
        axios.get<Order[]>("/api/orders", config),
        axios.get<{ addresses: Address[] }>("/api/user/addresses", config),
        axios.get<{ wishlist: WishlistItem[] }>("/api/user/wishlist", config),
      ]);

      setUser(userRes.data.user);
      setOrders(ordersRes.data);
      setAddresses(addressesRes.data.addresses);
      setWishlist(wishlistRes.data.wishlist);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setLoading(false);
    }
  }

  loadData();
}, []);

  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. User not logged in.");
          setLoading(false);
          return;
        }

        const [userRes, ordersRes, addressesRes, wishlistRes] = await Promise.all([
          axios.get<{ user: User }>("/api/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<Order[]>("/api/orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<{ addresses: Address[] }>("/api/user/addresses", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<{ wishlist: WishlistItem[] }>("/api/user/wishlist", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userRes.data.user);
        setOrders(ordersRes.data);
        setAddresses(addressesRes.data.addresses);
        setWishlist(wishlistRes.data.wishlist);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading)
    return <p className="text-center text-xl py-12">Loading Dashboard...</p>;

 
  const SIDEBAR_ITEMS = [
    { label: "Dashboard", key: "dashboard", icon: <FaRegUser /> },
{ 
      label: "Orders", 
      key: "orders", 
      icon: <FaBoxOpen />,
      action: () => router.push("/orders"), // ✅ redirect to /orders
    },    { label: "Wishlist", key: "wishlist", icon: <FaHeart /> },
    {
      label: "Logout",
      key: "logout",
      icon: <FaSignOutAlt />,
      action: () => alert("Logged out!"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="py-8 px-6 border-b flex flex-col items-center">
          <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-2">
            {user?.name?.split(" ").map((n) => n[0]).join("") || <FaRegUser />}
          </div>
          <div className="mt-1 font-semibold text-gray-800">{user?.name}</div>
          <div className="text-xs text-gray-500">{user?.email}</div>
        </div>
        <nav className="flex-1 px-2 pt-6">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() =>
                item.action ? item.action() : setSelectedTab(item.key as any)
              }
              className={`flex items-center w-full px-4 py-3 text-left rounded-lg gap-3 mb-2 transition
                ${
                  selectedTab === item.key
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content area */}
      <main className="flex-1 p-8">
        {/* Dashboard Tab */}
        {selectedTab === "dashboard" && (
          <>
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.name?.split(" ")[0] || "Guest"}!
            </h1>

            {/* Personal Info Card */}
            <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FaRegUser className="text-blue-600" /> Personal Info
                </h2>
                <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow">
                  <FiEdit /> Edit Info
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <strong>Name:</strong> {user?.name || "Not provided"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "Not provided"}
                </p>
                <p>
                  <strong>Phone:</strong> {user?.phone || "Not provided"}
                </p>
                <p>
                  <strong>Address:</strong> {user?.phone || "Not provided"}
                </p>
              </div>
            </div>

           
          </>
        )}

        {/* Orders Tab */}
        {selectedTab === "orders" && (
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaBoxOpen className="text-blue-600" /> My Orders
            </h2>

            {orders.length === 0 ? (
              <p className="text-gray-500">No orders found.</p>
            ) : (
              <div className="overflow-x-auto bg-white p-4 rounded-xl border">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-left">Order ID</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tbody key={order.id}>
                        <tr className="border-t">
                          <td className="p-3">{order.id}</td>
                          <td className="p-3">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                order.status === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            {(order.amount / 100).toFixed(2)}{" "}
                            {order.currency.toUpperCase()}
                          </td>
                        </tr>

                        {/* Products inside order */}
                        {order.products.map((product) => (
                          <tr
                            key={product.id}
                            className="border-t bg-gray-50"
                          >
                            <td colSpan={2} className="p-2 flex items-center gap-2">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              {product.name}
                            </td>
                            <td className="p-2">{product.quantity}x</td>
                            <td className="p-2 text-right">
                              ${(product.price / 100).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Wishlist Tab */}
        {selectedTab === "wishlist" && (
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaHeart className="text-pink-600" /> My Wishlist
            </h2>
            {wishlist.length === 0 ? (
              <p className="text-gray-500">Your wishlist is empty.</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <li
                    key={item.id}
                    className="bg-white shadow rounded-lg border p-4 flex items-center gap-4"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-blue-600 font-bold">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Addresses Tab */}
        {selectedTab === "addresses" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" /> My Addresses
              </h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded shadow text-sm font-bold hover:bg-blue-700 transition">
                + Add Address
              </button>
            </div>
            {addresses.length === 0 ? (
              <p className="text-gray-500">No addresses saved yet.</p>
            ) : (
              <ul className="grid sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <li
                    key={addr.id}
                    className="border p-4 rounded-lg bg-gray-50 flex flex-col gap-1"
                  >
                    <div className="font-semibold">
                      {addr.line1}
                      {addr.line2 ? `, ${addr.line2}` : ""}
                    </div>
                    <div>
                      {addr.city}, {addr.state} {addr.zip}
                    </div>
                    <div>{addr.country}</div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
