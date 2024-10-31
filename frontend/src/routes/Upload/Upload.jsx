import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./UploadFile.css";

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            await handleUpload(selectedFile);
        }
    };

    const handleUpload = async (selectedFile) => {
        if (!selectedFile) {
            setMessage("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

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

            setMessage(response.data.message || "File uploaded successfully");

            // Rediriger vers la page FileInfo en passant les détails du fichier
            navigate("/file-info", {
                state: {
                    fileName: selectedFile.name,
                    fileSize: (selectedFile.size / 1024).toFixed(2) + " KB",
                },
            });
        } catch (error) {
            setMessage(error.response?.data?.message || "File upload failed");
        }
    };

    return (
        <div className="upload-container">
            <form className="upload-form">
                <label htmlFor="file-upload" className="upload-button">
                    <span>Démarrer</span>
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileChange}
                    />
                </label>
            </form>
            {message && <p className="upload-message">{message}</p>}
        </div>
    );
};

export default UploadFile;
