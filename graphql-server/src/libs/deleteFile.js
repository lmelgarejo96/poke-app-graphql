import fs from "fs-extra";

export default async(path) => {
    try {
        if (!path) return true;
        await fs.unlink(path);
        return true;
    } catch (error) {
        return true;
    }
}