import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import Providers from "./components/Providers";

export const metadata: Metadata = {
  title: "Vacuum Shop",
  description: "E-commerce vacuum store",
};

export default function RootLayout({ children, session }: { children: React.ReactNode; session?: any }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers session={session}>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
