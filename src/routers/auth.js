import express from "express";
import { login, getInfoUser, register } from "../controllers/auth.js";
import { checkToken } from "../middleware/checkToken.js";
import { checkSignUp } from "../middleware/checkSignUp.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", checkSignUp, register);
router.get("/me", checkToken, getInfoUser);

export default router;
