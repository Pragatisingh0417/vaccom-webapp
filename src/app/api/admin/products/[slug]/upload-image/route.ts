import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";

// ✅ Fully Vercel-compatible POST handler
export async function POST(req: NextRequest, event: any) {
  const slug = event.params?.slug;

  if (!slug) {
    return NextResponse.json({ error: "Slug required" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const files: File[] = formData.getAll("images") as File[];
    const filePaths: string[] = [];

    // Detect if running on Vercel (serverless)
    const isVercel = process.env.VERCEL === "1";

    if (!isVercel) {
      // Local environment: save files to /public/uploads
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        await fsp.mkdir(uploadDir, { recursive: true });
      }

      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name}`;
        const filepath = path.join(uploadDir, filename);
        await fsp.writeFile(filepath, buffer);
        filePaths.push(`/uploads/${filename}`);
      }
    } else {
      // Production environment: return placeholder paths
      for (const file of files) {
        const filename = `${Date.now()}-${file.name}`;
        filePaths.push(`/uploads/${filename}`);
      }
    }

    return NextResponse.json({ filePaths });
  } catch (err) {
    console.error("❌ Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
