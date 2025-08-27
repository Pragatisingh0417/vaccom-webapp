import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify"; // ✅ install with: npm install slugify

export interface IProduct extends Document {
  name: string;
  price: number;
  shortDesc: string;
  longDesc: string;
  brand: string;
  category: string;
  images: string[];
  slug: string; // ✅ new field
}

const ProductSchema: Schema<IProduct> = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  shortDesc: { type: String, required: true },
  longDesc: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: [String], default: [] },
  slug: { type: String, required: true, unique: true }, // ✅
});

// ✅ Pre-save middleware to auto-generate slug from name
ProductSchema.pre<IProduct>("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Avoid "model overwrite" errors in Next.js hot reload
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
