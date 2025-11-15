import crypto from "crypto";

export const generateAESKey = () => crypto.randomBytes(32);

export function encryptAES(data: Buffer, key: Buffer) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    const tag = cipher.getAuthTag();

    return { encrypted, iv, tag };
}

export function decryptAES(encrypted: Buffer, key: Buffer, iv: Buffer, tag: Buffer) {
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);

    return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}
