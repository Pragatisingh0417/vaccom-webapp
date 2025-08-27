import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Coupon from "@/models/Coupon";

interface ApplyCouponRequest {
  code: string;
  userId: string;
  totalAmount: number;
}

export async function POST(req: Request) {
  try {
    const { code, userId, totalAmount }: ApplyCouponRequest = await req.json();

    await connectToDatabase();
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return NextResponse.json({ error: "Invalid coupon" }, { status: 400 });
    }

    // Check expiry
    if (coupon.expiryDate && coupon.expiryDate < new Date()) {
      return NextResponse.json({ error: "Coupon expired" }, { status: 400 });
    }

    // Check minimum purchase
    if (totalAmount < coupon.minPurchase) {
      return NextResponse.json({ error: `Minimum purchase ₹${coupon.minPurchase}` }, { status: 400 });
    }

    // Check if user has already used
    if (coupon.usedBy.includes(userId)) {
      return NextResponse.json({ error: "Coupon already used" }, { status: 400 });
    }

    // ✅ Calculate discount
    let discount =
      coupon.discountType === "percentage"
        ? (totalAmount * coupon.discountValue) / 100
        : coupon.discountValue;

    let finalAmount = Math.max(totalAmount - discount, 0);

    return NextResponse.json({ success: true, discount, finalAmount });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
