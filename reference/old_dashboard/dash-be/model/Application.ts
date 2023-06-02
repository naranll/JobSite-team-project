import mongoose, { Schema } from "mongoose";

const applicationSchema: Schema = new mongoose.Schema(
    {
        jobId: {
            type: Schema.Types.ObjectId,
            ref: "jobs"
        },
        applicantId: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        state: {
            type: String,
            enum: ["active", "inactive"]
        }
    },
    {
        collection: "applications",
    }
);

const Application = mongoose.model("Application", applicationSchema, "applications");
export default Application;


