import express from "express";
import fileRoutes from "./route/fileRoutes.js";
import authRoutes from "./route/authRoutes.js"

const app = express();
const port = 5000;

app.use(express.json());
app.use("files", fileRoutes);
app.use("auth", authRoutes);

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
