import connection from "../models/db.js";
import jwt from "jsonwebtoken";
import path from "path";
import jwtSecret from "../config/jwtConfig.js";

export const uploadFile = async (req, res) => {
    console.log("Utilisateur authentifié (userId):", req.userId);
    console.log("Fichier reçu :", req.file);

    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded or file is too large (limit: 2MB)",
        });
    }

    const { originalname, size, filename } = req.file;
    const userId = req.userId;

    try {
        await connection.query(
            "INSERT INTO files (filename, size, user_id) VALUES (?, ?, ?)",
            [filename, size, userId]
        );
        res.status(201).json({
            message: "File uploaded successfully",
            filename,
        });
    } catch (error) {
        console.error("Erreur lors de l'upload du fichier :", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const downloadFile = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const fileId = decoded.fileId;

        const [fileQuery] = await connection.query(
            "SELECT * FROM files WHERE id = ?",
            [fileId]
        );
        if (fileQuery.length === 0) {
            return res.status(404).json({ message: "File not found" });
        }

        const filePath = path.join("/app/src/uploads", fileQuery[0].filename);

        res.download(filePath, fileQuery[0].filename, (err) => {
            if (err) {
                console.error("Erreur lors du téléchargement :", err.message);
                res.status(500).json({ error: "File download failed" });
            }
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const generateShareLink = async (req, res) => {
    const { fileId } = req.params;

    try {
        const [file] = await connection.query(
            "SELECT * FROM files WHERE id = ?",
            [fileId]
        );
        if (file.length === 0) {
            return res.status(404).json({ message: "File not found" });
        }

        const token = jwt.sign({ fileId }, jwtSecret, { expiresIn: "1h" });

        await connection.query(
            "INSERT INTO links (file_id, token) VALUES (?, ?)",
            [fileId, token]
        );

        res.status(200).json({
            shareLink: `http://localhost:8800/files/download/${token}`,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};
