import React, { useEffect, useState } from "react";
import blogs from "../data/blogs";
import { Link } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";
import { categories as rawCategories } from "../data/categories";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaTelegram,
  FaShareAlt,
} from "react-icons/fa";
import { Helmet } from "react-helmet";
import "./Home.css";

const emojiMap = {
  All: "🧾",
  Technology: "💻",
  Health: "💪",
  Sports: "⚽",
  Entertainment: "🎬",
  Business: "💼",
  Newse: "📰",
  Travel: "✈️",
  Education: "📚",
  Science: "🔬",
  Politics: "🏛️",
  Finance: "💰",
  Food: "🍕",
  Fashion: "👗",
  Gaming: "🎮",
  Culture: "🌍",
  Environment: "🌿",
  Automotive: "🚗",
  "Real Estate": "🏠",
  "Art & Culture": "🎨",
};

const categories = ["All", ...rawCategories];

const Home = () => {
  const baseUrl = window.location.origin;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  useEffect(() => {
    const popupAdScript = document.createElement("script");
    popupAdScript.src = "//pl27073574.profitableratecpm.com/ce/cc/47/cecc470dcc4bf408d60f8bc10f665012.js";
    popupAdScript.async = true;
    document.body.appendChild(popupAdScript);

    return () => {
      document.body.removeChild(popupAdScript);
    };
  }, []);

  return (
    <div className="home-ui jagran-style">
      <Helmet>
        <title>Mr Happy Blog | Hindi Tech & News Articles</title>
        <meta
          name="description"
          content="Mr Happy Blog: हिंदी में पढ़ें लेटेस्ट टेक्नोलॉजी, न्यूज़, एंटरटेनमेंट और एजुकेशन से जुड़े मजेदार ब्लॉग्स।"
        />
        <meta name="author" content="Mr Happy" />
      </Helmet>

      {/* Header */}
      {/* <header className="header">
        <div className="top-bar">
          <div className="logo">📰 Mr Happy</div>
          <div className="user-menu">
            <button className="profile-btn">मेरी खबरें</button>
            <button className="menu-btn">☰</button>
          </div>
        </div>
        <nav className="category-nav">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {emojiMap[cat] || "📂"} {cat}
            </button>
          ))}
        </nav>
      </header> */}

      {/* News Section */}
      <main className="news-section">
        <h2>{selectedCategory === "All" ? "लेटेस्ट ब्लॉग्स" : `${selectedCategory} ब्लॉग्स`}</h2>
        <div className="news-cards">
          {filteredBlogs.map((blog) => {
            const shareText = `Check out this blog: ${blog.title}`;
            const shareUrl = `${baseUrl}/blogs/${encodeURIComponent(blog.id)}`;

            return (
              <div key={blog.id} className="news-card">
                <img src={blog.image} alt={blog.title} className="news-img" />
                <div className="news-content">
                  <h3>{blog.title}</h3>
                  <div
                    className="excerpt"
                    dangerouslySetInnerHTML={{
                      __html: blog.content.slice(0, 60) + "...",
                    }}
                  ></div>
                  <p className="meta">
                    📅 {format(new Date(blog.publishedAt), "dd MMM yyyy")} | ⏱️ {blog.readingTime} | ⌛ {formatDistanceToNow(new Date(blog.publishedAt), { addSuffix: true })}
                  </p>
                  <Link to={`/blogs/${encodeURIComponent(blog.id)}`} className="read-btn">
                    और पढ़ें
                  </Link>
                  <div className="share-icons">
                    <span><FaShareAlt /> Share:</span>
                    <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="footer-nav">
        <button>🏠 होम</button>
        <button>📰 ई-पेपर</button>
        <button className="highlight">⚡ फटाफट खबरें</button>
        <button>🎥 वीडियो</button>
        <button>📍 राज्य चुनें</button>
      </footer>
    </div>
  );
};

export default Home;
