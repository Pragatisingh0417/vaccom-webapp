import { NextResponse } from "next/server";

export async function POST() {
  // ✅ Clear the cookie by setting it to empty and expiring immediately
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.set("adminToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0, // expire immediately
  });

  return response;
}
