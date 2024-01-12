import express from "express";
import { uploadImage } from "../controllers/uploads.js";
import { auth } from "../middleware/auth.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

const router = express.Router();

// router.post("/upload-image", auth, uploadImage);

router.post("/upload-image", auth, upload.single("file"), uploadImage);

export default router;
