// context/WishlistContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "./CartContext"; // reuse your Product type

type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("wishlist");
      return raw ? (JSON.parse(raw) as Product[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (!prev.find((p) => p.id === product.id)) return [...prev, product];
      return prev;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const isInWishlist = (id: string) => wishlist.some((p) => p.id === id);

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
