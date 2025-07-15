import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPanel = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from admin panel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("adminToken");
      Swal.fire("Logged Out!", "You have been successfully logged out.", "success");
      navigate("/admin/login");
    }
  };

  const btnStyle = {
    height: "60px",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">
          Welcome to <span style={{ color: '#00D1FF' }}>Metzon Admin</span>
        </h1>
        <p className="text-muted">Manage your blogs and products easily</p>
      </div>

      <div className="row g-4 justify-content-center">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <button
            className="btn btn-primary w-100"
            style={btnStyle}
            onClick={() => navigate("/admin/add-blog")}
          >
            ➕ Add Blog
          </button>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <button
            className="btn btn-warning w-100 text-white"
            style={btnStyle}
            onClick={() => navigate("/admin/manage")}
          >
            🛠️ Manage Products
          </button>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <button
            className="btn btn-info w-100 text-white"
            style={btnStyle}
            onClick={() => navigate("/admin/blogs")}
          >
            📝 Manage Blogs
          </button>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <button
            className="btn btn-danger w-100"
            style={btnStyle}
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
