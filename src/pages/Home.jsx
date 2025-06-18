import React from "react";
import blogs from "../data/blogs";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaTelegram,
  FaInstagram,
  FaShareAlt,
} from "react-icons/fa";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Welcome to Blog & News</h1>
        <p>Daily interesting content</p>
      </div>

      <div className="section">
        <h2>Latest Blogs</h2>
        <div className="card-container">
          {blogs.map((blog) => {
            const shareText = `Check out this blog: ${blog.title}`;
            const shareUrl = `${window.location.origin}/blogs/${blog.id}`;

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
            const instagramLink = `https://www.instagram.com/`;

            return (
              <div key={blog.id} className="card">
                <img src={blog.image} alt={blog.title} />
                <h3>{blog.title}</h3>
                <p>{blog.content.slice(0, 60)}...</p>
                <Link to={`/blogs/${blog.id}`}>
                  <button>Read More</button>
                </Link>

                {/* Share Icons */}
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
                  <a
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    style={{ color: "#C13584", fontSize: "20px" }}
                  >
                    <FaInstagram />
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
