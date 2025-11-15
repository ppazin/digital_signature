import { NextResponse } from "next/server";
import { signData } from "@/crypto/signature";
import { readFile, writeFile } from "@/utils/fileOperations";

export async function POST(req: Request) {
    const { filename } = await req.json();

    const privateKey = readFile("privatni_kljuc.txt").toString();
    const data = readFile(filename);

    const signature = signData(data, privateKey);
    writeFile("signature.bin", signature);

    return NextResponse.json({ message: "File signed" });
}
