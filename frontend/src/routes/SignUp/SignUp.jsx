import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css"
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Both fields are required");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8800/auth/register", {
        username,
        password,
      });
      setMessage(response.data.message);
      setIsLoading(false);
      navigate("/hello");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error registering user");
      setIsLoading(false);
    }
  };

  return (
    <div className="header">
      <div>
        <h2 className="signtitle">REGISTER</h2>
        <form className="article" onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          <p>Already have an account? Log-in <a href="/login">here</a></p>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Register;
