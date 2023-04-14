import mongoose, { Schema } from "mongoose";

const categorySchema: Schema = new mongoose.Schema(
    {
        name: { type: String },
    },
    {
        collection: "categories",
    }
);

const Category = mongoose.model("Application", categorySchema, "applications");
export default Category;


