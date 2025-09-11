import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/app/lib/mongodb";
import Order from "@/models/Order";

function getToken(req: Request, body?: any) {
  return req.headers.get("authorization")?.replace("Bearer ", "") || body?.token || null;
}

// GET orders for logged-in user
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const token = getToken(req);
    if (!token) return NextResponse.json({ error: "No token provided" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email?: string };
    const orders = await Order.find({ user: decoded.id }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST: create new order + send confirmation email
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const token = getToken(req, body);
    if (!token) return NextResponse.json({ error: "No token provided" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email?: string };

    const userEmail = decoded.email || body.email;
    if (!userEmail) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const normalizedItems = body.items.map((item: any) => ({
      productId: item._id || item.productId,
      name: item.name,
      price: item.price,
      qty: item.qty,
      image: item.image || "/placeholder.png",
    }));

    const order = await Order.create({
      user: decoded.id,
      userEmail,
      products: normalizedItems,
      amount: body.amount,
      currency: body.currency || "usd",
    });

    // Send confirmation email
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/confirmation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order._id,
          email: userEmail,
          items: order.products,
          amount: order.amount,
        }),
      });
    } catch (emailErr) {
      console.error("Failed to send confirmation email:", emailErr);
    }

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: "Unexpected error while saving order" }, { status: 500 });
  }
}
