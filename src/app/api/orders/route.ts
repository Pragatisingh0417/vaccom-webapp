import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/app/lib/mongodb";
import Order from "@/models/Order";
import Transaction from "@/models/Transaction"; 

function getToken(req: Request, body?: any) {
  return (
    req.headers.get("authorization")?.replace("Bearer ", "") ||
    body?.token ||
    null
  );
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const token = getToken(req, body);
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    // ✅ Normalize items to always have image
    const normalizedItems = body.items.map((item: any) => ({
      productId: item._id || item.productId,
      name: item.name,
      price: item.price,
      qty: item.qty,
      image: item.image || "/placeholder.png",
    }));

    // ✅ Create order
    const order = await Order.create({
      user: decoded.id,
      products: normalizedItems,
      amount: body.amount,
      currency: body.currency || "usd",
    });

    // ✅ Create transaction
    const transaction = await Transaction.create({
      user: decoded.id,
      amount: body.amount,
      status: "pending", // default pending
      paymentMethod: body.paymentMethod || "stripe", // fallback to stripe
    });

    return NextResponse.json({ success: true, order, transaction }, { status: 201 });
  } catch (err: any) {
    console.error("❌ Error creating order/transaction:", err.message || err);
    return NextResponse.json(
      { error: "Unexpected error while saving order/transaction" },
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const token = getToken(req);
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const orders = await Order.find({ user: decoded.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error fetching orders:", err.message || err);
    return NextResponse.json(
      { error: "Unexpected error while fetching orders" },
      { status: 500 }
    );
  }
}
