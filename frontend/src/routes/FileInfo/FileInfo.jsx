import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import "./FileInfo.css";

const FileInfo = () => {
    const location = useLocation();
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState("");
    const [shareLinks, setShareLinks] = useState({});

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axiosInstance.get("/files/user-files");
                const formattedFiles = response.data.files.map((file) => ({
                    ...file,
                    fileName: file.filename,
                    fileSize: (file.size / 1024).toFixed(2) + " KB",
                }));
                setFiles(formattedFiles);
            } catch (error) {
                setMessage("Échec de la récupération des fichiers");
                console.error("Échec de la récupération des fichiers", error);
            }
        };

        fetchFiles();
    }, []);

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axiosInstance.post(
                "/files/upload",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const uploadedFile = {
                id: response.data.fileId,
                fileName: response.data.filename,
                fileSize: (file.size / 1024).toFixed(2) + " KB",
            };

            setFiles((prevFiles) => [...prevFiles, uploadedFile]);
            setMessage("Fichier téléversé avec succès");
        } catch (error) {
            setMessage("Échec du téléversement du fichier");
            console.error("Échec du téléversement du fichier", error);
        }
    };

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            uploadFile(newFile);
        }
    };

    const handleDeleteFile = async (fileId) => {
        if (!fileId) {
            console.error("Aucun fileId fourni pour la suppression");
            setMessage("Échec de la suppression du fichier : fileId manquant");
            return;
        }

        try {
            await axiosInstance.delete(`/files/delete/${fileId}`);
            setFiles((prevFiles) =>
                prevFiles.filter((file) => file.id !== fileId)
            );
            setMessage("Fichier supprimé avec succès");
        } catch (error) {
            console.error("Échec de la suppression du fichier", error);
            setMessage("Échec de la suppression du fichier");
        }
    };

    const generateShareLink = async (fileId) => {
        try {
            const response = await axiosInstance.post(`/files/share/${fileId}`);
            setShareLinks((prevLinks) => ({
                ...prevLinks,
                [fileId]: response.data.shareLink,
            }));
            setMessage("Lien généré avec succès");
        } catch (error) {
            console.error("Échec de la génération du lien de partage", error);
            setMessage("Échec de la génération du lien de partage");
        }
    };

    return (
        <div className="file-info-container">
            <div className="logout-button-container">
                <LogoutButton />
            </div>
            <div className="file-info-header">
                <p>{files.length} fichier(s)</p>
                <label htmlFor="add-file" className="add-file-button">
                    <span>+</span>
                    <input
                        type="file"
                        id="add-file"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </label>
            </div>
            {message && <p className="upload-message">{message}</p>}
            <div className="file-list">
                {files.map((file) => (
                    <div key={file.id} className="file-item">
                        <div className="file-details">
                            <p className="file-name">
                                <strong>Nom du fichier :</strong>{" "}
                                {file.fileName}
                            </p>
                            <p className="file-size">
                                <strong>Taille :</strong> {file.fileSize}
                            </p>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteFile(file.id)}
                            >
                                ❌ Supprimer
                            </button>
                        </div>
                        <button
                            className="generate-link-btn"
                            onClick={() => generateShareLink(file.id)}
                        >
                            Générer un lien
                        </button>
                        {shareLinks[file.id] && (
                            <div className="share-link-result">
                                <strong>Lien de téléchargement :</strong>{" "}
                                <a
                                    href={shareLinks[file.id]}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link-text"
                                >
                                    {shareLinks[file.id]}
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileInfo;
