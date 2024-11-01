import connection from "../models/db.js";
import jwt from "jsonwebtoken";
import path from "path";
import jwtSecret from "../config/jwtConfig.js";
import bcrypt from "bcrypt";
import fs from "fs";

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
        const [result] = await connection.query(
            "INSERT INTO files (filename, originalname, size, user_id) VALUES (?, ?, ?, ?)",
            [filename, originalname, size, userId]
        );

        const fileId = result.insertId;

        res.status(201).json({
            message: "File uploaded successfully",
            fileId,
            originalname,
            filename,
            size,
        });
    } catch (error) {
        console.error("Erreur lors de l'upload du fichier :", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const downloadFile = async (req, res) => {
    const token = decodeURIComponent(req.params.token);

    try {
        const [link] = await connection.query(
            "SELECT * FROM links WHERE token_hash = ?",
            [token]
        );
        if (link.length === 0) {
            return res.status(404).json({ message: "Invalid or expired link" });
        }

        const decoded = jwt.verify(link[0].token, jwtSecret);
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
        res.status(500).json({ error: "File download failed" });
    }
};

export const generateShareLink = async (req, res) => {
    const { fileId } = req.params;
    const { linkName } = req.body; // Récupère le nom du lien depuis le frontend

    try {
        const [file] = await connection.query(
            "SELECT * FROM files WHERE id = ?",
            [fileId]
        );
        if (file.length === 0) {
            return res.status(404).json({ message: "File not found" });
        }

        const token = jwt.sign({ fileId }, jwtSecret, { expiresIn: "1h" });

        const hashedToken = await bcrypt.hash(token, 10);

        await connection.query(
            "INSERT INTO links (file_id, token, token_hash, link_name) VALUES (?, ?, ?, ?)",
            [fileId, token, hashedToken, linkName]
        );

        res.status(200).json({
            shareLink: `http://localhost:8800/files/download/${encodeURIComponent(
                hashedToken
            )}`,
            linkName,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const deleteFile = async (req, res) => {
    const { fileId } = req.params;
    const userId = req.userId;

    try {
        const [fileQuery] = await connection.query(
            "SELECT * FROM files WHERE id = ? AND user_id = ?",
            [fileId, userId]
        );

        if (fileQuery.length === 0) {
            return res
                .status(404)
                .json({ message: "File not found or unauthorized" });
        }

        const filename = fileQuery[0].filename;
        const filePath = path.join("/app/src/uploads", filename);

        await connection.query(
            "DELETE FROM files WHERE id = ? AND user_id = ?",
            [fileId, userId]
        );

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(
                    "Erreur lors de la suppression du fichier physique :",
                    err.message
                );
                return res.status(500).json({
                    message: "File record deleted, but file deletion failed",
                });
            }
            res.status(200).json({ message: "File deleted successfully" });
        });
    } catch (error) {
        console.error(
            "Erreur lors de la suppression du fichier :",
            error.message
        );
        res.status(500).json({ error: error.message });
    }
};

// Fichier backend pour obtenir les fichiers d'un utilisateur spécifique
export const getUserFiles = async (req, res) => {
    const userId = req.userId; // Assurez-vous que `userId` provient de l'authentification JWT

    try {
        const [files] = await connection.query(
            "SELECT id, filename, size FROM files WHERE user_id = ?",
            [userId]
        );
        res.status(200).json({ files });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des fichiers :",
            error.message
        );
        res.status(500).json({
            message: "Échec de la récupération des fichiers",
        });
    }
};
