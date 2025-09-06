// utils/jwt.ts
import jwt from "jsonwebtoken";
import Admin from "@/models/Admin";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_here";

export async function verifyAdminToken(token: string) {
  try {
    // Decode token
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    
    // Fetch admin from DB
    const admin = await Admin.findById(payload.id);
    return admin;
  } catch (err) {
    return null;
  }
}
