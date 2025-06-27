import React from "react";
import { Link } from "react-router-dom"; // जरूरी है React Router के लिए

const Footer = () => {
  return (
    <>
      {/* <ErrorBoundary>
        <NativeAd />
      </ErrorBoundary> */}

      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          background: "#f5f5f5",
          borderTop: "1px solid #ddd",
          fontSize: "14px",
          color: "#555",
        }}
      >
        <div>&copy; {new Date().getFullYear()} Mr. Happy Blogs. All Rights Reserved.</div>

        <div style={{ marginTop: "12px" }}>
          <Link to="/privacy" style={linkStyle}>Privacy Policy</Link>
          <span style={{ margin: "0 8px" }}>|</span>
          <Link to="/about" style={linkStyle}>About</Link>
          <span style={{ margin: "0 8px" }}>|</span>
          <Link to="/contact" style={linkStyle}>Contact</Link>
        </div>

        <p style={{ marginTop: "12px", maxWidth: "600px", marginInline: "auto" }}>
          This website is created for informational and educational purposes only. If you notice any
          unintentional mistakes or inaccuracies in the content, please understand that it may be
          human error. Feel free to contact us for suggestions or corrections.
        </p>
      </footer>
    </>
  );
};

// External Style for Link
const linkStyle = {
  textDecoration: "none",
  color: "#007bff",
  fontWeight: "500",
};

export default Footer;
