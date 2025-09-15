import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/app/lib/mongodb";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const brand = url.searchParams.get("brand");
    const category = url.searchParams.get("category");
    const isTodayDeal = url.searchParams.get("isTodayDeal");

    let filter: any = {};

    if (brand) {
      // ✅ Normalize slug: replace dashes with spaces, trim, case-insensitive
      const normalizedBrand = decodeURIComponent(brand)
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      filter.brand = { $regex: new RegExp(`^${normalizedBrand}$`, "i") };
    }

    if (category) {
      const normalizedCategory = decodeURIComponent(category)
        .replace(/-/g, " ")
        .trim();
      filter.category = { $regex: new RegExp(`^${normalizedCategory}$`, "i") };
    }

    if (isTodayDeal === "true") {
      filter.isTodayDeal = true;
    }

    const products = await Product.find(filter).lean();
    return NextResponse.json(products);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
