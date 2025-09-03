import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Product from "@/models/Product";

// GET a single product by slug
export async function GET(req: Request, context: any) {
  try {
    const { slug } = await context.params; // <-- await params
    if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

    await connectToDatabase();
    const product = await Product.findOne({ slug }).lean();
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(product);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update product (including toggle isActive or update stock)
export async function PUT(req: Request, context: any) {
  try {
    const { slug } = await context.params; // <-- await params
    if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

    const body = await req.json();
    await connectToDatabase();

    // Ensure stock is a number and auto-update isOutOfStock
    if (body.stock !== undefined) {
      body.stock = Number(body.stock);
      body.isOutOfStock = body.stock <= 0;
    }

    // If toggle request (just flip isActive)
    if (body.toggleActive === true) {
      const product = await Product.findOne({ slug });
      if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

      product.isActive = !product.isActive;
      await product.save();
      return NextResponse.json(product.toObject());
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true }
    ).lean();

    if (!updatedProduct)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(updatedProduct);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE a product by slug
export async function DELETE(req: Request, context: any) {
  try {
    const { slug } = await context.params; // <-- await params
    if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

    await connectToDatabase();
    const deleted = await Product.findOneAndDelete({ slug }).lean();

    if (!deleted) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ message: "Product deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
