import { NextResponse } from "next/server";
import { generateRSAKeys } from "@/crypto/rsa";
import { writeFile } from "@/utils/fileOperations";

export async function GET() {
    const { publicKey, privateKey } = generateRSAKeys();

    writeFile("javni_kljuc.txt", publicKey);
    writeFile("privatni_kljuc.txt", privateKey);

    return NextResponse.json({ message: "Keys generated" });
}
