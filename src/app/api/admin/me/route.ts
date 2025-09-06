// /app/api/admin/me/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(req: Request) {
  try {
    // 1️⃣ Read cookies
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map(c => {
        const [key, ...val] = c.trim().split("=");
        return [key, decodeURIComponent(val.join("="))];
      })
    );

    const token = cookies.adminToken;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    // 3️⃣ ✅ Return role for any admin (not just superadmin)
    return NextResponse.json({
      success: true,
      email: decoded.email,
      role: decoded.role,
    });

  } catch (err) {
    console.error("❌ /api/admin/me error:", err);
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
