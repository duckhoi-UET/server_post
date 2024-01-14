import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: String, require: true },
    brand: { type: String, require: true, default: "0" },
    images: { type: Array, default: [] },
    category: { type: String, default: "" },
    stock: { type: String, default: "" },
    status: { type: String, default: "" },
    content: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

export const ProductsModel = mongoose.model("Products", schema);
