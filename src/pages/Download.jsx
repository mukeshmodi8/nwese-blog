import React from "react";
import "./Download.css";
import { Download } from "lucide-react";

const download = () => {
  return (
    <div className="download-page">
      <div className="download-container">
        <h1 className="download-title">📲 Happy App</h1>
        <p className="download-subtitle">
          अपने मोबाइल पर सबसे बढ़िया ब्लॉग पढ़ने के लिए ऐप डाउनलोड करें।
        </p>

        <div className="icon-bounce">
          <img
            src="/logo.jpg"
            alt="App Icon"
            className="download-app-icon"
          />
        </div>

        <a href="/app.apk" className="download-btn" download>
          ⬇️ Download Now
        </a>
      </div>
    </div>
  );
};

export default Download;
