import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: String, require: true },
    discount: { type: String, require: true, default: "0" },
    images: { type: Array, default: [] },
    persons: {
      type: Number,
      default: 0,
    },
    status: { type: String },
    content: { type: String, default: "" },
    number: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "rooms",
  }
);

export const RoomsModel = mongoose.model("Rooms", schema);
