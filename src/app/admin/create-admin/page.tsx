"use client";
import { useState } from "react";

export default function CreateAdminPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"product_manager" | "order_manager" | "marketing_manager">("product_manager");
  const [message, setMessage] = useState("");

  const superadminEmail = "superadmin@example.com"; // Replace with logged-in superadmin email from session/context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, superadminEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setName(""); setEmail(""); setPassword(""); setRole("product_manager");
      } else setMessage(data.error);
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Create Admin</h2>

        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 mb-4 border rounded"/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 mb-4 border rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 mb-4 border rounded"/>

        <select value={role} onChange={(e) => setRole(e.target.value as any)} className="w-full p-2 mb-4 border rounded">
          <option value="product_manager">Product Manager</option>
          <option value="order_manager">Order Manager</option>
          <option value="marketing_manager">Marketing Manager</option>
        </select>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Create Admin</button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
}
