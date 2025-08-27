import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Define upload directory inside /public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Create unique filename
    const fileExt = path.extname(file.name);
    const fileName = `${Date.now()}${fileExt}`;
    const filePath = path.join(uploadDir, fileName);

    // Read file data as buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save file to disk
    fs.writeFileSync(filePath, buffer);

    // Return public URL for frontend usage
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
