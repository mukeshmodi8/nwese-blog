import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-grid">
      <div className="footer-row">

        {/* 🔹 Column 1 - Brand */}


        {/* 🔹 Column 2 - Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#top">⬆️ Back to Top</a></li>
          </ul>
        </div>

        {/* 🔹 Column 3 - Contact Info */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact Info</h4>
          <p>📧 support@mrhappy.in</p>
          <p>📍 India 🇮🇳</p>
          <p>🕒 Mon–Sat, 10am–6pm</p>
        </div>
      </div>

      {/* 🔻 Bottom Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mr. Happy Blogs. All rights reserved.</p>
        <p>Made with ❤️ in India. Powered by Mr. Happy.</p>
      </div>
    </footer>
  );
};

export default Footer;
