"use client";

import { useState, useEffect } from "react";

type Notification = {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export default function NotificationsAdminPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all notifications
  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data.notifications);
    } catch (err) {
      console.error("❌ Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Send a new notification
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message }),
      });

      if (res.ok) {
        setTitle("");
        setMessage("");
        fetchNotifications(); // refresh list
      } else {
        console.error("❌ Failed to send notification");
      }
    } catch (err) {
      console.error("❌ Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a notification
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchNotifications();
      }
    } catch (err) {
      console.error("❌ Error deleting notification:", err);
    }
  };

  // Mark as read
  const handleMarkRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });

      if (res.ok) {
        fetchNotifications();
      }
    } catch (err) {
      console.error("❌ Error updating notification:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Form */}
      <form onSubmit={handleSend} className="space-y-4 bg-white shadow p-4 rounded">
        <h2 className="text-lg font-bold">Send Notification</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {/* List */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-lg font-bold mb-4">All Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li
                key={n._id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <h3 className="font-semibold">{n.title}</h3>
                  <p className="text-sm text-gray-600">{n.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                  {n.read ? (
                    <span className="text-green-600 text-xs">✅ Read</span>
                  ) : (
                    <span className="text-red-600 text-xs">📩 Unread</span>
                  )}
                </div>

                <div className="flex gap-2">
                  {!n.read && (
                    <button
                      onClick={() => handleMarkRead(n._id)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(n._id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
