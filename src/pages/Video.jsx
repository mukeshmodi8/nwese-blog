import React from "react";
import { Helmet } from "react-helmet";
import videos from "../data/videos"; 
import "./Video.css";

const Video = () => {
  return (
    <div className="video-page">
      <Helmet>
        <title>📺 वीडियो | Mr. Happy Blog</title>
        <meta name="description" content="नए टेक्नोलॉजी, न्यूज और ट्रेंडिंग वीडियो देखें Mr. Happy Blog पर!" />
      </Helmet>

      <h2 className="video-heading">🎥 ट्रेंडिंग वीडियो</h2>

      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <iframe
              width="100%"
              height="220"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <h4 className="video-title">{video.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
