import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("adminToken"); 

  if (!isLoggedIn) {
    alert("⛔ Unauthorized! Please login first.");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
