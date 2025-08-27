import mongoose, { Schema, Document } from "mongoose";
import slugify from "slugify"; // npm install slugify

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  category: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  readTime: string;
  createdAt: Date;
  updatedAt: Date;
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    featuredImage: { type: String },
    tags: [{ type: String }],
    category: { type: String },
    author: {
      name: { type: String, required: true },
      avatar: { type: String },
      bio: { type: String },
    },
    readTime: { type: String },
    isFeatured: { type: Boolean, default: false },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

// ✅ Auto-generate slug if not provided
BlogSchema.pre("validate", async function (next) {
  if (!this.slug && this.title) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    // Ensure slug is unique
    while (await mongoose.models.Blog.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
  }
  next();
});

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
