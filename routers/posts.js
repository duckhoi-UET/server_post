import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getDetailPost,
} from "../controllers/posts.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createPost);
router.get("/:id", auth, getDetailPost);
router.post("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.get("/", auth, getPosts);

export default router;
