import { NextResponse } from "next/server";
import { encryptRSA } from "@/crypto/rsa";
import { readFile, writeFile } from "@/utils/fileOperations";

export async function POST(req: Request) {
    const { filename } = await req.json();

    const publicKey = readFile("javni_kljuc.txt").toString();
    const fileData = readFile(filename);

    const encrypted = encryptRSA(fileData, publicKey);

    writeFile("encrypted_asymmetric.bin", encrypted);

    return NextResponse.json({ message: "Asymmetric encryption completed." });
}
