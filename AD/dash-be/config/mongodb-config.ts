import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const url = process.env.MONGODB_URL;
const db = mongoose.connect(`${url}`)
    .then((res) => console.log("MongoDB connected"))
    .catch(() => console.log("Database not connected"));

export default mongoose.connection;

