import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const transactions = await Transaction.find()
      .populate("user", "name email") // fetch user name and email
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, transactions });
  } catch (error: any) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
