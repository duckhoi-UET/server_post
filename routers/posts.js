import express from "express";
import { getPosts, createPost, updatePost } from "../controllers/posts.js";

const router = express.Router();

router.post("/create", createPost);
router.post("/:id", updatePost);
router.get("/", getPosts);

export default router;
