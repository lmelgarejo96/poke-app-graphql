import config from "../config";
import defaultImg from "../assets/default.png";
export default (file) => {
    if (!file) return defaultImg;
    if (typeof file == "string") {
        return validateExt(file) ? `${config.HOST_URL}/uploads/${file}` : defaultImg;
    };
    if (typeof file == "object")
        return `${config.HOST_URL}/uploads/${file.filename}`;
    return defaultImg;
};

const extensions = [".jpg", ".jpeg", ".png", ".wepb", ".svg"]

function validateExt(filename) {
    filename = filename.toString().toLowerCase();
    if (filename.indexOf(extensions) > -1) return true;
    return false;
}