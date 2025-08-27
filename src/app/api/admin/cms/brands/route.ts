import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "brands.json");

function readBrands() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading brands.json:", err);
    return [];
  }
}

// GET all brands
export async function GET() {
  try {
    const brands = readBrands();
    return NextResponse.json(brands);
  } catch (err) {
    return NextResponse.json({ error: "Failed to read brands" }, { status: 500 });
  }
}
