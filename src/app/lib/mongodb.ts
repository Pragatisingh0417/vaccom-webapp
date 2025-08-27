// /app/lib/mongoose.ts
import mongoose from "mongoose";

let isConnected = false;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

export async function connectToDatabase() {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not set in environment variables");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
      bufferCommands: false, // ⚡ avoids memory leaks in Next.js
    });

    isConnected = true;
    reconnectAttempts = 0;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    // Prevent adding duplicate listeners in hot-reload (Next.js dev mode)
    if (mongoose.connection.listeners("disconnected").length === 0) {
      mongoose.connection.on("disconnected", async () => {
        isConnected = false;
        console.warn("⚠️ MongoDB disconnected. Attempting to reconnect...");
        await handleReconnect();
      });

      mongoose.connection.on("error", (err) => {
        console.error("❌ MongoDB connection error:", err);
      });
    }
  } catch (error) {
    console.error("❌ Initial MongoDB connection failed:", error);
    await handleReconnect();
  }
}

async function handleReconnect() {
  if (reconnectAttempts >= maxReconnectAttempts) {
    console.error("❌ Max reconnection attempts reached. Exiting process.");
    process.exit(1);
  }

  reconnectAttempts++;
  console.log(
    `🔄 Reconnect attempt ${reconnectAttempts} of ${maxReconnectAttempts}...`
  );

  setTimeout(async () => {
    try {
      await connectToDatabase();
    } catch (err) {
      console.error("❌ Reconnection failed:", err);
    }
  }, 5000); // Retry after 5 seconds
}
