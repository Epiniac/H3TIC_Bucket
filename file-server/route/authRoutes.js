import express from "express";
import { register, login, hello } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/test", hello);

export default router;
