import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/fileController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "src/uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        console.log("Nom du champ reçu par Multer:", file.fieldname);
        if (file.fieldname === "file") {
            cb(null, true);
        } else {
            cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
        }
    },
});

router.post("/upload", auth, upload.single("file"), uploadFile);

export default router;
