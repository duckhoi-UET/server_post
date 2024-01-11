import express from "express";
import {
  login,
  getInfoUser,
  register,
  forgotPassword,
  resetPassword,
  checkTokenExpire,
  logout,
  changePassword,
} from "../controllers/auth.js";
import { checkToken } from "../middleware/checkToken.js";
import { checkSignUp } from "../middleware/checkSignUp.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/register", checkSignUp, register);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/check-token-expire", checkTokenExpire);
router.post("/change-password", auth, changePassword);
router.get("/me", checkToken, getInfoUser);

export default router;
