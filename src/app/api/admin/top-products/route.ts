// /app/api/admin/top-products/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  await connectToDatabase();

  const topProducts = await Order.aggregate([
    { $unwind: "$products" }, // expand products array
    { $group: { _id: "$products.name", sales: { $sum: "$products.qty" } } },
    { $sort: { sales: -1 } },
    { $limit: 5 },
  ]);

  return NextResponse.json(topProducts);
}
