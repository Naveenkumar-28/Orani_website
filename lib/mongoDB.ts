import mongoose from "mongoose";

const _MONGODB_URL = process.env.MONGODB_URL;


export async function connectToDatabase() {

    if (mongoose.connection.readyState === 1) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        if (!_MONGODB_URL) {
            throw new Error("Please define the MONGODB_URL environment variable.");
        }
        await mongoose.connect(_MONGODB_URL, {
            serverSelectionTimeoutMS: 5000, // Faster fail if unreachable
        });
        console.log("Connected to MongoDB");
    } catch (error) {

        console.error("MongoDB connection error:", error);
    }

}
