import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Transaction from "@/models/Transaction";
import Order from "@/models/Order";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { paymentId } = await req.json();

    if (!paymentId) {
      return NextResponse.json({ success: false, message: "Missing paymentId" }, { status: 400 });
    }

    // ✅ Update transaction status
    const transaction = await Transaction.findOneAndUpdate(
      { stripePaymentIntentId: paymentId },
      { status: "completed" },
      { new: true }
    );

    if (!transaction) {
      return NextResponse.json({ success: false, message: "Transaction not found" }, { status: 404 });
    }

    // ✅ Optionally update order status too
    const order = await Order.findOneAndUpdate(
      { paymentId },
      { status: "completed" },
      { new: true }
    );

    return NextResponse.json({ success: true, transaction, order });
  } catch (err: any) {
    console.error("❌ Error completing order:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
