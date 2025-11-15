import crypto from "crypto";

export function generateRSAKeys() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: { type: "spki", format: "pem" },
        privateKeyEncoding: { type: "pkcs8", format: "pem" }
    });

    return { publicKey, privateKey };
}

export const encryptRSA = (data: Buffer, publicKey: string) =>
    crypto.publicEncrypt(publicKey, data);

export const decryptRSA = (data: Buffer, privateKey: string) =>
    crypto.privateDecrypt(privateKey, data);
