import { NextResponse } from "next/server";
import { encryptAES } from "@/crypto/aes";
import { readFile, writeFile } from "@/utils/fileOperations";

export async function POST(req: Request) {
    const { filename } = await req.json();
    const fileData = readFile(filename);

    const aesKey = Buffer.from(readFile("tajni_kljuc.txt").toString(), "hex");
    const { encrypted, iv, tag } = encryptAES(fileData, aesKey);

    const output = Buffer.concat([iv, tag, encrypted]);

    writeFile("encrypted_symmetric.bin", output);

    return NextResponse.json({ message: "Symmetric encryption completed" });
}
