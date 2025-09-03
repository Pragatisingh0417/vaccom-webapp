import { NextResponse } from "next/server";       // ✅ Next.js Response helper
import { connectToDatabase } from "@/app/lib/mongodb";
import Product from "@/models/Product";           // ✅ Your Product model
import { generateSlug } from "@/utils/slug";     // ✅ Utility to generate slug

// GET: fetch all products
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find().lean();
    return NextResponse.json(products);
  } catch (err) {
    console.error("GET products error:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST: add new product
// POST: add new product
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const salePrice = formData.get("salePrice") as string; // optional
    const shortDesc = formData.get("shortDesc") as string;
    const longDesc = formData.get("longDesc") as string;
    const brand = formData.get("brand") as string;
    const category = formData.get("category") as string;
    const stock = Number(formData.get("stock") || 0);       // ✅ convert stock to number
    const isTodayDeal = formData.get("isTodayDeal") === "true";

    // Handle multiple images
    const files = formData.getAll("images") as File[];
    const imageUrls: string[] = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
      imageUrls.push(base64);
    }

    const slug = generateSlug(name);

    const newProduct = await Product.create({
      name,
      slug,
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : undefined,
      shortDesc,
      longDesc,
      brand,
      category,
      images: imageUrls,
      stock,                          // ✅ save stock
      isOutOfStock: stock <= 0,       // ✅ auto-update out of stock
      isTodayDeal,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error("POST product error:", err);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}


