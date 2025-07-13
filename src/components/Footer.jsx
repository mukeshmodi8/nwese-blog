import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-grid">
      <div className="footer-row">

      
        <div className="footer-col">
          <h2 className="footer-brand">
            <span style={{ color: "#d62300" }}>Mr.</span> <span>Happy</span>
          </h2>
          <p className="footer-tagline">
            Your daily dose of trending blogs, tech news, and knowledge — in easy Hindi.
          </p>
        </div>

        
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

       
       
      </div>

    
      <div className="footer-disclaimer">
        <p><strong>Disclaimer:</strong> The content provided on Mr. Happy Blog is for informational purposes only. We do not guarantee accuracy or completeness. Please verify independently before acting on any information.</p>
      </div>

     
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mr. Happy Blogs. All rights reserved.</p>
        <p>Made with ❤️ in India. Powered by Mr. Happy.</p>
      </div>
    </footer>
  );
};

export default Footer;
