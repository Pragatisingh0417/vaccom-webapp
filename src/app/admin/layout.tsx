import "../globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: " Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50">
        {/* Sidebar only for admin */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
