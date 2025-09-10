import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }  // ✅ correct typing
) {
  const slug = params.slug;

  if (!slug) {
    return NextResponse.json({ error: "Slug required" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const files: File[] = formData.getAll("images") as File[];

    // Here you would upload to S3/Cloudinary, not fs
    const uploadedPaths = files.map((file) => `/fake-path/${file.name}`);

    return NextResponse.json({ filePaths: uploadedPaths });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
