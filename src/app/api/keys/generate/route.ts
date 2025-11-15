import { NextResponse } from "next/server";
import { generateRSAKeys } from "@/crypto/rsa";
import { writeFile } from "@/utils/fileOperations";
import { generateAESKey } from "@/crypto/aes";

export async function GET() {
    const aesKey = generateAESKey();
    const { publicKey, privateKey } = generateRSAKeys();

    writeFile("tajni_kljuc.txt", aesKey.toString("hex"));
    writeFile("javni_kljuc.txt", publicKey);
    writeFile("privatni_kljuc.txt", privateKey);

    return NextResponse.json({ message: "Keys generated" });
}
