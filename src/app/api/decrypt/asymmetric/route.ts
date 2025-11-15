import { NextResponse } from "next/server";
import { decryptRSA } from "@/crypto/rsa";
import { readFile, writeFile } from "@/utils/fileOperations";

export async function POST(req: Request) {
    const { filename } = await req.json();

    const privateKey = readFile("privatni_kljuc.txt").toString();

    const encrypted = readFile("encrypted_asymmetric.bin");

    const decrypted = decryptRSA(encrypted, privateKey);

    writeFile(`decrypted_${filename}`, decrypted);

    return NextResponse.json({
        message: `Asymmetric decryption completed → decrypted_${filename}`,
    });
}
