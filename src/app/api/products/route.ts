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
      const normalizedBrand = decodeURIComponent(brand)
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const escapedBrand = normalizedBrand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.brand = { $regex: new RegExp(`^${escapedBrand}$`, "i") };
    }

    if (category) {
      const normalizedCategory = decodeURIComponent(category)
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const escapedCategory = normalizedCategory.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.category = { $regex: new RegExp(`^${escapedCategory}$`, "i") };
    }

    if (isTodayDeal === "true") {
      filter.isTodayDeal = true;
    }

    const products = await Product.find(filter).lean();

    // ✅ Minimal fix: ensure salePrice is number or null
    const fixedProducts = products.map((p) => ({
      ...p,
      salePrice: p.salePrice !== undefined ? Number(p.salePrice) : null,
    }));

    return NextResponse.json(fixedProducts);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
