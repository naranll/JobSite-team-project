import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    collection: "categories",
  }
);

const Category = mongoose.model("category", CategorySchema, "categories");

export default Category;
