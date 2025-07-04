// src/components/FooterNav.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./FooterNav.css"; // इसमें fix position वाला CSS होगा

const FooterNav = () => {
  return (
    <footer className="footer-nav">
      <Link to="/" className="footer-btn">🏠 होम</Link>
      <Link to="/epaper" className="footer-btn">📰 ई-पेपर</Link>
      <Link to="/fast-news" className="footer-btn highlight">⚡ फटाफट खबरें</Link>
      <Link to="/videos" className="footer-btn">🎥 वीडियो</Link>
      <Link to="/states" className="footer-btn">📍 राज्य चुनें</Link>
    </footer>
  );
};

export default FooterNav;
