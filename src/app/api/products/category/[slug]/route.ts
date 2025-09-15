import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Product from "@/models/Product";

// GET /api/products/category/[slug]
export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: rawSlug } = await context.params;
    if (!rawSlug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    await connectToDatabase();

    // Decode, convert %26 to &, replace dashes with spaces, trim
    const decodedSlug = decodeURIComponent(rawSlug)
      .replace(/-/g, " ")
      .replace(/%26/g, "&")
      .replace(/\s+/g, " ")
      .trim();
    console.log("🔎 Category filter (slug):", decodedSlug);

    let filter: any = {};

    // Today deals special case
    if (decodedSlug.toLowerCase() === "today deals") {
      filter.isTodayDeal = true;
    } else {
      filter.category = { $regex: new RegExp(decodedSlug, "i") }; // loose case-insensitive match
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
