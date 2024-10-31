import React, { createContext, useState, useEffect } from "react";
import { isAuthenticated, setToken, removeToken } from "../utils/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

    useEffect(() => {
        setIsLoggedIn(isAuthenticated());
    }, []);

    const login = (token) => {
        setToken(token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        removeToken();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
