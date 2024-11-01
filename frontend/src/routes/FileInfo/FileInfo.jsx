import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import "./FileInfo.css";

const FileInfo = () => {
    const location = useLocation();
    const initialFile = location.state || {};
    const [files, setFiles] = useState(initialFile ? [initialFile] : []);
    const [message, setMessage] = useState("");
    const [shareLinks, setShareLinks] = useState({});

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axiosInstance.get("/files/user-files");
                const fetchedFiles = response.data.files.map((file) => ({
                    id: file.id,
                    fileName: file.filename, // Assurez-vous d'utiliser les champs retournés par le backend
                    fileSize: (file.size / 1024).toFixed(2) + " KB", // Convertir en Ko si nécessaire
                }));
                setFiles(fetchedFiles);
            } catch (error) {
                setMessage("Failed to fetch files");
                console.error("Failed to fetch files", error);
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
            setMessage("File uploaded successfully");
        } catch (error) {
            setMessage("Failed to upload file");
            console.error("Failed to upload file", error);
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
            console.error("No fileId provided for deletion");
            setMessage("Failed to delete file: missing fileId");
            return;
        }

        try {
            await axiosInstance.delete(`/files/delete/${fileId}`);
            setFiles((prevFiles) =>
                prevFiles.filter((file) => file.id !== fileId)
            );
            setMessage("File deleted successfully");
        } catch (error) {
            console.error("Failed to delete file", error);
            setMessage("Failed to delete file");
        }
    };

    const generateShareLink = async (fileId) => {
        try {
            const response = await axiosInstance.post(`/files/share/${fileId}`);
            setShareLinks((prevLinks) => ({
                ...prevLinks,
                [fileId]: response.data.shareLink,
            }));
            setMessage("Link generated successfully");
        } catch (error) {
            console.error("Failed to generate share link", error);
            setMessage("Failed to generate share link");
        }
    };

    return (
        <div className="file-info-container">
            <div className="logout-button-container">
                <LogoutButton />
            </div>
            <div className="file-info-header">
                <p>{files.length} file(s)</p>
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
                                <strong>File Name:</strong> {file.fileName}
                            </p>
                            <p className="file-size">
                                <strong>Size:</strong> {file.fileSize}
                            </p>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteFile(file.id)}
                            >
                                ❌ Delete
                            </button>
                        </div>
                        <button
                            className="generate-link-btn"
                            onClick={() => generateShareLink(file.id)}
                        >
                            Generate Link
                        </button>
                        {shareLinks[file.id] && (
                            <div className="share-link-result">
                                <strong>Download Link:</strong>{" "}
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
