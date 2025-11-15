import { writeFile } from "@/utils/fileOperations";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = file.name;
    writeFile(filename, buffer);

    return NextResponse.json({ message: "Uploaded", filename });
}
