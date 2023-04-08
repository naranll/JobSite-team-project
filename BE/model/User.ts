import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  gender: {
    type: String,
    enum: ["male", "female", "rather not say"],
    required: true,
  },
  join_date: {
    type: Date,
    default: Date.now,
  },
  phone_number: Number,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  applied_jobs: [String],
  posted_jobs: [String],
  skills: {
    type: Schema.Types.Array, // or String
    ref: "skill",
  },
  image: String,
});

const User = mongoose.model("user", UserSchema, "users");

export default User;
