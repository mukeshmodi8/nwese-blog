// Example usage in Footer.js or Home.js
import React from "react";
// import ErrorBoundary from "./components/ErrorBoundary";
// import NativeAd from "./components/NativeAd";

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
        <p style={{ marginTop: "8px", maxWidth: "600px", marginInline: "auto" }}>
          This website is created for informational and educational purposes only. If you notice any
          unintentional mistakes or inaccuracies in the content, please understand that it may be
          human error. Feel free to contact us for suggestions or corrections.
        </p>
      </footer>
    </>
  );
};

export default Footer;
