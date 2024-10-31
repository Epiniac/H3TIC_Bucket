import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./FileInfo.css";

const FileInfo = () => {
    const location = useLocation();
    const initialFile = location.state || {};
    const [files, setFiles] = useState(initialFile ? [initialFile] : []);
    const [message, setMessage] = useState("");
    const [linkNames, setLinkNames] = useState({});
    const [shareLinks, setShareLinks] = useState({});

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axiosInstance.post(
                "/files/upload",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (!response.data.fileId) {
                console.error("No fileId received from backend");
                setMessage("Upload successful, but fileId missing.");
                return;
            }

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
        if (!linkNames[fileId]) {
            setMessage("Please enter a name for the link.");
            return;
        }

        try {
            const response = await axiosInstance.post(
                `/files/share/${fileId}`,
                { linkName: linkNames[fileId] }
            );

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
                        <div className="link-generation">
                            <input
                                type="text"
                                className="link-name-input"
                                placeholder="Enter link name"
                                value={linkNames[file.id] || ""}
                                onChange={(e) =>
                                    setLinkNames((prev) => ({
                                        ...prev,
                                        [file.id]: e.target.value,
                                    }))
                                }
                            />
                            <button
                                className="generate-link-btn"
                                onClick={() => generateShareLink(file.id)}
                            >
                                Generate Link
                            </button>
                        </div>
                        {shareLinks[file.id] && (
                            <div className="share-link-result">
                                <strong>Download Link:</strong>{" "}
                                <a
                                    href={shareLinks[file.id]}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
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
