import API from "./api";

const AuthService = {
  // Enregistrement d'un nouvel utilisateur
  register: async (username, email, password) => {
    try {
      const response = await API.post("/auth/register", {
        username,
        email,
        password,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Erreur lors de l'inscription",
        error: error.response?.data,
      };
    }
  },

  // Connexion de l'utilisateur
  login: async (email, password) => {
    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        // Stockage du token dans le localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Configuration du header Authorization pour les requêtes futures
        API.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        return {
          success: true,
          data: response.data,
        };
      } else {
        throw new Error("Token non reçu du serveur");
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Identifiants incorrects",
        error: error.response?.data,
      };
    }
  },

  // Déconnexion de l'utilisateur
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete API.defaults.headers.common["Authorization"];
  },

  // Vérification de l'état d'authentification
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token;
  },

  // Récupération des informations de l'utilisateur connecté
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Vérification du token avec le serveur (optionnel)
  verifyToken: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return false;

      // Vous pouvez implémenter un endpoint /verify-token dans votre backend
      const response = await API.get("/auth/verify-token");
      return response.data.isValid;
    } catch (error) {
      return false;
    }
  },

  // Mise à jour du profil utilisateur (optionnel)
  updateProfile: async (userId, updateData) => {
    try {
      const response = await API.put(`/users/${userId}`, updateData);

      // Mise à jour des données utilisateur dans le localStorage
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Erreur lors de la mise à jour du profil",
        error: error.response?.data,
      };
    }
  },
};

// ✅ Fonction exportée séparément
export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await API.put(`/tasks/${taskId}/status`, {status});
    return {
      success: true,
      task: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Échec de la mise à jour du statut",
      error: error.response?.data,
    };
  }
};

export default AuthService;
