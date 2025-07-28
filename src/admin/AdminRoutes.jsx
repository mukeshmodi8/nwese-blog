import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AddBlog from "./pages/AddBlog";
import ManageProducts from "./pages/ManageProducts";
import ManageBlogs from "./pages/ManageBlogs";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="register" element={<AdminRegister />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="add-blog"
        element={
          <ProtectedRoute>
            <AddBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="manage"
        element={
          <ProtectedRoute>
            <ManageProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="blogs"
        element={
          <ProtectedRoute>
            <ManageBlogs />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
