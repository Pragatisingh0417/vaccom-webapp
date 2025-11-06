"use client";

import { useEffect, useState } from "react";

type Notification = {
  _id: string;
  userId: string | null;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  isRead: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: Replace this with your real user session ID
  const userId = "123"; 

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/notifications/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.notifications);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [userId]);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading notifications...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="text-gray-500">No notifications yet.</div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => markAsRead(n._id)}
              className={`p-4 border rounded-lg cursor-pointer transition ${
                n.isRead ? "bg-gray-50" : "bg-blue-50 border-blue-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{n.title}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    n.type === "success"
                      ? "bg-green-100 text-green-600"
                      : n.type === "warning"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {n.type}
                </span>
              </div>
              <p className="text-gray-600">{n.message}</p>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
