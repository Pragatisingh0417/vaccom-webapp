// models/Order.ts
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import "@/models/User"; // ⚠️ important: load User model first


const OrderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      image: { type: String, default: "/placeholder.png" }, // ✅ add image here
    },
  ],
  amount: { type: Number, required: true },
  currency: { type: String, default: "usd", lowercase: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});


// ✅ Auto-generate unique orderId if missing
OrderSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId = "ORD-" + uuidv4().slice(0, 8).toUpperCase();
  }
  next();
});

// ✅ Ensure `user` is always stored as ObjectId
OrderSchema.pre("validate", function (next) {
  if (this.user && typeof this.user === "string") {
    this.user = new mongoose.Types.ObjectId(this.user);
  }
  next();
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
