import mongoose from "mongoose";
import config from "./config/config";

export default async() => {
    try {
        await mongoose.connect(config.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            poolSize: 10
        })
        console.log("Database connected!");
    } catch (error) {
        console.log(error);
    }
}