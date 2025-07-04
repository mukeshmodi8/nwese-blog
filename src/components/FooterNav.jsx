import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./FooterNav.css";

const FooterNav = () => {
  const { pathname } = useLocation();

  return (
    <footer className="footer-nav jagran-footer">
      <Link to="/" className={`footer-btn ${pathname === "/" ? "active" : ""}`}>
        <i className="material-icons">home</i>
        <span>होम</span>
      </Link>

      <Link to="/epaper" className={`footer-btn ${pathname === "/epaper" ? "active" : ""}`}>
        <i className="material-icons">article</i>
        <span>ई-पेपर</span>
      </Link>

      {/* Center Round FAB style */}
      <Link to="/fast-news" className="center-fab">
        <i className="material-icons">flash_on</i>
      </Link>

      <Link to="/videos" className={`footer-btn ${pathname === "/videos" ? "active" : ""}`}>
        <i className="material-icons">play_circle_filled</i>
        <span>वीडियो</span>
      </Link>

      <Link to="/states" className={`footer-btn ${pathname === "/states" ? "active" : ""}`}>
        <i className="material-icons">place</i>
        <span>राज्य</span>
      </Link>
    </footer>
  );
};

export default FooterNav;
