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
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (!response.data.fileId) {
                console.error("No fileId received from backend");
                setMessage("Upload successful, but fileId missing.");
                return;
            }

            const uploadedFile = {
                id: response.data.fileId, // Assurez-vous que fileId est présent ici
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
            uploadFile(newFile);
        }
    };

    const handleDeleteFile = async (fileId) => {
        if (!fileId) {
            console.error("No fileId provided for deletion");
            setMessage("Failed to delete file: missing fileId");
            return;
        }

        console.log("Attempting to delete file with ID:", fileId);

        try {
            const response = await axiosInstance.delete(
                `/files/delete/${fileId}`
            );
            console.log("Delete response:", response);

            setFiles((prevFiles) =>
                prevFiles.filter((file) => file.id !== fileId)
            );
            setMessage("File deleted successfully");
        } catch (error) {
            console.error("Failed to delete file", error);
            setMessage("Failed to delete file");
        }
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
                    <div key={file.id || file.fileName} className="file-item">
                        <p className="file-name">{file.fileName}</p>
                        <p className="file-size">{file.fileSize}</p>
                        <button
                            className="delete-btn"
                            onClick={() => handleDeleteFile(file.id)} // Utilisation de file.id ici
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
