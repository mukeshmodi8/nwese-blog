// src/components/NativeAd.js
import React, { useEffect, useRef } from "react";
import ErrorBoundary from "./ErrorBoundary";

const NativeAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//pl26954151.profitableratecpm.com/9811eb47cec886e50887ad29cf5a19f2/invoke.js";
    script.async = true;

    const adDiv = document.createElement("div");
    adDiv.id = "container-9811eb47cec886e50887ad29cf5a19f2";

    if (adRef.current) {
      adRef.current.innerHTML = ""; // Clear previous if any
      adRef.current.appendChild(adDiv);
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      ref={adRef}
      style={{
        width: "100%",
        maxWidth: "728px",
        margin: "20px auto",
        textAlign: "center",
        overflow: "hidden",
      }}
    />
  );
};

export default NativeAd;
