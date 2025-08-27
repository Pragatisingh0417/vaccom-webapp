"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Load BlogEditor only on client
const BlogEditor = dynamic<{ value: string; onChange: (val: string) => void }>(
  () => import("@/app/components/BlogEditor"),
  { ssr: false }
);

export default function CreateBlogPage() {
  const router = useRouter(); // ✅ Next.js router
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [author, setAuthor] = useState({ name: "", avatar: "" });
const [content, setContent] = useState("<p></p>");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

const blogData = { 
  title, 
  slug, 
  excerpt, 
  featuredImage, 
  tags: [],               // send empty array
  category: "",           // send empty string
  author: {
    name: author.name || "Anonymous", // ✅ ensure required
    avatar: author.avatar || "",
    bio: ""
  },
  content, 
  readTime: "3 min",
  isFeatured: false,
  metaTitle: title || "",
  metaDescription: excerpt || ""
};


  try {
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (!res.ok) {
      const error = await res.json();
      alert("Failed to publish blog: " + error.message);
      return;
    }

    // ✅ Success → redirect
    router.push("/admin/cms/blogs");
  } catch (err) {
    console.error(err);
    alert("Something went wrong while publishing.");
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSlug(e.target.value.toLowerCase().replace(/ /g, "-"));
          }}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Featured Image URL"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Author Name"
            value={author.name}
            onChange={(e) => setAuthor({ ...author, name: e.target.value })}
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Author Avatar URL"
            value={author.avatar}
            onChange={(e) => setAuthor({ ...author, avatar: e.target.value })}
            className="w-1/2 p-2 border rounded"
          />
        </div>

        <div className="border p-2 rounded">
          <BlogEditor value={content} onChange={setContent} />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}
