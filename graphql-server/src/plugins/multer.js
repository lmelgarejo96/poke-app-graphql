import multer from "multer";
import { v4 as uuid } from "uuid"
import path from "path";

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads'),
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname)
        const fileFullName = uuid() + extension;
        cb(null, fileFullName)
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only please!');
    }
}

export default multer({
    storage,
    limits: {
        fields: 5,
        fieldNameSize: 80,
        fieldSize: 20000,
        fileSize: 50000000,
    },
    fileFilter: function(_req, file, cb) {
        checkFileType(file, cb)
    }
});