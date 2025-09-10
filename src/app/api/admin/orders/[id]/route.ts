import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Order from "@/models/Order";

// ✅ GET a single order by ID
export async function GET(req: NextRequest, { params }: any) {
  try {
    await connectToDatabase();
    const order = await Order.findById(params.id);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching order", error },
      { status: 500 }
    );
  }
}

// ✅ UPDATE an order by ID
export async function PUT(req: NextRequest, { params }: any) {
  try {
    await connectToDatabase();
    const data = await req.json();

    const order = await Order.findByIdAndUpdate(params.id, data, { new: true });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating order", error },
      { status: 500 }
    );
  }
}

// ✅ DELETE an order by ID
export async function DELETE(req: NextRequest, { params }: any) {
  try {
    await connectToDatabase();
    const order = await Order.findByIdAndDelete(params.id);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting order", error },
      { status: 500 }
    );
  }
}
