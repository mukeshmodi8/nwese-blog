import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (email && password) {
      localStorage.setItem("adminEmail", email);
      localStorage.setItem("adminPassword", password);
      alert("✅ Admin registered successfully!");
      navigate("/admin/login");
    } else {
      alert("❌ Please fill all fields");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">📝 Admin Register</h3>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success w-100" onClick={handleRegister}>
          Register
        </button>
        <p className="mt-3 text-center text-muted">
          Already have an account? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate("/admin/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
