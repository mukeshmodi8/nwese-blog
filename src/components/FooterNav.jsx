import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./FooterNav.css";

const FooterNav = () => {
  const { pathname } = useLocation();

  return (
    <footer className="footer-nav jagran-footer">
    
      <Link
        to="/fast-news"
        className={`footer-btn ${pathname === "/fast-news" ? "active" : ""}`}
      >
        <i className="material-icons">flash_on</i>
        <span>फ्लैश</span>
      </Link>

     
      <Link
        to="/sports"
        className={`footer-btn ${pathname === "/sports" ? "active" : ""}`}
      >
        <i className="material-icons">sports_soccer</i>
        <span>स्पोर्ट्स</span>
      </Link>

     
      <Link
        to="/"
        className={`center-fab ${pathname === "/" ? "active" : ""}`}
      >
        <i className="material-icons">home</i>
      </Link>

      
      <Link
        to="/videos"
        className={`footer-btn ${pathname === "/videos" ? "active" : ""}`}
      >
        <i className="material-icons">play_circle_filled</i>
        <span>वीडियो</span>
      </Link>

     
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
