import connection from "../models/db.js";

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
