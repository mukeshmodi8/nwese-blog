import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand">Mr. Happy Blog</NavLink>

     
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

      
      <button className="mobile-toggle" onClick={toggleMenu}>
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

     
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={toggleMenu} className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/blogs" onClick={toggleMenu} className={({ isActive }) => isActive ? "active" : ""}>Blogs</NavLink>
        <NavLink to="/news" onClick={toggleMenu} className={({ isActive }) => isActive ? "active" : ""}>News</NavLink>
        <NavLink to="/about" onClick={toggleMenu} className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
        <NavLink to="/contact" onClick={toggleMenu} className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
        <NavLink to="/invite" onClick={toggleMenu} className={({ isActive }) => isActive ? "active" : ""}>
          🎁 Invite Friends
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
