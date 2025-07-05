import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./FooterNav.css";

const FooterNav = () => {
  const { pathname } = useLocation();

  return (
    <footer className="footer-nav jagran-footer">
      {/* 🔥 Flash News - Left Side */}
      <Link
        to="/fast-news"
        className={`footer-btn ${pathname === "/fast-news" ? "active" : ""}`}
      >
        <i className="material-icons">flash_on</i>
        <span>फ्लैश</span>
      </Link>

      {/* 📄 Epaper */}
      <Link
        to="/epaper"
        className={`footer-btn ${pathname === "/epaper" ? "active" : ""}`}
      >
        <i className="material-icons">article</i>
        <span>ई-पेपर</span>
      </Link>

      {/* 🏠 Home - Center Floating */}
      <Link
        to="/"
        className={`center-fab ${pathname === "/" ? "active" : ""}`}
      >
        <i className="material-icons">home</i>
      </Link>

      {/* 🎥 Videos */}
      <Link
        to="/videos"
        className={`footer-btn ${pathname === "/videos" ? "active" : ""}`}
      >
        <i className="material-icons">play_circle_filled</i>
        <span>वीडियो</span>
      </Link>

      {/* 📍 States */}
      <Link
        to="/states"
        className={`footer-btn ${pathname === "/states" ? "active" : ""}`}
      >
        <i className="material-icons">place</i>
        <span>राज्य</span>
      </Link>
    </footer>
  );
};

export default FooterNav;
