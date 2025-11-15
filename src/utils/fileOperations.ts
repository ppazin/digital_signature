import fs from "fs";
import path from "path";

export const dataPath = path.join(process.cwd(), "data");

export function writeFile(name: string, data: Buffer | string) {
    const filePath = path.join(dataPath, name);
    fs.writeFileSync(filePath, data); 
}

export function readFile(name: string): Buffer {
    const filePath = path.join(dataPath, name);
    return fs.readFileSync(filePath);
}
