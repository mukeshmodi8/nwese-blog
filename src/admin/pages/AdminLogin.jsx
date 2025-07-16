import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

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
        title: "Login Successful 🎉",
        text: "Welcome Mr. Happy!",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/admin/dashboard");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials ❌",
        text: "Please enter correct email & password",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2 className="mb-4 text-center">🔐 Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <div style={{ display: "flex" }}>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-secondary ms-2"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
