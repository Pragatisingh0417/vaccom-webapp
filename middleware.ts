import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("🟢 Middleware executed for:", pathname);

  // ✅ Allow login page without token
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // ✅ Read cookie
  const token = req.cookies.get("adminToken")?.value;

  if (!token) {
    console.warn("❌ No token found, redirecting to /admin/login");
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    jwt.verify(token, JWT_SECRET as string);
    console.log("✅ Valid admin token");
    return NextResponse.next();
  } catch (err) {
    console.error("❌ Invalid token:", err);
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"], // protect both root + subroutes
};
