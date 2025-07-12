import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../Api/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Login: Save tokens and user info
  const login = async (email, password) => {
    try {
      const response = await api.post("/public/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userEmail", email);

      setUser({ email });
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw new Error("Login failed");
    }
  };

  // Logout: Clear everything
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  // Refresh token function
  const refreshAccessToken = async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (!storedRefreshToken) return;

    try {
      const res = await api.post("/public/refresh", {
        refreshToken: storedRefreshToken,
      });

      const { accessToken } = res.data;
      localStorage.setItem("token", accessToken);
    } catch (err) {
      console.error("Failed to refresh token:", err);
      logout();
    }
  };

  // Rehydrate user + auto-refresh token on load + timer
  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    if (accessToken && email) {
      setUser({ email });
    }

    refreshAccessToken().finally(() => {
      setIsLoading(false);
    });

    const interval = setInterval(() => {
      refreshAccessToken();
    }, 10 * 60 * 1000); // every 10 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, setUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};


