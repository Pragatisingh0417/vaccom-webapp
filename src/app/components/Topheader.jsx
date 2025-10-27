'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FiMapPin, FiMail, FiPhone, FiShoppingCart } from 'react-icons/fi';
import { FaUser, FaHeart } from 'react-icons/fa';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function ContactHeader() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // ✅ Get user from localStorage
  const getStoredUser = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  };

  // ✅ Clear user (logout)
  const clearAuth = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  };

  // ✅ Load and sync user
  useEffect(() => {
    const updateUser = () => setUser(getStoredUser());
    updateUser();
    window.addEventListener("storage", updateUser);
    window.addEventListener("userUpdated", updateUser);
    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("userUpdated", updateUser);
    };
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      clearAuth();
      setUser(null);
      router.push("/auth");
      window.dispatchEvent(new Event("userUpdated"));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ✅ Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // Hidden on mobile, visible on md+
    <div className="hidden md:block bg-blue-50 border-b sticky top-0 z-50">
      <div className="px-6 py-3 flex flex-wrap lg:flex-nowrap justify-between items-center max-w-7xl mx-auto gap-6">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <Image src="/vaccom-logo.png" alt="Vaccom Logo" width={180} height={100} />
          </div>
          <div className="hidden lg:block w-px h-16 bg-gray-400" />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 text-[16px] text-gray-800 text-center lg:text-left flex-1 justify-center">
          <div className="flex items-center gap-2">
            <FiMapPin className="text-red-600" />
            <span>
              158 Centre Dandenong <br className="hidden xl:block" />
              Rd. Victoria 3192
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FiMail className="text-blue-600" />
            <span>support@vaccom.com.au</span>
          </div>

          <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
            <FiPhone />
            0397 409 390
          </button>

          <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">
            Schedule A Call Now
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 relative">
          {/* Wishlist */}
          <Link href="/wishlist" aria-label="Wishlist" className="text-2xl text-red-700 hover:text-red-600 transition">
            <FaHeart />
          </Link>

          {/* Profile */}
          <div ref={profileRef} className="relative cursor-pointer text-lg text-black">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-2 hover:text-red-600"
              onClick={() => setProfileDropdownOpen((open) => !open)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setProfileDropdownOpen((open) => !open);
                }
              }}
            >
              <FaUser className="text-xl" />
              {user ? (
                <>
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm">▼</span>
                </>
              ) : (
                <span className="font-medium">Login</span>
              )}
            </div>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white text-black rounded shadow-lg z-20 py-2 px-3">
                {user ? (
                  <>
                    <span className="text-gray-700">Welcome, <b>{user.name}</b> 👋</span>
                    <p className="text-sm text-gray-500">Manage your account</p>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Your Profile</Link>
                    <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                    <Link href="/wishlist" className="block px-4 py-2 hover:bg-gray-100">Wishlist</Link>
                    <Link href="/coupon" className="block px-4 py-2 hover:bg-gray-100">Coupon</Link>
                    <Link href="/notifications" className="block px-4 py-2 hover:bg-gray-100">Notification</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                  </>
                ) : (
                  <>
                    <h6 className="text-gray-600 font-semibold">Welcome</h6>
                    <p>To manage account and access orders</p>
                    <Link href="/auth" className="block px-4 py-2 hover:bg-gray-100">Login / Signup</Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <div>
            <button className="relative inline-block" onClick={() => setIsOpen(true)}>
              <FiShoppingCart size={24} className="hover:text-black cursor-pointer text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}
