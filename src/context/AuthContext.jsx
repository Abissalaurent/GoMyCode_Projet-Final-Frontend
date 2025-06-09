import React, { createContext, useState, useEffect, useContext } from "react";
import AuthService from "../services/authService";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Configure le token dans les headers par défaut
          API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          // Récupère l'utilisateur du localStorage
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error(err);
        // En cas d'erreur, on nettoie tout
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const result = await AuthService.login(email, password);
    if (result.success) {
      setUser(result.data.user);
      setIsAuthenticated(true);
    }
    return result;
  };

  const register = async (username, email, password) => {
    return await AuthService.register(username, email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthenticated(false);
  };

  // context/AuthContext.js
  const updateProfile = async (updateData) => {
    try {
      const res = await API.put("/users/profile", updateData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      return {success: true, user: res.data.user};
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Erreur lors de la mise à jour",
      };
    }
  };

  // Ajoutez à la valeur du Provider
  // <AuthContext.Provider
  //   value={{
  //     user,
  //     isAuthenticated,
  //     loading,
  //     login,
  //     register,
  //     logout,
  //     updateProfile,
  //   }}>
  //   {children}
  // </AuthContext.Provider>;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);