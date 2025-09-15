import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Product from "@/models/Product";

// ✅ GET product by slug (case-insensitive)
export async function GET(
  req: Request,
  context: { params: { slug: string } }
) {
  try {
    let { slug } = context.params;

    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    // Normalize slug to lowercase for case-insensitive search
    slug = slug.toLowerCase();

    await connectToDatabase();

    // Use lean() for better performance
    const product = await Product.findOne({ slug }).collation({ locale: "en", strength: 2 }).lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error fetching product:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ Update product by slug (case-insensitive)
export async function PUT(
  req: Request,
  context: { params: { slug: string } }
) {
  try {
    let { slug } = context.params;

    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    slug = slug.toLowerCase(); // normalize

    const body = await req.json();
    await connectToDatabase();

    // Ensure active flag defaults to true
    if (body.isActive === undefined) {
      body.isActive = true;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, lean: true, collation: { locale: "en", strength: 2 } }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error updating product:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
