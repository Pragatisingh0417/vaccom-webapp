import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Product from "@/models/Product";

// GET /api/products/brand/[slug]
export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> } // ✅ params must be a Promise
) {
  try {
    const { slug } = await context.params; // ✅ await params
    await connectToDatabase();

    const decodedSlug = decodeURIComponent(slug);

    // Find products by brand (case-insensitive)
    const products = await Product.find({
      brand: { $regex: new RegExp(`^${decodedSlug}$`, "i") },
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
