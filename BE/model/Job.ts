import mongoose from "mongoose";
import { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    posted_by: {
      type: Schema.Types.String,
      ref: "user",
    },
    title: { type: String },
    description: { type: String },
    requirement: { type: String },
    created_date: { type: Date, default: Date.now }, // could use moment npm later
    updated: { type: Date, default: Date.now },
    state: { type: Boolean, default: false },
    contract_type: {
      type: String,
      enum: ["type1", "type2", "type3"],
      default: "type1",
    },
    payment: { type: Number },
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
