import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";
import "./Navbar.css";

const emojiMap = {
  All: "🧾", Technology: "💻", Health: "💪", Sports: "⚽", Entertainment: "🎬",
  Business: "💼", News: "📰", Travel: "✈️", Education: "📚", Science: "🔬",
  Politics: "🏛️", Finance: "💰", Food: "🍕", Fashion: "👗", Gaming: "🎮",
  Culture: "🌍", Environment: "🌿", Automotive: "🚗", "Real Estate": "🏠", "Art & Culture": "🎨",
};

const categories = Object.keys(emojiMap);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCategory, setSelectedCategory } = useCategory();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (location.pathname !== "/blogs") {
      navigate("/blogs");
    }
  };

  return (
    <header className="header">
      {/* 🔺 Top Bar */}
      <div className="top-bar">
        <div className="logo">
          <img src="/images/logo-removebg-preview.png" alt="Mr Happy" className="site-logo" />
          <span className="logo-text">
            <span style={{ color: "#d62300", fontWeight: "bold" }}>M</span>
            <span style={{ color: "black" }}>r </span>
            <span style={{ color: "#d62300", fontWeight: "bold" }}>H</span>
            <span style={{ color: "black" }}>appy</span>
          </span>
        </div>

        <div className="user-menu">
          <button className="menu-btn" onClick={toggleMenu}>
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>


      <nav className="category-nav">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {emojiMap[cat]} {cat}
          </button>
        ))}
      </nav>


      <nav className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>🏠 Home</NavLink>
        <NavLink to="/blogs" className={({ isActive }) => isActive ? "active" : ""}>📑 Blogs</NavLink>
        <NavLink to="/news" className={({ isActive }) => isActive ? "active" : ""}>📰 News</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>ℹ️ About</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>📞 Contact</NavLink>
        <NavLink to="/download" className={({ isActive }) => isActive ? "active" : ""}>📱 Mobile APK</NavLink>
        <NavLink to="/invite" className={({ isActive }) => isActive ? "active invite-btn" : "invite-btn"}>🎁 Invite</NavLink>
      </nav>


      {isOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setIsOpen(false)}>🏠 Home</NavLink>
          <NavLink to="/blogs" onClick={() => setIsOpen(false)}>📑 Blogs</NavLink>
          <NavLink to="/news" onClick={() => setIsOpen(false)}>📰 News</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>ℹ️ About</NavLink>
          <NavLink to="/download" onClick={() => setIsOpen(false)}>📱 Mobile APK</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>📞 Contact</NavLink>
          <NavLink to="/invite" onClick={() => setIsOpen(false)}>🎁 Invite</NavLink>
          <NavLink to="/videos" onClick={() => setIsOpen(false)}>🎬 Videos</NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
