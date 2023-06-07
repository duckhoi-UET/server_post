import express from "express";
import {
  create,
  deleteBooking,
  getAll,
  getDetail,
  updateBooking,
} from "../controllers/booking.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, create);
router.get("/:id", auth, getDetail);
router.delete("/:id", auth, deleteBooking);
router.patch("/:id", auth, updateBooking);
router.get("/", auth, getAll);

export default router;
