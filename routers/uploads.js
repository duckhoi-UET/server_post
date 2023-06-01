import express from "express";
import { uploadImage } from "../controllers/uploads.js";
import { auth } from "../middleware/auth.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload-image", auth, upload.single("file"), uploadImage);

export default router;
