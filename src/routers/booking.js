import express from "express";
import { create, getAll, getDetail } from "../controllers/booking.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, create);
router.get("/:id", auth, getDetail);
router.get("/", auth, getAll);

export default router;
