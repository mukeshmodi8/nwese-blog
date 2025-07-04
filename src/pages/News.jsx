import React from "react";
import { Link } from "react-router-dom";
import blogs from "../data/blogs";
import {
  FaShareAlt,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import "./News.css";

const News = () => {
  const newsBlogs = blogs.filter(
    (item) => item.category.trim().toLowerCase() === "news"
  );

  const shareBlog = (platform, blog) => {
    const url = `${window.location.origin}/blogs/${blog.id}`;
    const text = `${blog.title} - पढ़ें Mr. Happy Blog पर!`;

    let shareUrl = "";
    if (platform === "whatsapp") {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div className="news-container">
      <h2 className="news-heading">📰 Latest News</h2>
      <div className="news-grid">
        {newsBlogs.map((blog) => (
          <div className="news-card" key={blog.id}>
            <img src={blog.image} alt={blog.title} className="news-img" />
            <div className="news-content">
              <h3>{blog.title}</h3>
              <p className="news-date">
                🗓️ {new Date(blog.publishedAt).toLocaleDateString()}
              </p>
              <p>{blog.readingTime} read</p>

              <Link to={`/blogs/${blog.id}`} className="read-more-btn">
                Read More →
              </Link>

              <div className="share-icons">
                <FaShareAlt title="Share" />
                <FaWhatsapp
                  title="WhatsApp"
                  onClick={() => shareBlog("whatsapp", blog)}
                />
                <FaFacebook
                  title="Facebook"
                  onClick={() => shareBlog("facebook", blog)}
                />
                <FaTwitter
                  title="Twitter"
                  onClick={() => shareBlog("twitter", blog)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
