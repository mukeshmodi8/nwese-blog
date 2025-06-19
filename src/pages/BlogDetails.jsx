import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogs from "../data/blogs";
import { formatDistanceToNow, format } from "date-fns";
import { Helmet } from "react-helmet";
import CommentSection from "../components/CommentSection";

import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaTelegram,
  FaShareAlt,
  FaEye,
} from "react-icons/fa";

import { updateBlogView, fetchBlogView } from "../data/firebase";

const BlogDetails = () => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);
  const blog = blogs.find((b) => b.id === decodedId);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const handleViews = async () => {
      if (blog?.id) {
        await updateBlogView(blog.id.toString());
        const count = await fetchBlogView(blog.id.toString());
        setViews(count);
      }
    };
    handleViews();
  }, [blog]);

  if (!blog) return <h2>❌ Blog Not Found</h2>;

  const shareText = `Check out this blog: ${blog.title}`;
  const shareUrl = `${window.location.origin}/blogs/${blog.id}`;
  const shareImage = `${window.location.origin}${blog.image}`;

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  return (
    <div className="blog-details" style={{ padding: "20px" }}>
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

      <img
        src={blog.image}
        alt={blog.title}
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      />

      <p style={{ fontSize: "18px", marginTop: "20px", whiteSpace: "pre-line" }}>
        {blog.content}
      </p>

      <p style={{ fontSize: "14px", color: "#777" }}>
        📅 Published: {format(new Date(blog.publishedAt), "hh:mm a")} | ⏱️ {blog.readingTime} | ⌛{" "}
        {formatDistanceToNow(new Date(blog.publishedAt), { addSuffix: true })}
      </p>

      <p style={{ fontSize: "16px", marginTop: "10px", fontWeight: "500" }}>
        <FaEye style={{ marginRight: "6px", color: "#666" }} />
        Views: {views}
      </p>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          <FaShareAlt style={{ marginRight: "5px" }} />
          Share Social:
        </span>

        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontSize: "24px" }} title="WhatsApp">
          <FaWhatsapp />
        </a>
        <a href={facebookLink} target="_blank" rel="noopener noreferrer" style={{ color: "#1877F2", fontSize: "24px" }} title="Facebook">
          <FaFacebook />
        </a>
        <a href={twitterLink} target="_blank" rel="noopener noreferrer" style={{ color: "#1DA1F2", fontSize: "24px" }} title="Twitter">
          <FaTwitter />
        </a>
        <a href={telegramLink} target="_blank" rel="noopener noreferrer" style={{ color: "#0088cc", fontSize: "24px" }} title="Telegram">
          <FaTelegram />
        </a>
      </div>

      {/* 🟢 COMMENT SECTION HERE */}
      <CommentSection blogId={blog.id} />

    </div>
  );
};

export default BlogDetails;