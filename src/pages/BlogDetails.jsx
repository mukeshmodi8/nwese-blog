import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import blogs from "../data/blogs";
import { Helmet } from "react-helmet";
import "../styles/blog.css";
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

// ✅ FUNCTION: Insert ads after every 3 <p> blocks
const insertAdsInContent = (htmlString) => {
  const adHtml = `
    <div class="mid-article-ad" style="margin: 30px 0; text-align: center;">
      <div id="container-9811eb47cec886e50887ad29cf5a19f2"></div>
    </div>
  `;

  const parts = htmlString.split("</p>");
  let result = "";
  parts.forEach((part, index) => {
    result += part + "</p>";
    if ((index + 1) % 3 === 0) {
      result += adHtml;
    }
  });

  return result;
};

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === decodeURIComponent(id));
  const [views, setViews] = useState(0);
  const hasCounted = useRef(false);

  useEffect(() => {
    if (!blog || hasCounted.current) return;

    const viewsKey = `views_${blog.id}`;
    const sessionKey = `session_viewed_${blog.id}`;

    if (!sessionStorage.getItem(sessionKey)) {
      const currentViews = parseInt(localStorage.getItem(viewsKey) || "0", 10);
      const newViews = currentViews + 1;
      localStorage.setItem(viewsKey, newViews.toString());
      setViews(newViews);
      sessionStorage.setItem(sessionKey, "true");
    } else {
      const currentViews = parseInt(localStorage.getItem(viewsKey) || "0", 10);
      setViews(currentViews);
    }

    hasCounted.current = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [blog]);

  // ✅ Load external ad script for every injected ad container
  useEffect(() => {
    const adContainers = document.querySelectorAll("[id^=container-]");
    adContainers.forEach((container) => {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "//pl26954151.profitableratecpm.com/9811eb47cec886e50887ad29cf5a19f2/invoke.js";
      container.innerHTML = "";
      container.appendChild(script);
    });
  }, [blog]);

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
        <title>{blog?.title || "Blog Post"}</title>
        <meta name="description" content={blog?.content?.slice(0, 120) || "Read this amazing blog."} />
        <meta property="og:title" content={blog?.title || "Blog Title"} />
        <meta property="og:description" content={blog?.content?.slice(0, 120) || "Read this blog"} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <h1>{blog.title}</h1>

      {blog.image && (
        <img
          src={shareImage}
          alt={blog.title}
          className="blog-detail-image"
          onError={(e) => (e.target.src = "/fallback.jpg")}
        />
      )}

      {/* ✅ Injected HTML + Ads */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: insertAdsInContent(blog.content) }}
      />

      <p className="text-muted">
        📅 {new Date(blog.publishedAt).toLocaleString()} | ⏱️ {blog.readingTime}
      </p>

      <p className="fw-bold">
        <FaEye className="me-2 text-secondary" />
        Views: {views}
      </p>

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
