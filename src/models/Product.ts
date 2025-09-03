import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

export interface IProduct extends Document {
  name: string;
  price: number;
  salePrice?: number;
  shortDesc: string;
  longDesc: string;
  brand: string;
  category: string;
  images: string[];
  slug: string;
  isTodayDeal?: boolean;
  stock: number;           // ✅ new field
  isOutOfStock: boolean;   // ✅ optional derived field
  isActive: Boolean; 
}

const ProductSchema: Schema<IProduct> = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  shortDesc: { type: String, required: true },
  longDesc: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: [String], default: [] },
  slug: { type: String, required: true, unique: true },
  isTodayDeal: { type: Boolean, default: false },
  stock: { type: Number, required: true, default: 0 },        // new
  isOutOfStock: { type: Boolean, default: false },             // new
  isActive: { type: Boolean, default: true },

});

// Auto-generate slug from name
ProductSchema.pre<IProduct>("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  // Automatically set out of stock if stock <= 0
  this.isOutOfStock = this.stock <= 0;

  next();
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
