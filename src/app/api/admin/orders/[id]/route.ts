// /app/api/admin/orders/[id]/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Order from "@/models/Order";

export async function GET(
  req: Request,
  { params }: { params: { id: string } } // dynamic params from route
) {
  try {
    // Connect to DB first
    await connectToDatabase();

    // Fetch order by ID directly from params.id
    const order = await Order.findById(params.id)
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
    console.error("❌ Error fetching order details:", params.id, err.message || err);
    return NextResponse.json(
      { success: false, error: "Unexpected error while fetching order" },
      { status: 500 }
    );
  }
}
