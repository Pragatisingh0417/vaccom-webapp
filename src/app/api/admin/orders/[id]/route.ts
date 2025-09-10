import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Order from "@/models/Order";

// ✅ define context type once
type Context = {
  params: { id: string };
};

// ✅ GET: Fetch order by ID
export async function GET(req: NextRequest, context: Context) {
  try {
    await connectToDatabase();
    const { id } = context.params;

    if (!id || id.length !== 24) {
      return NextResponse.json(
        { success: false, error: "Invalid order ID" },
        { status: 400 }
      );
    }

    const order = await Order.findById(id).populate("user", "name email").lean();
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}

// ✅ PUT: Update order
export async function PUT(req: NextRequest, context: Context) {
  try {
    await connectToDatabase();
    const { id } = context.params;

    if (!id || id.length !== 24) {
      return NextResponse.json(
        { success: false, error: "Invalid order ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const updatedOrder = await Order.findByIdAndUpdate(id, body, {
      new: true,
    }).lean();

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updatedOrder }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Remove order
export async function DELETE(req: NextRequest, context: Context) {
  try {
    await connectToDatabase();
    const { id } = context.params;

    if (!id || id.length !== 24) {
      return NextResponse.json(
        { success: false, error: "Invalid order ID" },
        { status: 400 }
      );
    }

    const deletedOrder = await Order.findByIdAndDelete(id).lean();

    if (!deletedOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
