// src/pages/News.jsx
import React from "react";
import blogs from "../data/blogs";
import { Link } from "react-router-dom";
import {
  FaShareAlt,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import "./News.css";

const News = () => {
  // 🔍 Filter "news" category (case-insensitive)
  const newsBlogs = blogs.filter(
    (item) => item?.category?.trim().toLowerCase() === "news"
  );

  const shareBlog = (platform, blog) => {
    const url = `${window.location.origin}/blogs/${blog.id}`;
    const text = `${blog.title} - पढ़ें Mr. Happy Blog पर!`;

    let shareUrl = "";
    if (platform === "whatsapp") {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div className="news-container">
      <h2 className="news-heading">📰 लेटेस्ट न्यूज़</h2>

      {newsBlogs.length === 0 ? (
        <p style={{ padding: "1rem", color: "gray" }}>
          😕 अभी कोई न्यूज़ आर्टिकल उपलब्ध नहीं है।
        </p>
      ) : (
        <div className="news-grid">
          {newsBlogs.map((blog) => (
            <div className="news-card" key={blog.id}>
              <img src={blog.image} alt={blog.title} className="news-img" />
              <div className="news-content">
                <h3>{blog.title}</h3>
                <p className="news-date">
                  📅 {new Date(blog.publishedAt).toLocaleDateString()}
                </p>
                <p>⏱️ {blog.readingTime}</p>

                <Link to={`/blogs/${blog.id}`} className="read-more-btn">
                  और पढ़ें →
                </Link>

                <div className="share-icons">
                <FaShareAlt style={{ color: "#666" }} />  

                  <FaWhatsapp
                    title="WhatsApp"
                    onClick={() => shareBlog("whatsapp", blog)}
                    style={{ color: "#25D366" }}
                  />

                  <FaFacebook
                    title="Facebook"
                    onClick={() => shareBlog("facebook", blog)}
                    style={{ color: "#1877F2" }}
                  />

                  <FaTwitter
                    title="Twitter"
                    onClick={() => shareBlog("twitter", blog)}
                    style={{ color: "#1DA1F2" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
