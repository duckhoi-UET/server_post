import express from "express";
import { uploadImage } from "../controllers/uploads.js";
import { auth } from "../middleware/auth.js";
import multer from "multer";

const memoryStorage = multer.memoryStorage();

const upload = multer({ storage: memoryStorage });

const router = express.Router();

router.post("/upload-image", auth, uploadImage);

export default router;
