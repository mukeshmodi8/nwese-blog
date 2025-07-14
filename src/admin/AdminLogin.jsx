import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();

  // 🔑 LocalStorage से credentials लो
  const storedEmail = localStorage.getItem("adminEmail") || "mvmodi.2014@gmail.com";
  const storedPassword = localStorage.getItem("adminPassword") || "mvmodi@2014";

  if (email === storedEmail && password === storedPassword) {
    localStorage.setItem("adminToken", "secret123");
    navigate("/admin/dashboard");
  } else {
    alert("⛔ Invalid credentials");
  }
};


  return (
    <div className="container py-4">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
