import express from "express";
import fileRoutes from "./route/fileRoutes.js";
import authRoutes from "./route/authRoutes.js";
import fs from "fs";
import path from "path";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;

const uploadDir = path.join("src", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Dossier 'uploads' créé dans 'src/'.");
} else {
    console.log("Dossier 'uploads' déjà présent.");
}

app.use(express.json());

app.use("/files", fileRoutes);
app.use("/auth", authRoutes);

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port} vroum vroum`);
});
