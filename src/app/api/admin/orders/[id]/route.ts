import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Order from "@/models/Order";

// ✅ GET a single order by ID
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const { id } = await context.params; // <-- await params
    const order = await Order.findById(id);

    if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching order", error }, { status: 500 });
  }
}

// ✅ UPDATE an order by ID
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const data = await req.json();

    const { id } = context.params;

    // Optional: validate status field
    const allowedStatuses = ["pending", "processing", "completed", "cancelled"];
    if (data.status && !allowedStatuses.includes(data.status)) {
      return NextResponse.json({ success: false, message: "Invalid status value" }, { status: 400 });
    }

    const order = await Order.findByIdAndUpdate(id, data, { new: true });

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    // ✅ Return success with updated order
    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ✅ DELETE an order by ID
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const { id } = await context.params; // <-- await params
    const order = await Order.findByIdAndDelete(id);

    if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

    return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting order", error }, { status: 500 });
  }
}
