import { NextResponse } from "next/server";
import { decryptAES } from "@/crypto/aes";
import { readFile, writeFile } from "@/utils/fileOperations";

export async function POST(req: Request) {
    const { filename } = await req.json();

    const aesKey = Buffer.from(readFile("tajni_kljuc.txt").toString(), "hex");

    const trimmedName = filename.split(".")[0];
    const encryptedCombined = readFile(`encrypted_symmetric_${trimmedName}.bin`);

    const iv = encryptedCombined.subarray(0, 12);
    const tag = encryptedCombined.subarray(12, 28);
    const encrypted = encryptedCombined.subarray(28);

    const decrypted = decryptAES(encrypted, aesKey, iv, tag);

    writeFile(`decrypted_symmetric_${filename}`, decrypted);

    return NextResponse.json({
        message: `Symmetric decryption completed → decrypted_symmetric_${filename}`,
    });
}