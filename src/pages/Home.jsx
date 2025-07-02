import React, { useState } from "react";
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

  return (
    <div className="home-page">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Mr Happy Blog | Hindi Tech & News Articles</title>
        <meta
          name="description"
          content="Mr Happy Blog: हिंदी में पढ़ें लेटेस्ट टेक्नोलॉजी, न्यूज़, एंटरटेनमेंट और एजुकेशन से जुड़े मजेदार ब्लॉग्स।"
        />
        <meta
          name="keywords"
          content="Mr Happy, Mr Happy Blog, Hindi Tech Blog, React Blog, न्यूज़ ब्लॉग, Developer Blog"
        />
        <meta name="author" content="Mr Happy" />
        <meta name="google-site-verification" content="bENOC1iJE7Tk0d7xoOCnaLz-LUndi4la1JuKEKyX6to" />
        <meta property="og:title" content="Mr Happy Blog | Latest Hindi Articles" />
        <meta
          property="og:description"
          content="Mr Happy का ब्लॉग - हिंदी में कोडिंग, न्यूज़, तकनीक और जीवन से जुड़ी जानकारी।"
        />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ✅ SEO-Friendly Heading */}
      <div className="hero">
        <h1>Mr Happy Blog - Official Hindi Tech & News Articles</h1>
        <p>
          Mr Happy द्वारा लिखा गया हिंदी ब्लॉग — यहाँ पढ़ें हर दिन रोचक तकनीकी,
          मनोरंजन, एजुकेशन और लाइफ से जुड़ी नई पोस्ट्स।
        </p>
      </div>

      {/* 🔽 Dropdown Category Selector */}
      <div className="category-dropdown-wrapper">
        <label htmlFor="category">📂 Filter by Category:</label>
        <select
          id="category"
          className="category-dropdown"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {emojiMap[cat] || "📂"} {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="section">
        <h2>
          {selectedCategory === "All"
            ? "Latest Blogs"
            : `${selectedCategory} Blogs`}
        </h2>

        <div className="card-container">
          {filteredBlogs.map((blog) => {
            const shareText = `Check out this blog: ${blog.title}`;
            const shareUrl = `${baseUrl}/blogs/${encodeURIComponent(blog.id)}`;

            const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
              shareText + " " + shareUrl
            )}`;
            const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`;
            const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              shareText
            )}&url=${encodeURIComponent(shareUrl)}`;
            const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(
              shareUrl
            )}&text=${encodeURIComponent(shareText)}`;

            return (
              <div key={blog.id} className="card">
                <img src={blog.image} alt={blog.title} />
                <h3>{blog.title}</h3>

                {/* ✅ HTML-safe preview */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.content.slice(0, 60) + "..."
                  }}
                  style={{ fontSize: "14px", color: "#333" }}
                ></div>

                <Link to={`/blogs/${encodeURIComponent(blog.id)}`}>
                  <p style={{ fontSize: "14px", color: "#777" }}>
                    📅 Published:{" "}
                    {format(new Date(blog.publishedAt), "hh:mm a")} | ⏱️{" "}
                    {blog.readingTime} | ⌛{" "}
                    {formatDistanceToNow(new Date(blog.publishedAt), {
                      addSuffix: true,
                    })}
                  </p>
                  <button>Read More</button>
                </Link>

                {/* 🔗 Share Icons */}
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                    <FaShareAlt style={{ marginRight: "5px" }} />
                    Share Social:
                  </span>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    style={{ color: "#25D366", fontSize: "20px" }}
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href={facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    style={{ color: "#1877F2", fontSize: "20px" }}
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href={twitterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                    style={{ color: "#1DA1F2", fontSize: "20px" }}
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                    style={{ color: "#0088cc", fontSize: "20px" }}
                  >
                    <FaTelegram />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
