import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Product from "@/models/Product";

// ✅ GET /api/products/brand/[slug]
export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> } // params must be a Promise
) {
  try {
    const { slug: rawSlug } = await context.params;

    if (!rawSlug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    await connectToDatabase();

    // Normalize slug for display/logs
    const slug = rawSlug.toLowerCase();

    // Convert slug to real brand name for MongoDB query
    const decoded = slug.replace(/-/g, " ");
    const normalizedBrand = decoded
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();

    console.log("🔎 Brand filter (slug):", slug); // logs i-vac

    // Find products by brand (case-insensitive)
    const products = await Product.find({
      brand: { $regex: new RegExp(`^${normalizedBrand}$`, "i") },
    }).lean();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "No products found for this brand" },
        { status: 404 }
      );
    }

    return NextResponse.json(products);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
