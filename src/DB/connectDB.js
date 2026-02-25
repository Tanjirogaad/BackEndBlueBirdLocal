import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}