"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  FaRegUser,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaHeart,
  FaBell,
  FaTag,
  FaSignOutAlt,
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { UserContext } from "@/context/UserContext";

interface User {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

interface EditableUser {
  name: string;
  email: string;
  phone: string;
}

interface Order {
  id: string;
  createdAt: string;
  status: string;
  amount: number;
  currency: string;
}

interface Address {
  id: string;
  line1: string;
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

interface Coupon {
  code: string;
  discount: string;
  expiry: string;
}

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  isRead: boolean;
  createdAt: string;
}

export default function AccountPage() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<
    "profile" | "orders" | "wishlist" | "coupon" | "notifications" | "addresses"
  >("profile");

  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState<EditableUser>({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        const [userRes, ordersRes, addrRes, wishRes, couponRes, notifRes] =
          await Promise.all([
            axios.get("/api/user/profile", { headers }),
            axios.get("/api/orders", { headers }),
            axios.get("/api/user/addresses", { headers }),
            axios.get("/api/user/wishlist", { headers }),
            axios.get("/api/user/coupons").catch(() => ({ data: [] })),
            axios
              .get("/api/notifications/user/123")
              .catch(() => ({ data: { notifications: [] } })),
          ]);

        setUser(userRes.data.user);
        setOrders(ordersRes.data);
        setAddresses(addrRes.data.addresses);
        setWishlist(wishRes.data.wishlist);
        setCoupons(couponRes.data.coupons || []);
        setNotifications(notifRes.data.notifications || []);
      } catch (err) {
        console.error("Error loading account data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [setUser]);

  const SIDEBAR_ITEMS = [
    { label: "Profile", key: "profile", icon: <FaRegUser /> },
    
  
  ];

  const handleEditClick = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      setShowEditModal(true);
    }
  };

  const handleSave = () => {
    setUser({
      ...user!,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });
    setShowEditModal(false);
  };

  if (loading) return <p className="p-10 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
     
      {/* Main Content */}
      <main className="flex-1 p-8">
        {selectedTab === "profile" && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaRegUser className="text-red-600" /> Profile Info
              </h2>
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <FiEdit /> Edit
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border space-y-2">
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Phone:</strong> {user?.phone}
              </p>
              
            </div>
          </section>
        )}

        {selectedTab === "orders" && (
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaBoxOpen className="text-red-600" /> My Orders
            </h2>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <div className="overflow-x-auto bg-white rounded-xl shadow border">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">Order ID</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-t">
                        <td className="p-3">{order.id}</td>
                        <td className="p-3">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3">{order.status}</td>
                        <td className="p-3 text-right">
                          {(order.amount / 100).toFixed(2)}{" "}
                          {order.currency.toUpperCase()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {selectedTab === "wishlist" && (
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaHeart className="text-pink-600" /> Wishlist
            </h2>
            {wishlist.length === 0 ? (
              <p>Your wishlist is empty.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 border rounded-xl shadow-sm"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-red-600 font-bold">${item.price}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {selectedTab === "coupon" && (
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaTag className="text-yellow-600" /> My Coupons
            </h2>
            {coupons.length === 0 ? (
              <p>No coupons available.</p>
            ) : (
              <ul className="space-y-3">
                {coupons.map((c, i) => (
                  <li
                    key={i}
                    className="border p-4 rounded-lg bg-white shadow flex justify-between"
                  >
                    <div>
                      <h3 className="font-semibold">{c.code}</h3>
                      <p className="text-gray-500">Discount: {c.discount}</p>
                    </div>
                    <span className="text-sm text-gray-400">
                      Expires: {c.expiry}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {selectedTab === "notifications" && (
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaBell className="text-red-600" /> Notifications
            </h2>
            {notifications.length === 0 ? (
              <p>No notifications found.</p>
            ) : (
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n._id}
                    className={`p-4 border rounded-lg ${
                      n.isRead ? "bg-gray-50" : "bg-red-50"
                    }`}
                  >
                    <h3 className="font-semibold">{n.title}</h3>
                    <p>{n.message}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {selectedTab === "addresses" && (
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-600" /> Addresses
            </h2>
            {addresses.length === 0 ? (
              <p>No addresses saved yet.</p>
            ) : (
              <ul className="grid sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <li
                    key={addr.id}
                    className="border p-4 rounded-lg bg-white shadow"
                  >
                    <p>{addr.line1}</p>
                    <p>
                      {addr.city}, {addr.state} {addr.zip}
                    </p>
                    <p>{addr.country}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Info</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                className="border p-2 rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                className="border p-2 rounded"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
