import { NextResponse } from "next/server";
import { hashData } from "@/crypto/hash";
import { readFile, writeFile } from "@/utils/fileOperations";

export async function POST(req: Request) {
    const { filename } = await req.json();
    const data = readFile(filename);

    const hash = hashData(data);
    writeFile("hash.txt", hash);

  return NextResponse.json({ hash });
}
