import React, { useEffect } from "react";

const AdSenseAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense Error:", e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: "block", textAlign: "center", margin: "20px 0" }}
      data-ad-client="ca-pub-2128485019765898"
      data-ad-slot="7085021124"
      data-ad-format="auto"
      data-full-width-responsive="true">
    </ins>
  );
};

export default AdSenseAd;
