import mongoose from "mongoose";
import { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    payment: { type: Number, required: true },
    details: [String],
    date: { type: Date, default: Date.now }, // could use moment npm later
  },
  {
    collection: "jobs",
  }
);

const Job = mongoose.model("job", jobSchema, "jobs");

export default Job;
