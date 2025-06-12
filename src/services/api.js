import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, 
  timeout: 20000, // ⏱️ Timeout de 20 secondes max
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Optionnel, à activer si tu utilises des cookies
});

// src/services/api.js
export const updateUserProfile = async (userData) => {
  try {
    const response = await API.put("/users/profile", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || {message: "Erreur lors de la mise à jour"};
  }
};

// Intercepteur pour ajouter le token JWT aux requêtes
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et les erreurs
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
