// /app/api/admin/revenue/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "week"; // default = week
    const now = new Date();

    let start: Date;

    if (filter === "week") {
      start = new Date();
      start.setDate(now.getDate() - 7); // last 7 days
    } else if (filter === "month") {
      start = new Date(now.getFullYear(), now.getMonth(), 1); // start of month
    } else {
      start = new Date(now.getFullYear(), 0, 1); // start of year
    }

    const matchStage = { status: "completed", createdAt: { $gte: start, $lte: now } };

    // Grouping logic based on filter
    let groupId: any = {};
    if (filter === "week") {
      groupId = { day: { $dayOfMonth: "$createdAt" }, month: { $month: "$createdAt" } };
    } else if (filter === "month") {
      groupId = { day: { $dayOfMonth: "$createdAt" } };
    } else {
      groupId = { month: { $month: "$createdAt" } };
    }

    const result = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: groupId,
          revenue: { $sum: "$amount" },
          earnings: { $sum: { $multiply: ["$amount", 0.3] } },
        },
      },
      { $sort: { "_id.day": 1, "_id.month": 1 } },
    ]);

    // Format for chart
    const formatted = result.map((r) => ({
      time:
        filter === "year"
          ? `Month ${r._id.month}`
          : filter === "month"
          ? `Day ${r._id.day}`
          : `${r._id.day}/${r._id.month}`, // week
      revenue: r.revenue,
      earnings: r.earnings,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Revenue API error:", error);
    return NextResponse.json({ error: "Failed to fetch revenue" }, { status: 500 });
  }
}
