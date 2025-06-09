import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {TaskProvider} from "./context/TaskContext";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile"; // ✅ Correction ici
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks"; // ✅ Correction ici
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="container mt-4 flex-grow-1">
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Routes privées (protégées) */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Route fallback 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
