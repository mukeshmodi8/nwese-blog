import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { Menu, X } from "lucide-react";

const emojiMap = {
  All: "🧾", Technology: "💻", Health: "💪", Sports: "⚽", Entertainment: "🎬",
  Business: "💼", News: "📰", Travel: "✈️", Education: "📚", Science: "🔬",
  Politics: "🏛️", Finance: "💰", Food: "🍕", Fashion: "👗", Gaming: "🎮",
  Culture: "🌍", Environment: "🌿", Automotive: "🚗", "Real Estate": "🏠", "Art & Culture": "🎨",
};

const categories = Object.keys(emojiMap);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      {/* 🔺 Top Bar */}
      <div className="top-bar">
        <div className="logo">📰 Mr Happy</div>
        <div className="user-menu">
          <button className="profile-btn">मेरी खबरें</button>
          <button className="menu-btn" onClick={toggleMenu}>☰</button>
        </div>
      </div>

      {/* 🔹 Category Tabs */}
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

      {/* 🔸 Main Links */}
      <nav className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/blogs" className={({ isActive }) => isActive ? "active" : ""}>Blogs</NavLink>
        <NavLink to="/news" className={({ isActive }) => isActive ? "active" : ""}>News</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About Us</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
        <NavLink to="/invite" className={({ isActive }) => isActive ? "active invite-btn" : "invite-btn"}>
          🎁 Invite Friends
        </NavLink>
      </nav>

      {/* 📱 Mobile Nav */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
        <NavLink to="/blogs" onClick={toggleMenu}>Blogs</NavLink>
        <NavLink to="/news" onClick={toggleMenu}>News</NavLink>
        <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
        <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>
        <NavLink to="/invite" onClick={toggleMenu}>🎁 Invite Friends</NavLink>
      </div>
    </header>
  );
};

export default Navbar;
