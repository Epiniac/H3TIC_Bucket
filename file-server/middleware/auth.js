import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res
            .status(403)
            .json({ message: "Access forbidden: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Ajoute l'ID de l'utilisateur à `req`
        next();
    } catch (error) {
        console.error("Erreur d'authentification :", error.message);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
