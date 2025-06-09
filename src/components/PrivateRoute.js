// src/components/PrivateRoute.jsx
import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";

const PrivateRoute = () => {
  const {isAuthenticated, loading} = useContext(AuthContext);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
