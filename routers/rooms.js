import express from "express";
import { createRoom, getAll } from "../controllers/rooms.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createRoom);
router.get("/", auth, getAll);

export default router;
