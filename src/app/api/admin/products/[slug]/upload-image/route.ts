import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";

export async function POST(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;
  if (!slug) {
    return NextResponse.json({ error: "Slug required" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const files: File[] = formData.getAll("images") as File[];

    // ✅ Ensure upload dir exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      await fsp.mkdir(uploadDir, { recursive: true });
    }

    const filePaths: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(uploadDir, filename);

      await fsp.writeFile(filepath, buffer);

      // ✅ Publicly accessible path
      filePaths.push(`/uploads/${filename}`);
    }

    return NextResponse.json({ filePaths });
  } catch (err) {
    console.error("❌ Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
