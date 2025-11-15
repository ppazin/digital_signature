import crypto from "crypto";

export function hashData(data: Buffer) {
    return crypto.createHash("sha256").update(data).digest("hex");
}
