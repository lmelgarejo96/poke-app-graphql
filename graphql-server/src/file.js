import { Router } from "express";
import { createFile, deleteFile, getById } from "./orm/File";
import multer from "./plugins/multer";
import deleteFileFromServer from "./libs/deleteFile";
import path from "path";

const uriUploads = "../../public/uploads/"
const router = Router();

// Upload Files
router.post('/', multer.single('image'), async(req, res) => {
    try {
        if (!req.file) return res.status(404).json({ message: "Provide an Image!", status: false, data: null });
        const result = await createFile(req.file);
        const status = result && result.status ? 200 : 404;
        return res.status(status).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message || error, status: false, data: null });
    }
});

// Remove Files
router.delete('/:fileId', async(req, res) => {
    try {
        const { fileId } = req.params;
        if (!fileId) return res.status(404).json({ message: "Provide an File Id!", status: false, data: null });
        const File = await getById(fileId);
        const uri = path.join(__dirname, `${uriUploads}${File.filename}`)
        await deleteFileFromServer(uri);
        const result = await deleteFile(fileId);
        const status = result && result.status ? 200 : 404;
        return res.status(status).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message || error, status: false, data: null });
    }
});


export default router;