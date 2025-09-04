// /app/api/admin/orders/[id]/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    await connectToDatabase();

    // Access params from context
    const params = await context.params; // ✅ Await it
    const id = params.id;

    if (!id || id.length !== 24) {
      return NextResponse.json(
        { success: false, error: "Invalid order ID" },
        { status: 400 }
      );
    }

    const order = await Order.findById(id)
      .populate("user", "name email")
      .lean();

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error fetching order details:", err.message || err);
    return NextResponse.json(
      { success: false, error: "Unexpected error while fetching order" },
      { status: 500 }
    );
  }
}
