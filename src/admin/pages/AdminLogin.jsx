import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, EyeOff, Lock, Mail, UserCircle2 } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const correctEmail = "mvmodi.2014@gmail.com";
  const correctPassword = "mvmodi@2014";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === correctEmail && password === correctPassword) {
      localStorage.setItem("adminToken", "secret123");

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Login Successful, Mr. Happy!",
        confirmButtonColor: "#0d6efd",
      }).then(() => {
        navigate("/admin/dashboard");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Invalid credentials. Check again!",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ 
        backgroundColor: "#f8fafc",
        backgroundImage: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
      }}
    >
      <div 
        className="card border-0 shadow-sm w-100 mx-3" 
        style={{ 
          maxWidth: "400px", 
          borderRadius: "24px",
          padding: "20px"
        }}
      >
        <div className="card-body p-4">
          {/* Header Section */}
          <div className="text-center mb-5">
            <div 
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{ 
                width: "64px", 
                height: "64px", 
                backgroundColor: "#f1f5f9", 
                borderRadius: "16px",
                color: "#0f172a" 
              }}
            >
              <UserCircle2 size={40} strokeWidth={1.5} />
            </div>
            <h3 className="fw-bold text-dark mb-1">Admin Login</h3>
            <p className="text-muted small">Enter your details to manage your store</p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-secondary ms-1">EMAIL</label>
              <div className="input-group bg-light border-0 rounded-3 p-1">
                <span className="input-group-text bg-transparent border-0 text-muted">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  className="form-control bg-transparent border-0 py-2 shadow-none"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary ms-1">PASSWORD</label>
              <div className="input-group bg-light border-0 rounded-3 p-1">
                <span className="input-group-text bg-transparent border-0 text-muted">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control bg-transparent border-0 py-2 shadow-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn bg-transparent border-0 text-muted"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="text-end mb-4">
              <a href="#" className="text-decoration-none small fw-medium text-primary">Forgot?</a>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className="btn btn-dark w-100 py-3 shadow-sm border-0 transition-all"
              style={{ 
                borderRadius: "14px",
                backgroundColor: "#0f172a",
                fontSize: "15px",
                fontWeight: "600"
              }}
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-5 text-muted small">
            © 2026 Secured System
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;