import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPanel = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken"); // ✅ correct token key
    navigate("/admin/login");
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">
          Welcome to <span style={{ color: '#00D1FF' }}>Metzon Admin</span>
        </h1>
        <p className="text-muted">Manage your products and blogs easily</p>
      </div>

      <div className="row justify-content-center gap-3">
        <div className="col-12 col-md-3">
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/admin/add-blog")} // ✅ updated route
          >
            ➕ Add Blog
          </button>
        </div>
        <div className="col-12 col-md-3">
          <button
            className="btn btn-warning w-100"
            onClick={() => navigate("/admin/manage")}
          >
            🛠️ Manage Products
          </button>
        </div>
        <div className="col-12 col-md-3">
          <button
            className="btn btn-info w-100"
            onClick={() => navigate("/admin/blogs")}
          >
            📝 Manage Blogs
          </button>
        </div>
        <div className="col-12 col-md-3">
          <button
            className="btn btn-danger w-100"
            onClick={logout}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
