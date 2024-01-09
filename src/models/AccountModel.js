import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    fullName: { type: String, require: true },
    avatar: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "accounts",
  }
);

export const AccountModel = mongoose.model("accounts", schema);
