import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/app/lib/mongodb";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const brand = url.searchParams.get("brand");
    const category = url.searchParams.get("category");

    let filter: any = {};

    // ✅ Brand filter (case-insensitive)
    if (brand) {
      filter.brand = { $regex: new RegExp(`^${decodeURIComponent(brand)}$`, "i") };
    }

    // ✅ Category filter (case-insensitive, spaces handled)
    if (category) {
      const decodedCategory = decodeURIComponent(category)
        .replace(/-/g, " ") // support slugs like "bosch-series"
        .replace(/\s+/g, " ") // normalize spaces
        .trim();

      filter.category = { $regex: new RegExp(`^${decodedCategory}$`, "i") };
    }

    const products = await Product.find(filter).lean();

    return NextResponse.json(products);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
