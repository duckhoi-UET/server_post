import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    status: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "category",
  }
);

export const CategoryModel = mongoose.model("Category", schema);
