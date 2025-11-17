import { NextResponse } from "next/server";
import { writeFile } from "@/utils/fileOperations";
import { generateAESKey } from "@/crypto/aes";

export async function GET() {
    const aesKey = generateAESKey();

    writeFile("tajni_kljuc.txt", aesKey.toString("hex"));

    return NextResponse.json({ message: "Keys generated" });
}
