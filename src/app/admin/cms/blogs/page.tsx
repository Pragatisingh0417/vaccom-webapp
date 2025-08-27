"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Fetch all blogs on mount
  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then(setBlogs)
      .catch((err) => console.error("Failed to fetch blogs:", err));
  }, []);

  // Delete blog by slug
  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });

      if (res.ok) {
        setBlogs(blogs.filter((b) => b.slug !== slug));
        alert("Blog deleted successfully");
      } else {
        const data = await res.json();
        alert("Failed to delete blog: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting blog");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <Link
          href="/admin/cms/blogs/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          ➕ Add Blog
        </Link>
      </div>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Slug</th>
            <th className="p-3">Created</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="border-t">
              <td className="p-3">{blog.title}</td>
              <td className="p-3">{blog.slug}</td>
              <td className="p-3">{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td className="p-3 space-x-2">
                <Link
                  href={`/admin/cms/blogs/edit/${blog.slug}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  ✏ Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog.slug)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
          {blogs.length === 0 && (
            <tr>
              <td colSpan={4} className="p-3 text-center text-gray-500">
                No blogs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
