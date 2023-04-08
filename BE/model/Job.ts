import mongoose from "mongoose";
import { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    posted_by: {
      type: Schema.Types.String,
      ref: "user",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirement: { type: String, required: true },
    created_date: { type: Date, default: Date.now }, // could use moment npm later
    updated: { type: Date, default: Date.now },
    state: { type: Boolean, default: false },
    contract_type: {
      type: String,
      enum: ["type1", "type2", "type3"],
      default: "type1",
    },
    wage: { type: Number, required: true },
    category: {
      type: Schema.Types.String,
      ref: "category",
    },
    applied: Number,
    location: Object,
  },
  {
    collection: "jobs",
  }
);

const Job = mongoose.model("job", jobSchema, "jobs");

export default Job;
