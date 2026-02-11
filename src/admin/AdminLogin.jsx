import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

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
        confirmButtonColor: "#6366f1",
      }).then(() => {
        navigate("/admin/dashboard");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials ❌",
        text: "Please enter correct email & password",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Admin Portal</h2>
          <p className="text-gray-500 mt-2">Sign in to manage your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50 transition-all outline-none"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50 transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login to Dashboard
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Secure encrypted connection
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;