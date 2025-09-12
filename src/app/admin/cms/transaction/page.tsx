"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Transaction {
  _id: string;
  user: { name: string; email: string };
  amount: number;
  status: "pending" | "completed" | "failed";
  paymentMethod: string;
  stripePaymentIntentId?: string; // ✅ new field
  createdAt: string;
}

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/api/admin/transactions");
      setTransactions(res.data.transactions);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();

    // ✅ Poll every 5 seconds for updates
    const interval = setInterval(fetchTransactions, 5000);
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const handleStatusChange = async (id: string, status: Transaction["status"]) => {
    try {
      const res = await axios.patch(`/api/admin/transactions/${id}`, { status });
      setTransactions((prev) =>
        prev.map((tx) => (tx._id === id ? { ...tx, status: res.data.transaction.status } : tx))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) return <p className="p-6">Loading transactions...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stripe Payment ID</th> {/* ✅ new column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((tx) => (
              <tr key={tx._id}>
                <td className="px-6 py-4 whitespace-nowrap">{tx.user.name} ({tx.user.email})</td>
                <td className="px-6 py-4 whitespace-nowrap">${tx.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tx.paymentMethod}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tx.stripePaymentIntentId || "-"}</td> {/* ✅ display Stripe ID */}
                <td className="px-6 py-4 whitespace-nowrap font-semibold">
                  <select
                    value={tx.status}
                    onChange={(e) => handleStatusChange(tx._id, e.target.value as Transaction["status"])}
                    className={`font-semibold px-2 py-1 rounded border ${
                      tx.status === "completed"
                        ? "text-green-600 border-green-600"
                        : tx.status === "pending"
                        ? "text-yellow-600 border-yellow-600"
                        : "text-red-600 border-red-600"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(tx.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
