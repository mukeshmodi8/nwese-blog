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
} from "react-icons/fa";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (blog && blog.content) {
      setHtmlContent(blog.content);
    }
  }, [blog]);

  if (!blog) return <h1>Blog Not Found</h1>;

  const currentUrl = window.location.href;

  return (
    <div className="blog-details-container">
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.title} />
      </Helmet>

      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-date">{new Date(blog.publishedAt).toLocaleDateString()}</p>
      <img className="blog-image" src={blog.image} alt={blog.title} />

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* ✅ Share Section */}
      <div className="share-section">
        <h4>Share This Blog:</h4>
        <div className="share-icons">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="icon whatsapp" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="icon facebook" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="icon twitter" />
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram className="icon telegram" />
          </a>
        </div>
      </div>

      {/* ✅ Comment Section */}
      <CommentSection blogId={id} />
    </div>
  );
};

export default BlogDetails;
