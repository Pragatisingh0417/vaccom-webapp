import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/app/lib/mongodb";

function normalizeBrand(raw: string) {
  return raw
    .replace(/-/g, " ")         // turn dashes into spaces
    .replace(/\s+/g, " ")       // collapse multiple spaces
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize words
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const brand = url.searchParams.get("brand");
    const category = url.searchParams.get("category");
    const isTodayDeal = url.searchParams.get("isTodayDeal");

    let filter: any = {};

    if (brand) {
      const normalizedBrand = normalizeBrand(decodeURIComponent(brand));
      filter.brand = { $regex: new RegExp(`^${normalizedBrand}$`, "i") };
    }

    if (category) {
      const decodedCategory = decodeURIComponent(category).replace(/-/g, " ").trim();
      filter.category = { $regex: new RegExp(`^${decodedCategory}$`, "i") };
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

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // ✅ Ensure new product is active by default
    if (body.isActive === undefined) body.isActive = true;

    // Auto-generate slug if missing
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/\s+/g, "-");
    }

    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (err: any) {
    console.error(err);
    if (err.code === 11000) {
      return NextResponse.json({ error: "Slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
