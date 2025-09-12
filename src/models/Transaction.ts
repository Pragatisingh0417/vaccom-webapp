import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId; // reference to User
  amount: number;
  status: "pending" | "completed" | "failed"; // must exist
  paymentMethod: string;
  stripePaymentIntentId?: string; // ✅ new field
  createdAt: Date;
}

const TransactionSchema: Schema<ITransaction> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  paymentMethod: { type: String, required: true },
  stripePaymentIntentId: { type: String }, // ✅ store Stripe PaymentIntent ID
  createdAt: { type: Date, default: Date.now },
});

const Transaction: Model<ITransaction> =
  mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
