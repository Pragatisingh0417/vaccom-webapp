import Link from "next/link";
import { FaBox, FaTags, FaListAlt, FaBlog } from "react-icons/fa";

export default function CMSHome() {
  const links = [
    { href: "/admin/cms/products", label: "Manage Products", icon: <FaBox size={28} />, color: "bg-blue-100 text-blue-700" },
    { href: "/admin/cms/brands", label: "Manage Brands", icon: <FaTags size={28} />, color: "bg-green-100 text-green-700" },
    { href: "/admin/cms/categories", label: "Manage Categories", icon: <FaListAlt size={28} />, color: "bg-yellow-100 text-yellow-700" },
    { href: "/admin/cms/blogs", label: "Manage Blogs", icon: <FaBlog size={28} />, color: "bg-red-100 text-red-700" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">CMS Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`flex flex-col items-center justify-center p-6 rounded-xl shadow hover:shadow-lg transition ${link.color}`}
            >
              <div className="mb-3">{link.icon}</div>
              <span className="text-lg font-semibold mb-1">{link.label}</span>
              <p className="text-sm text-gray-600 text-center">
                Click to view and manage {link.label.toLowerCase()}.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
