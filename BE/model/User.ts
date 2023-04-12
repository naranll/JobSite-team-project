import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  password: { type: String, required: true },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: false,
  },
  join_date: {
    type: Date,
    default: Date.now,
  },
  phone_number: { type: Number, unique: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  skills: [{ skill: String, level: String }],
  image: String,
});

const User = mongoose.model("user", UserSchema, "users");

export default User;
