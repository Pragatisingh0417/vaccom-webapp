// /app/api/admin/orders/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Order from "@/models/Order";

// Type definitions
interface Product {
  productId: string;
  name: string;
  price: number | string;
  qty?: number | string;
}

interface OrderDetail {
  _id: string;
  user: { name: string; email: string };
  products: Product[];
  amount: number | string;
  status: string;
  createdAt: string;
  currency: string;
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();

    // Sanitize and type-check orders
    const sanitizedOrders: OrderDetail[] = orders.map((order: any) => ({
      _id: order._id,
      user: order.user,
      status: order.status,
      createdAt: order.createdAt,
      currency: order.currency,
      amount: Number(order.amount),
      products: order.products.map((p: any) => ({
        productId: p.productId,
        name: p.name,
        price: Number(p.price),
        qty: Number(p.qty) || 1,
      })),
    }));

    return NextResponse.json({ success: true, orders: sanitizedOrders }, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error fetching admin orders:", err.message || err);
    return NextResponse.json(
      { success: false, error: "Unexpected error while fetching orders" },
      { status: 500 }
    );
  }
}
