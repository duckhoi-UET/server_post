import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    author: { type: String, require: true, default: "Anonymous" },
    attachment: String,
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "posts",
  }
);

export const PostsModel = mongoose.model("Posts", schema);
