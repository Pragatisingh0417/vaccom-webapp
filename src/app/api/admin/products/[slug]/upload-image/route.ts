import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";

// App Router API route
export async function POST(req: NextRequest, event: { params: { slug: string } }) {
  const slug = event.params.slug;

  if (!slug) {
    return NextResponse.json({ error: "Slug required" }, { status: 400 });
  }

  try {
    // Parse uploaded files
    const formData = await req.formData();
    const files: File[] = formData.getAll("images") as File[];

    // Directory to save files locally
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      await fsp.mkdir(uploadDir, { recursive: true });
    }

    const filePaths: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(uploadDir, filename);

      await fsp.writeFile(filepath, buffer);

      // Public URL path
      filePaths.push(`/uploads/${filename}`);
    }

    return NextResponse.json({ filePaths });
  } catch (err) {
    console.error("❌ Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
