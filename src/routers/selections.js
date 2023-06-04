import express from "express";

import { auth } from "../middleware/auth.js";
import { selectionRoom } from "../controllers/selections.js";

const router = express.Router();

router.get("/rooms", auth, selectionRoom);

export default router;
