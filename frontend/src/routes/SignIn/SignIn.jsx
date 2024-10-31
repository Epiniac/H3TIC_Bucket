import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/Auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/auth/login", {
        username,
        password,
      });
      setToken(response.data.token);
      navigate("/hello");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="theme">
      <div>
        <h1>LOGIN</h1>
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
          <button className="button" type="submit">Login</button>
          <p>Don't have an account? Create one <a href="/register">here</a></p>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
