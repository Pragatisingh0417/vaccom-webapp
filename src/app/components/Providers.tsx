'use client';

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export default function Providers({ children, session }: { children: ReactNode; session?: any }) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </SessionProvider>
  );
}
