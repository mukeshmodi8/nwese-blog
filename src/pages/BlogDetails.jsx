import React from "react";
import { useParams } from "react-router-dom";
import blogs from "../data/blogs";
import { Helmet } from "react-helmet";
import CommentSection from "../components/CommentSection";
import "./BlogDetails.css";

import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaTelegram,
  FaShareAlt,
  FaEye,
} from "react-icons/fa";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === decodeURIComponent(id));

  if (!blog) {
    return <h2 className="text-center text-danger">❌ Blog Not Found</h2>;
  }

  const shareText = `Check out this blog: ${blog.title}`;
  const shareUrl = `${window.location.origin}/blogs/${encodeURIComponent(blog.id)}`;
  const shareImage = blog.image?.startsWith("http")
    ? blog.image
    : `${window.location.origin}/${blog.image}`;

  return (
    <div className="blog-details container py-4">
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.content.slice(0, 120)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content.slice(0, 120)} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <h1>{blog.title}</h1>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-detail-image"
        />
      )}

      <p style={{ fontSize: "18px", whiteSpace: "pre-line" }}>{blog.content}</p>

      <p className="text-muted">
        📅 {new Date(blog.publishedAt).toLocaleString()} | ⏱️ {blog.readingTime}
      </p>

      <p className="fw-bold">
        <FaEye className="me-2 text-secondary" />
        Views: Static Blogs (No Counter)
      </p>

      {/* 🔗 Social Share */}
      <div
        className="share-icons"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          <FaShareAlt style={{ marginRight: "5px" }} />
          Share:
        </span>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
          target="_blank"
          rel="noreferrer"
          title="WhatsApp"
          style={{ color: "#25D366", fontSize: "24px" }}
        >
          <FaWhatsapp />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noreferrer"
          title="Facebook"
          style={{ color: "#1877F2", fontSize: "24px" }}
        >
          <FaFacebook />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noreferrer"
          title="Twitter"
          style={{ color: "#1DA1F2", fontSize: "24px" }}
        >
          <FaTwitter />
        </a>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noreferrer"
          title="Telegram"
          style={{ color: "#0088cc", fontSize: "24px" }}
        >
          <FaTelegram />
        </a>
      </div>

      <hr className="my-4" />
      <CommentSection blogId={blog.id} />
    </div>
  );
};

export default BlogDetails;
