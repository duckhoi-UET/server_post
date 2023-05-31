import express from "express";
import { createRoom } from "../controllers/rooms.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createRoom);

export default router;
