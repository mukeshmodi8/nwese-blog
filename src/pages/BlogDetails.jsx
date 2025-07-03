import React, { useEffect, useState } from "react";
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

// ✅ FUNCTION: Insert ad placeholders after every 3 <p> blocks
const insertAdsInContent = (htmlString) => {
  const adPlaceholder = `
    <!-- 🟡 Adsterra Ad Placeholder -->
    <div class="mid-article-ad" style="margin: 30px 0; text-align: center;">
      <!-- Adsterra script and ad container will go here -->
    </div>
  `;

  const parts = htmlString.split("</p>");
  let result = "";
  parts.forEach((part, index) => {
    result += part + "</p>";
    if ((index + 1) % 3 === 0) {
      result += adPlaceholder;
    }
  });

  return result;
};

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === decodeURIComponent(id));
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (!blog) return;

    const viewsKey = `views_${blog.id}`;
    const currentViews = parseInt(localStorage.getItem(viewsKey) || "0", 10);
    const newViews = currentViews + 1;
    localStorage.setItem(viewsKey, newViews.toString());
    setViews(newViews);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [blog]);

  // ✅ OPTIONAL: Load Adsterra script globally if needed
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://YOUR-ADSTERRA-LINK.script.js"; // Replace with your real Adsterra link
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);

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
