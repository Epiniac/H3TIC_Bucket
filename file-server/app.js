import express from "express";
import fileRoutes from "./route/fileRoutes.js";
import authRoutes from "./route/authRoutes.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/files", fileRoutes);
app.use("/auth", authRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running now vroum vroum`);
});
