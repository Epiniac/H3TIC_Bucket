import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css"
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Both fields are required");
      return;
    }
    if (password !=  repassword) {
      setMessage("Passwords do not match");
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
    <div  className="theme">
      <div>
        <h1>REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <div className="input">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /></div>
          <div className="input">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /></div>
          <div className="input">
          <label>Repeat Password:</label>
          <input
            type="password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            required
          /></div>
          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          <p>Already have an account? Log-in <a href="/login">here</a></p>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
