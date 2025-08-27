import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Product from "@/models/Product";

// GET /api/products/category/[slug]
export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> } // ✅ params must be a Promise
) {
  try {
    const { slug } = await context.params; // ✅ await params
    await connectToDatabase();

    // Decode slug to handle spaces, etc.
    const decodedSlug = decodeURIComponent(slug);

    // Find products by category (case-insensitive)
    const products = await Product.find({
      category: { $regex: new RegExp(`^${decodedSlug}$`, "i") },
    }).lean();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "No products found for this category" },
        { status: 404 }
      );
    }

    return NextResponse.json(products);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
