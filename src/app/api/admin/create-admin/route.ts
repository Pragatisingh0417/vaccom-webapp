import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/app/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password, role, superadminEmail } = await req.json();

    // Verify superadmin
    const superadmin = await Admin.findOne({ email: superadminEmail, role: "superadmin" });
    if (!superadmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if email already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Admin with this email already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ name, email, password: hashedPassword, role });
    await admin.save();

    return NextResponse.json({ message: "Admin created successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
