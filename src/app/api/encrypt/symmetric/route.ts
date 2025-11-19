import { NextResponse } from "next/server";
import { encryptAES } from "@/crypto/aes";
import { readFile, writeFile } from "@/utils/fileOperations";

export async function POST(req: Request) {
    const { filename } = await req.json();
    const fileData = readFile(filename);

    const aesKey = Buffer.from(readFile("tajni_kljuc.txt").toString(), "hex");
    const { encrypted, iv, tag } = encryptAES(fileData, aesKey);

    const combined = Buffer.concat([iv, tag, encrypted]);

    const trimmedName = filename.split(".")[0];

    writeFile(`encrypted_symmetric_${trimmedName}.bin`, combined);

    return NextResponse.json({ 
        message: `Symmetric encryption completed → encrypted_symmetric_${trimmedName}.bin` 
    });
}