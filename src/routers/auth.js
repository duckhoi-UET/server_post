import express from "express";
import { login, getInfoUser } from "../controllers/auth.js";
import { checkToken } from "../middleware/checkToken.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", checkToken, getInfoUser);

export default router;
