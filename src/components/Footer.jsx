import React, { useEffect } from "react";
// import Footer from "./components/Footer";


const Footer = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//www.highperformanceformat.com/478f55f3c7805db3f3405b8dc2d0666f/invoke.js";
    script.async = true;
    document.getElementById("ad-container-footer")?.appendChild(script);
  }, []);

  return (
    <>
      {/* 📢 Adsterra Banner Ad */}
      <div
        id="ad-container-footer"
        style={{
          width: "728px",
          height: "90px",
          margin: "20px auto",
          textAlign: "center",
        }}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : '478f55f3c7805db3f3405b8dc2d0666f',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            `,
          }}
        />
      </div>

      {/* ✅ Footer Text */}
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
