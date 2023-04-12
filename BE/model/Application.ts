import mongoose from "mongoose";
import { Schema } from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: Schema.Types.String,
    ref: "job",
  },
  applicant: {
    type: Schema.Types.String,
    ref: "user",
  },
  state: {
    type: String,
    enum: ["active", "inactive"],
  },
});

const Application = mongoose.model(
  "application",
  ApplicationSchema,
  "applications"
);

export default Application;
