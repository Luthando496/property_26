import mongoose from "mongoose";

let connected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery',true);

    if(connected){
        console.log("Already connected to MongoDB...");
        return;
    }

        try {
            await mongoose.connect(process.env.MONGODB_URI);
            connected = true;
            console.log("Connected to MongoDB...");
        } catch (err) {
            console.error("Failed to connect to MongoDB:", err);
            process.exit(1);
        }
}

