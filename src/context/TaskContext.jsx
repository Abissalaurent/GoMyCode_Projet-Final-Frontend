import React, {createContext, useState, useEffect, useContext} from "react";
import API from "../services/api";
import {AuthContext} from "./AuthContext";

export const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Ajout des filtres
  const [filters, setFilters] = useState({
    status: "", // ou "completed", "pending"
    search: "",
    sort: "newest",
  });

  const {isAuthenticated} = useContext(AuthContext);

  const fetchTasks = React.useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token d'authentification manquant");
      }

      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors du chargement des tâches"
      );
      console.error("Erreur lors du chargement des tâches:", err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const addTask = async (taskData) => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token d'authentification manquant");

      const res = await API.post("/tasks", taskData);
      setTasks([res.data, ...tasks]);
      return {success: true, data: res.data};
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Erreur lors de la création";
      setError(errorMessage);
      console.error("Erreur lors de la création de la tâche:", err);
      return {success: false, message: errorMessage};
    }
  };

  const updateTask = async (id, taskData) => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token d'authentification manquant");

      const res = await API.put(`/tasks/${id}`, taskData);
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      return {success: true, data: res.data};
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Erreur lors de la mise à jour";
      setError(errorMessage);
      console.error("Erreur lors de la mise à jour de la tâche:", err);
      return {success: false, message: errorMessage};
    }
  };

  const deleteTask = async (id) => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token d'authentification manquant");

      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      return {success: true};
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Erreur lors de la suppression";
      setError(errorMessage);
      console.error("Erreur lors de la suppression de la tâche:", err);
      return {success: false, message: errorMessage};
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [isAuthenticated, fetchTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        filters, // ✅ Ajouté
        setFilters, // ✅ Ajouté
        addTask,
        updateTask,
        deleteTask,
        fetchTasks,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
