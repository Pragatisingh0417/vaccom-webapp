// models/Coupon.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  expiryDate?: Date;
  usageLimit: number;
  usedBy: string[];
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ["percentage", "fixed"], required: true },
    discountValue: { type: Number, required: true },
    minPurchase: { type: Number, default: 0 },
    expiryDate: { type: Date },
    usageLimit: { type: Number, default: 1 },
    usedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Coupon: Model<ICoupon> =
  mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", couponSchema);

export default Coupon;
