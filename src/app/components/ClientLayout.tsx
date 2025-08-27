"use client";

import { usePathname } from "next/navigation";
import Topheader from "../components/Topheader";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StripeProvider from "./StripeProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    // Admin pages don’t need public layout or Stripe
    return <>{children}</>;
  }

  return (
    <StripeProvider>
      <Header />
      <Topheader />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </StripeProvider>
  );
}
