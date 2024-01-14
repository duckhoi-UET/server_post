import express from "express";
import { createProduct, getAll } from "../controllers/products.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createProduct);
// router.patch("/:id", auth, updateRoom);
// router.get("/:id", auth, getDetailRoom);
// router.delete("/:id", auth, deleteRoom);
router.get("/", auth, getAll);

export default router;
