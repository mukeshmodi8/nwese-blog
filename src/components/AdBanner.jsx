import React, { useEffect } from "react";

const BannerAd = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//www.highperformanceformat.com/478f55f3c7805db3f3405b8dc2d0666f/invoke.js";
    script.async = true;

    document.getElementById("ad-container").appendChild(script);
  }, []);

  return (
    <div
      id="ad-container"
      style={{ width: "728px", height: "90px", margin: "auto", textAlign: "center" }}
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
  );
};

export default BannerAd;
