import { Schema, model } from "mongoose";

const FileSchema = new Schema({
    filename: {
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: false
    },
    mimetype: {
        type: String,
        required: false
    },
})

export default model("File", FileSchema);