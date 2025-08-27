import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/app/lib/mongodb";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const product = await Product.findById(params.id).lean();
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const updated = await Product.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const deleted = await Product.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Failed to delete product:", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}