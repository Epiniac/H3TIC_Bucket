import express from "express";
import router from "./route/fileRoutes.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use("files", router);

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
