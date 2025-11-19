import * as fs from "fs";
import * as path from "path";

export async function DELETE() {
    const dataFolder = path.join(process.cwd(), "data");

    fs.readdir(dataFolder, (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(dataFolder, file), (err: NodeJS.ErrnoException | null) => {
                if (err) throw err;
            });
        }
    });

    return new Response("All files removed", { status: 200 });
}