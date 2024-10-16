import mongoose, { Schema } from "mongoose";
import { generateShortenedURL } from "../utils";

interface IURL extends Document {
    originalUrl: string;
    shortenedUrl: string;
    clicks: number;
}

const urlSchema = new Schema<IURL>(
    {
        originalUrl: {
            type: String,
            required: [true, "URL is required"],
        },
        shortenedUrl: {
            type: String,
            require: [true, "Shortened URL is required"],
            default: generateShortenedURL,
        },
        clicks: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const URL = mongoose.model<IURL>("URL", urlSchema);

export default URL;
