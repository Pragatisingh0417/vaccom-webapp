"use client";
import { useRouter, usePathname } from "next/navigation";
import {
  FaRegUser,
  FaBoxOpen,
  FaHeart,
  FaMapMarkerAlt,
  FaGift,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const MENU = [
    { label: "Profile", path: "/account", icon: <FaRegUser /> },
    { label: "Orders", path: "/account/orders", icon: <FaBoxOpen /> },
    { label: "Wishlist", path: "/account/wishlist", icon: <FaHeart /> },
    { label: "Coupons", path: "/account/coupon", icon: <FaGift /> },
    { label: "Notifications", path: "/account/notifications", icon: <FaBell /> },
    { label: "Addresses", path: "/account/addresses", icon: <FaMapMarkerAlt /> },
    { label: "Settings", path: "/account/settings", icon: <FaCog /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="py-8 px-6 border-b flex flex-col items-center">
          <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-2">
            P
          </div>
          <div className="mt-1 font-semibold text-gray-800">Pragati Singh</div>
          <div className="text-xs text-gray-500">pragati@gmail.com</div>
        </div>

        <nav className="flex-1 px-2 pt-6">
          {MENU.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex items-center w-full px-4 py-3 text-left rounded-lg gap-3 mb-2 transition
                ${
                  pathname === item.path
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="flex items-center w-full px-4 py-3 text-left rounded-lg gap-3 mt-4 hover:bg-red-50 text-red-600"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
