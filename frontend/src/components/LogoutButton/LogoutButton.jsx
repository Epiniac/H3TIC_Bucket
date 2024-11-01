import React from "react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;
