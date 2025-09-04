"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  brand: string;
}

export type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string, step?: number) => void;
  decreaseQuantity: (id: string, step?: number) => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // optional: persist cart in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("cart");
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product: Product, qty: number = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const increaseQuantity = (id: string, step: number = 1) => {
    setCart(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: i.quantity + step } : i))
    );
  };

  const decreaseQuantity = (id: string, step: number = 1) => {
    setCart(prev =>
      prev
        .map(i => (i.id === id ? { ...i, quantity: i.quantity - step } : i))
        .filter(i => i.quantity > 0) // remove item if it hits 0
    );
  };

  const { totalItems, subtotal } = useMemo(() => {
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    return { totalItems, subtotal };
  }, [cart]);

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}