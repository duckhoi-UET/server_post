import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
    collection: "accounts",
  }
);

export const AccountModel = mongoose.model("accounts", schema);
