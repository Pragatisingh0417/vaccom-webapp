"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useParams } from "next/navigation";

const BlogEditor = dynamic<{ value: string; onChange: (val: string) => void }>(
  () => import("@/app/components/BlogEditor"),
  { ssr: false }
);

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slugValue, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [author, setAuthor] = useState({ name: "", avatar: "" });
  const [content, setContent] = useState("<p></p>");

  useEffect(() => {
    if (!slug) return;
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        const data = await res.json();

        if (res.ok) {
          setTitle(data.title || "");
          setSlug(data.slug || "");
          setExcerpt(data.excerpt || "");
          setFeaturedImage(data.featuredImage || "");
          setAuthor(data.author || { name: "", avatar: "" });
          setContent(data.content || "<p></p>");
        } else {
          setError(data.error || "Blog not found");
        }
      } catch (err) {
        setError("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = {
      title,
      slug: slugValue,
      excerpt,
      featuredImage,
      author,
      content,
      readTime: "3 min",
    };

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (res.ok) {
        router.push("/admin/cms/blogs");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update blog");
      }
    } catch (err) {
      setError("Failed to update blog");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

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
          value={slugValue}
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

        {/* Featured Image */}
        <input
          className="w-full border p-2 rounded"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
          placeholder="Featured Image URL"
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

        {/* Blog Editor */}
        <div className="border p-2 rounded">
          <BlogEditor value={content} onChange={setContent} />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
