"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [author, setAuthor] = useState({ name: "", avatar: "" });
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const blogData = {
    title,
    slug,
    excerpt,
    author: {
      name: author.name,
      avatar: author.avatar,
    },
    content,
    readTime: "3 min",
    // 👇 For now, just store featuredImage as a URL (string)
    featuredImage: featuredImage ? URL.createObjectURL(featuredImage) : "",
  };

  try {
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    if (res.ok) {
      router.push("/admin/cms/blogs");
    } else {
      const data = await res.json();
      setError(data.error || "❌ Failed to create blog");
    }
  } catch (err) {
    console.error(err);
    setError("⚠️ Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        {/* Slug */}
        <input
          className="w-full border p-2 rounded"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug"
          required
        />

        {/* Excerpt */}
        <textarea
          className="w-full border p-2 rounded"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Excerpt"
        />

        {/* Featured Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFeaturedImage(e.target.files ? e.target.files[0] : null)
          }
          className="w-full border p-2 rounded"
        />

        {/* Author */}
        <input
          className="w-full border p-2 rounded"
          value={author.name}
          onChange={(e) => setAuthor({ ...author, name: e.target.value })}
          placeholder="Author Name"
        />
        <input
          className="w-full border p-2 rounded"
          value={author.avatar}
          onChange={(e) => setAuthor({ ...author, avatar: e.target.value })}
          placeholder="Author Avatar URL"
        />

        {/* Content */}
        <textarea
          className="w-full border p-2 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Blog Content"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
