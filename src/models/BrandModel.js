import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    status: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "brand",
  }
);

export const BrandModel = mongoose.model("Brand", schema);
