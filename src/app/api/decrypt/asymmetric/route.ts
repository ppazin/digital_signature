import { NextResponse } from "next/server";
import { decryptRSA } from "@/crypto/rsa";
import { readFile, writeFile } from "@/utils/fileOperations";

export async function POST(req: Request) {
    const { filename } = await req.json();

    const privateKey = readFile("privatni_kljuc.txt").toString();

    const trimmedName = filename.split(".")[0];
    const encrypted = readFile(`encrypted_asymmetric_${trimmedName}.bin`);

    const decrypted = decryptRSA(encrypted, privateKey);

    writeFile(`decrypted_asymmetric_${filename}`, decrypted);

    return NextResponse.json({
        message: `Asymmetric decryption completed: decrypted_asymmetric_${filename}`,
    });
}
