import express from "express";

import { auth } from "../middleware/auth.js";
import {
  selectionRoom,
  selectionBrand,
  selectionCategory,
} from "../controllers/selections.js";

const router = express.Router();

router.get("/rooms", auth, selectionRoom);
router.get("/brand", auth, selectionBrand);
router.get("/category", auth, selectionCategory);

export default router;
