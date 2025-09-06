"use client";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function AllUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (users.length === 0) return <p>No users yet.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Joined On</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
