import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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

  const toggleMenu = () => setIsOpen(!isOpen);

  // ✅ Ad Script Inject (Optional)
  useEffect(() => {
    const adScript = document.createElement("script");
    adScript.src = "//pl27073574.profitableratecpm.com/ce/cc/47/cecc470dcc4bf408d60f8bc10f665012.js";
    adScript.async = true;
    document.body.appendChild(adScript);

    return () => {
      document.body.removeChild(adScript);
    };
  }, []);

  return (
    <header className="header">
      {/* 🔺 Top Bar */}
      <div className="top-bar">
        <div className="logo">
          <img src="/images/logo-removebg-preview.png" alt="Mr Happy" className="site-logo" />
          <span className="logo-text">
            <span style={{ color: "#d62300", fontWeight: "bold" }}>M</span><span style={{ color: "black" }}>r </span>
            <span style={{ color: "#d62300", fontWeight: "bold" }}>H</span><span style={{ color: "black" }}>appy</span>
          </span>
        </div>

        <div className="user-menu">
          <button className="profile-btn highlighted-btn">मेरी खबरें</button>
          <button className="menu-btn" onClick={toggleMenu}>☰</button>
        </div>
      </div>

      {/* 🔹 Desktop Category Tabs */}
      <nav className="category-nav">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {emojiMap[cat]} {cat}
          </button>
        ))}
      </nav>

      {/* 🔸 Desktop Navigation */}
      <nav className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>🏠 Home</NavLink>
        <NavLink to="/blogs" className={({ isActive }) => isActive ? "active" : ""}>📑 Blogs</NavLink>
        <NavLink to="/news" className={({ isActive }) => isActive ? "active" : ""}>📰 News</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>ℹ️ About</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>📞 Contact</NavLink>
        <NavLink to="/invite" className={({ isActive }) => isActive ? "active invite-btn" : "invite-btn"}>🎁 Invite</NavLink>
      </nav>

      {/* 📱 Mobile Navigation Links Only */}
      {isOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setIsOpen(false)}>🏠 Home</NavLink>
          <NavLink to="/blogs" onClick={() => setIsOpen(false)}>📑 Blogs</NavLink>
          <NavLink to="/news" onClick={() => setIsOpen(false)}>📰 News</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>ℹ️ About</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>📞 Contact</NavLink>
          <NavLink to="/invite" onClick={() => setIsOpen(false)}>🎁 Invite</NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
