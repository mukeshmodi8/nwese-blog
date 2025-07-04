import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./FooterNav.css";

const FooterNav = () => {
  const { pathname } = useLocation(); // ✅ Destructuring pathname only

  return (
    <footer className="footer-nav">
      <Link to="/" className={`footer-btn ${pathname === "/" ? "active" : ""}`}>
        🏠<span>होम</span>
      </Link>
      <Link to="/epaper" className={`footer-btn ${pathname === "/epaper" ? "active" : ""}`}>
        📰<span>ई-पेपर</span>
      </Link>
      <Link to="/fast-news" className={`footer-btn ${pathname === "/fast-news" ? "active highlight" : ""}`}>
        ⚡<span>फटाफट</span>
      </Link>
      <Link to="/videos" className={`footer-btn ${pathname === "/videos" ? "active" : ""}`}>
        🎥<span>वीडियो</span>
      </Link>
      <Link to="/states" className={`footer-btn ${pathname === "/states" ? "active" : ""}`}>
        📍<span>राज्य</span>
      </Link>
    </footer>
  );
};

export default FooterNav;
