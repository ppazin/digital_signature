import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: { path: string[] } }
) {
  const params = context.params;

  if (!params?.path) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "data", ...params.path);
  console.log("Serving file from path:", filePath);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const file = fs.readFileSync(filePath);

  return new Response(file, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${params.path.at(-1)}"`,
    },
  });
}
