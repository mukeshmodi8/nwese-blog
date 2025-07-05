import React from "react";
import flashNews from "../data/flashNews";
import { Helmet } from "react-helmet";
import "./FlashNews.css";

const FlashNews = () => {
  return (
    <div className="flash-news-page">
      <Helmet>
        <title>⚡ Flash News | Mr. Happy</title>
        <meta name="description" content="लेटेस्ट ताज़ा खबरें पढ़ें Flash News सेक्शन में Mr. Happy Blog पर।" />
      </Helmet>

      <h2 className="flash-title">⚡ फ्लैश न्यूज़</h2>

      <div className="flash-list">
        {flashNews.map((news) => (
          <div key={news.id} className="flash-card">
            <p>{news.text}</p>
            <span>{news.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashNews;
