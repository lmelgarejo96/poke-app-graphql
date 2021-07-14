import File from "../models/File";

export const getById = async(fileId) => {
    try {
        const FileFounded = await File.findOne({ _id: fileId });
        return { message: "File founded!", status: true, data: FileFounded };
    } catch (error) {
        return { message: error.message || error, status: false, data: null };
    }
}

export const createFile = async({ filename, size, mimetype }) => {
    try {
        const NewFile = new File({
            filename: filename || "",
            size: size || 0,
            mimetype: mimetype || ""
        })

        const FileSaved = await NewFile.save();
        if (!FileSaved) return { message: "File could not be saved", status: false, data: null };
        return { message: "File Saved!", status: true, data: FileSaved };
    } catch (error) {
        return { message: error.message || error, status: false, data: null };
    }
}

export const deleteFile = async(fileId) => {
    try {
        await File.deleteOne({ _id: fileId });
        return { message: "File removed!", status: true, data: null };
    } catch (error) {
        return { message: error.message || error, status: false, data: null };
    }
}