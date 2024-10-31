import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./FileInfo.css";

const FileInfo = () => {
    const location = useLocation();
    const initialFile = location.state || {};
    const [files, setFiles] = useState(initialFile ? [initialFile] : []);
    const [message, setMessage] = useState("");

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axiosInstance.post(
                "/files/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const uploadedFile = {
                id: response.data.fileId,
                fileName: file.name,
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
            // Appel à la fonction d'upload du fichier
            uploadFile(newFile);
        }
    };

    // Suppression d'un fichier localement
    const handleDeleteFile = (fileName) => {
        setFiles((prevFiles) =>
            prevFiles.filter((file) => file.fileName !== fileName)
        );
    };

    return (
        <div className="file-info-container">
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
                        <p className="file-name">{file.fileName}</p>
                        <p className="file-size">{file.fileSize}</p>
                        <button
                            className="delete-btn"
                            onClick={() => handleDeleteFile(file.fileName)}
                        >
                            ❌
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileInfo;
