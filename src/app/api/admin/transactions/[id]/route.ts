import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Transaction from "@/models/Transaction";

// ✅ Update transaction status (PATCH)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // ✅ Only allow valid statuses
    const allowedStatuses = ["pending", "completed", "failed"];
    if (!allowedStatuses.includes(body.status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 }
      );
    }

    const updated = await Transaction.findByIdAndUpdate(
      params.id,
      { status: body.status }, // "pending" | "completed" | "failed"
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, transaction: updated });
  } catch (error: any) {
    console.error("❌ Error updating transaction:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
