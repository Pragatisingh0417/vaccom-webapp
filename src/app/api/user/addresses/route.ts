// src/app/api/user/addresses/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Address from "@/models/Address";
import { getServerSession } from "next-auth";


export async function GET() {
  try {
    await connectToDatabase();
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const addresses = await Address.find({ userEmail: session.user.email }).lean();
    return NextResponse.json({ addresses });
  } catch (err) {
    console.error("Addresses fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch addresses" }, { status: 500 });
  }
}
