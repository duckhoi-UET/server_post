import express from "express";
import { createCategory, getAll } from "../controllers/category.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createCategory);
// router.patch("/:id", auth, updateRoom);
// router.get("/:id", auth, getDetailRoom);
// router.delete("/:id", auth, deleteRoom);
router.get("/", auth, getAll);

export default router;
