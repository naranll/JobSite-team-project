import mongoose from "mongoose";
import { Schema } from "mongoose";
import "../config/mongo-config";

const UserSchema: Schema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    phoneNumber: { type: Number, unique: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    skills: [{ skill: String, level: String }],
    image: String,
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("user", UserSchema, "users");

export default User;
