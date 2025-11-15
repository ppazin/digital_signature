import crypto from "crypto";

export function signData(data: Buffer, privateKey: string): Buffer {
    const sign = crypto.createSign("SHA256");
    sign.update(data);
    sign.end();
    return sign.sign(privateKey);
}

export function verifySignature(data: Buffer, signature: Buffer, publicKey: string) {
    const verify = crypto.createVerify("SHA256");
    verify.update(data);
    verify.end();
    return verify.verify(publicKey, signature);
}
