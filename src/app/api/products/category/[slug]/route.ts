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

    const decodedSlug = decodeURIComponent(slug);

    let filter: any = {};

    // ✅ If slug is "today-deals", show only products marked as isTodayDeal
    if (decodedSlug.toLowerCase() === "today-deals") {
      filter.isTodayDeal = true;
    } else {
      // Otherwise, filter by category (case-insensitive)
      filter.category = { $regex: new RegExp(`^${decodedSlug}$`, "i") };
    }

    const products = await Product.find(filter).lean();

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
