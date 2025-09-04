// models/Coupon.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  expiryDate?: Date;
  usageLimit: number;
  usedBy: Types.ObjectId[]; // ✅ correct typing
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, trim: true },
    discountType: { type: String, enum: ["percentage", "fixed"], required: true },
    discountValue: { type: Number, required: true },
    minPurchase: { type: Number, default: 0 },
    expiryDate: { type: Date },
    usageLimit: { type: Number, default: 1 },
    usedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // ✅ references User
  },
  { timestamps: true }
);

const Coupon: Model<ICoupon> =
  mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", couponSchema);

export default Coupon;
