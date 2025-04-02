
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token with the backend
      checkAuthStatus(token);
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async (token) => {
    try {
      // Configure headers with token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, config);
      
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        setIsAdmin(response.data.user.role === 'admin');
      } else {
        // If token is invalid, clear it
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Auth verification error:", error);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem("token", token);
      
      // Update state
      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Login failed" 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, userData);
      
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem("token", token);
      
      // Update state
      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
      
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Registration failed" 
      };
    }
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
