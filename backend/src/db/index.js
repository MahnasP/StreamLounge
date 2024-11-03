import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("connected to DB");
    } catch (error) {
        console.log("MongoDB connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;