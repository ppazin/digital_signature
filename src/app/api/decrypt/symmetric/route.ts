import { NextResponse } from "next/server";
import { decryptAES } from "@/crypto/aes";
import { readFile, writeFile } from "@/utils/fileOperations";

export async function POST(req: Request) {
    const { filename } = await req.json();

    const aesKey = Buffer.from(readFile("tajni_kljuc.txt").toString(), "hex");

    const encryptedCombined = readFile("encrypted_symmetric.bin");

    const iv = encryptedCombined.slice(0, 12);
    const tag = encryptedCombined.slice(12, 28);
    const encrypted = encryptedCombined.slice(28);

    const decrypted = decryptAES(encrypted, aesKey, iv, tag);

    writeFile(`decrypted_${filename}`, decrypted);

    return NextResponse.json({
        message: `Symmetric decryption completed → decrypted_${filename}`,
    });
}
