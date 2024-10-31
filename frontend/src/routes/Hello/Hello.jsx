import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../utils/Auth";

function Hello() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const token = getToken();
        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get("http://localhost:8800/auth/test", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          removeToken();
          navigate("/");
        } else {
          setMessage("Failed to fetch message");
        }
      }
    };
    fetchMessage();
  }, [navigate]);

  return (
    <div>
      <h2>teststestst</h2>
      <h2>{message}</h2>
    </div>
  );
}

export default Hello;
