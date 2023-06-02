import mongoose, { Schema } from "mongoose";

const jobSchema: Schema = new mongoose.Schema(
    {
        posted_by: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        title: { type: String },
        description: { type: String },
        requirement: { type: String },
        state: {
            type: String,
            enum: ["active", "paused", "finished"],
            default: "active",
        },
        contract_type: {
            type: String,
            enum: ["type1", "type2", "type3"],
            default: "type1",
        },
        created_date: { type: Date },
        update_date: { type: Date },
        payment: { type: Number },
        category: {
            type: Schema.Types.ObjectId,
            ref: "categories",
        },
        location: {
            city: {
                district: { type: String },
                khoroo: { type: String },
                details: { type: String },
            },
            province: {
                details: { type: String },
            }
        }
    },
    {
        collection: "jobs",
    }
);

const Job = mongoose.model("Job", jobSchema, "jobs");
export default Job;


