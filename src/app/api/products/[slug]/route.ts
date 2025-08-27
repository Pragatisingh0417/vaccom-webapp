import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Product from "@/models/Product";

export async function GET(
  req: Request,
  context: { params: { slug?: string } } // ✅ no Promise, slug is optional
) {
  try {
    const { slug } = context.params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await connectToDatabase();

    const decodedSlug = decodeURIComponent(slug);

    // Case-insensitive search
    const product = await Product.findOne({
      slug: { $regex: `^${decodedSlug}$`, $options: "i" },
    }).lean();

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
