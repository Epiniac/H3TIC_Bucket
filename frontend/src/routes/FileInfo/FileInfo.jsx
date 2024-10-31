import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FileInfo.css"; // Assurez-vous de créer ce fichier CSS pour styliser la page d'info si nécessaire

const FileInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { fileName, fileSize } = location.state || {};

    if (!fileName || !fileSize) {
        navigate("/");
        return null;
    }

    return (
        <div className="file-info-container">
            <h2>Informations du fichier</h2>
            <p>
                <strong>Nom du fichier:</strong> {fileName}
            </p>
            <p>
                <strong>Taille du fichier:</strong> {fileSize}
            </p>
            <button onClick={() => navigate("/")}>Retour</button>
        </div>
    );
};

export default FileInfo;
