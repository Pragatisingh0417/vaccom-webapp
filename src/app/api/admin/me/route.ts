import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Admin from "@/models/Admin";
import { connectToDatabase } from "@/app/lib/mongodb";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(admin);
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
