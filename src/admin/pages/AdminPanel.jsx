import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  LayoutDashboard, 
  FilePlus, 
  Settings, 
  BookOpen, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  UserCircle 
} from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const logout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from admin panel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    }
  };

  const navItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard", color: "text-primary" },
    { title: "Add Blog", icon: <FilePlus size={20} />, path: "/admin/add-blog", color: "text-success" },
    { title: "Manage Products", icon: <Settings size={20} />, path: "/admin/manage", color: "text-warning" },
    { title: "Manage Blogs", icon: <BookOpen size={20} />, path: "/admin/blogs", color: "text-info" },
  ];

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* --- SIDEBAR --- */}
      <div 
        className={`bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'd-flex' : 'd-none'} flex-column p-3`}
        style={{ 
          width: "280px", 
          position: "fixed", 
          height: "100vh", 
          zIndex: 1000,
          left: isSidebarOpen ? "0" : "-280px" 
        }}
      >
        <div className="d-flex align-items-center mb-5 mt-2 px-2">
          <div className="bg-primary rounded-3 p-2 me-2">
            <LayoutDashboard className="text-white" size={24} />
          </div>
          <h4 className="fw-bold mb-0 text-dark">Blog <span className="text-primary">Admin</span></h4>
        </div>

        <div className="nav flex-column gap-2 flex-grow-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="nav-link border-0 bg-transparent text-start d-flex align-items-center p-3 rounded-3 text-dark hover-bg-light transition-all"
              style={{ fontWeight: "500" }}
            >
              <span className={`me-3 ${item.color}`}>{item.icon}</span>
              {item.title}
            </button>
          ))}
        </div>

        <button 
          onClick={logout}
          className="btn btn-outline-danger border-0 d-flex align-items-center p-3 rounded-3 mt-auto w-100"
          style={{ fontWeight: "600" }}
        >
          <LogOut size={20} className="me-3" /> Logout
        </button>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div 
        className="flex-grow-1 transition-all" 
        style={{ 
          marginLeft: isSidebarOpen ? "280px" : "0", 
          width: "100%",
          transition: "margin-left 0.3s ease" 
        }}
      >
        {/* --- HEADER --- */}
        <header 
          className="bg-white border-bottom px-4 d-flex align-items-center justify-content-between shadow-sm sticky-top" 
          style={{ height: "70px" }}
        >
          <div className="d-flex align-items-center gap-3">
            <button 
              className="btn btn-light rounded-circle p-2"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h5 className="mb-0 fw-semibold d-none d-md-block">Admin Overview</h5>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="position-relative p-2 bg-light rounded-circle cursor-pointer">
              <Bell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white p-1">
                <span className="visually-hidden">unread messages</span>
              </span>
            </div>
            <div className="d-flex align-items-center gap-2 ps-3 border-start">
              <div className="text-end d-none d-sm-block">
                <p className="mb-0 small fw-bold text-dark">Mr. Happy</p>
                <p className="mb-0 text-muted" style={{ fontSize: "10px" }}>Super Admin</p>
              </div>
              <UserCircle size={32} className="text-secondary" />
            </div>
          </div>
        </header>

        {/* --- PAGE CONTENT --- */}
        <main className="p-4 p-md-5">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="fw-bold">Welcome back, Mr. Happy! 👋</h2>
              <p className="text-muted">Here's what's happening with your store today.</p>
            </div>
          </div>

          <div className="row g-4">
            {navItems.map((item, index) => (
              <div key={index} className="col-12 col-sm-6 col-xl-3">
                <div 
                  className="card border-0 shadow-sm h-100 transition-all hover-translate-y cursor-pointer"
                  onClick={() => navigate(item.path)}
                  style={{ borderRadius: "20px" }}
                >
                  <div className="card-body p-4 text-center">
                    <div className={`mb-3 d-inline-block p-3 rounded-4 ${item.color.replace('text', 'bg').replace('-', '-subtle ')}`}>
                      {item.icon}
                    </div>
                    <h5 className="fw-bold mb-1">{item.title}</h5>
                    <p className="text-muted small mb-0">Manage and update your {item.title.toLowerCase()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="row mt-5">
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Quick Shortcuts</h5>
                  <div className="alert alert-info border-0 rounded-3">
                    🚀 <strong>Tip:</strong> Use the sidebar to quickly switch between modules.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>
        {`
          .hover-bg-light:hover { background-color: #f8fafc !important; color: #0d6efd !important; }
          .hover-translate-y:hover { transform: translateY(-5px); }
          .transition-all { transition: all 0.3s ease; }
          .cursor-pointer { cursor: pointer; }
        `}
      </style>
    </div>
  );
};

export default AdminPanel;