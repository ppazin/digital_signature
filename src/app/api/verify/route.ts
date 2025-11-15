import { NextResponse } from "next/server";
import { verifySignature } from "@/crypto/signature";
import { readFile } from "@/utils/fileOperations";

export async function POST(req: Request) {
  const { filename } = await req.json();

    const publicKey = readFile("javni_kljuc.txt").toString();
    const data = readFile(filename);
    const signature = readFile("signature.bin");

    const valid = verifySignature(data, signature, publicKey);

    return NextResponse.json({ valid });
}
