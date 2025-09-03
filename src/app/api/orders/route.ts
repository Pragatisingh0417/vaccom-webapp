// /app/api/orders/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/app/lib/mongodb"; // ✅ match your setup (not mongodb.ts)
import Order from "@/models/Order";

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

   const normalizedItems = body.items.map((item: any) => ({
  productId: item._id,
  name: item.name,
  price: item.price,
  qty: item.qty,
  image: item.image || "/placeholder.png", // ✅ save image
}));

const order = await Order.create({
  user: decoded.id,
  products: normalizedItems,
  amount: body.amount,
  currency: body.currency || "usd",
});

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err: any) {
    console.error("❌ Error creating order:", err.message || err);
    return NextResponse.json(
      { error: "Unexpected error while saving order" },
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

    // ✅ fetch user’s orders
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
