// src/components/AdBanner.jsx
import React, { useEffect, useRef } from "react";

const AdBanner = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "//pl26954151.profitableratecpm.com/9811eb47cec886e50887ad29cf5a19f2/invoke.js";

    if (adRef.current) {
      adRef.current.innerHTML = "";
      const containerDiv = document.createElement("div");
      containerDiv.id = "container-9811eb47cec886e50887ad29cf5a19f2";
      adRef.current.appendChild(containerDiv);
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      ref={adRef}
      style={{
        width: "100%",
        maxWidth: "728px",
        minHeight: "100px",
        margin: "20px auto",
        overflow: "hidden",
        textAlign: "center",
      }}
    />
  );
};

export default AdBanner;
