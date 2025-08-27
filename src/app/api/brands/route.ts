import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "src", "data", "brands.json");

export async function GET() {
  const brands = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(brands);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  const brands = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  brands.push({ id: Date.now(), name });
  fs.writeFileSync(filePath, JSON.stringify(brands, null, 2));
  return NextResponse.json({ message: "Brand added" });
}
