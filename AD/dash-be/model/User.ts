import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        password: { type: String },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
        },
        phoneNumber: { type: Number },
        email: { type: String },
        joinDate: { type: Date },
        skills: [{
            skill: String,
            level: String,
        }],
        image: { type: String },
    },
    {
        collection: "users",
    }
);

const User = mongoose.model("User", userSchema, "users");
export default User;


