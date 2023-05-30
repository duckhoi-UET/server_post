import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getDetailPost,
} from "../controllers/posts.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/:id", getDetailPost);
router.post("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/", getPosts);

export default router;
