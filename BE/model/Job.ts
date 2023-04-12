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
    state: {
      type: String,
      enum: ["active", "pause", "finished"],
      default: "active",
    },
    contract_type: {
      type: String,
      enum: ["part-time", "full-time"],
      default: "part-time",
    },
    wage: { type: Number },
    category: {
      type: Schema.Types.String,
      ref: "category",
    },

    address: {
      city: {
        district: String,
        khoroo: String,
        details: String,
      },
      province: { details: String },
    },
  },
  {
    collection: "jobs",
  }
);

const Job = mongoose.model("job", jobSchema, "jobs");

export default Job;
