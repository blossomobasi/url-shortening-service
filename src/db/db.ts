import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("<::: Connected to MongoDB :::>");
    } catch (error) {
        console.log("<::: Error Connecting to MongoDB :::>", error);
    }
};

export default connectDB;
