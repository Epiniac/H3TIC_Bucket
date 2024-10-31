import express from "express";
import fileRoutes from "./route/fileRoutes.js";
import authRoutes from "./route/authRoutes.js";
import fs from "fs";
import cors from "cors"
import path from "path";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;

const uploadDir = path.join("src", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
} else {
    console.log("folder upload is here already !");
}

app.use(cors({
    origin: "http://localhost:6600",
    credentials: true
}));

app.use(express.json());

app.use("/files", fileRoutes);
app.use("/auth", authRoutes);

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port} vroum vroum`);
});
