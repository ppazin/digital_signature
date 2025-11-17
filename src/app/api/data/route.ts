import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const basePath = path.join(process.cwd(), "data"); 

  try {
    const files = fs.readdirSync(basePath);

    return NextResponse.json({
      files: files.map((f) => ({
        name: f,
        url: `/data/${f}`
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to list files" },
      { status: 500 }
    );
  }
}
