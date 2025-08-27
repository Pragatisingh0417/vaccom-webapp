"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  author: { name: string; avatar: string };
  createdAt: string;
  readTime: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then(setBlogs);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Our Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
            <img src={blog.featuredImage} alt={blog.title} className="w-full h-48 object-cover rounded-xl mb-4" />
            <h2 className="text-lg font-semibold line-clamp-2 mb-2">{blog.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{blog.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>👤 {blog.author?.name}</span>
              <span>{new Date(blog.createdAt).toLocaleDateString()} · {blog.readTime}</span>
            </div>
            <Link href={`/blogs/${blog.slug}`} className="text-blue-600 text-sm mt-3 inline-block">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
