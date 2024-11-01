import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8800/auth/login",
                {
                    username,
                    password,
                }
            );
            login(response.data.token);
            navigate("/upload");
        } catch (error) {
            setMessage(error.response?.data?.message || "Error logging in");
        }
    };

    return (
        <div className="theme">
            <div>
                <h2>LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">
                        Login
                    </button>
                    <p>
                        Don't have an account? Create one{" "}
                        <Link to="/">here</Link>
                    </p>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default Login;
