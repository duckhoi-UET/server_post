import express from "express";
import {
  createRoom,
  deleteRoom,
  getAll,
  getDetailRoom,
  updateRoom,
} from "../controllers/rooms.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createRoom);
router.patch("/:id", auth, updateRoom);
router.get("/:id", auth, getDetailRoom);
router.delete("/:id", auth, deleteRoom);
router.get("/", auth, getAll);

export default router;
