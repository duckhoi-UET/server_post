import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullName: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, require: true, default: "0" },
    identificationNumber: { type: String, require: true, default: "" },
    status: { type: String },
    bookFrom: { type: String, default: "" },
    bookTo: { type: String, default: "" },
    numberRoom: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "booking",
  }
);

export const BookingModel = mongoose.model("Booking", schema);
