import React, { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//pl26953552.profitableratecpm.com/6a/39/23/6a392388ddb1d4aa0f2247847e971468.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    const adContainer = document.getElementById("ad-container");
    if (adContainer) {
      adContainer.innerHTML = ""; // पुराना हटाए
      adContainer.appendChild(script); // script जोड़े
    }
  }, []);

  return (
    <div
      id="ad-container"
      style={{
        width: "100%",
        minHeight: "120px",
        margin: "20px 0",
        textAlign: "center",
        background: "#f8f8f8",
      }}
    >
      {/* यहां पर JS Script से Ad आएगी */}
    </div>
  );
};

export default AdBanner;
