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

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (blog && blog.content) {
      setHtmlContent(blog.content); // 🔻 Ads removed from here
    }
  }, [blog]);

  if (!blog) return <h1>Blog Not Found</h1>;

  return (
    <div className="blog-details-container">
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.title} />
      </Helmet>

      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-date">{new Date(blog.publishedAt).toLocaleDateString()}</p>
      <img className="blog-image" src={blog.image} alt={blog.title} />

      {/* ✅ Blog Content Without Ads */}
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />

      {/* ✅ Comment Section */}
      <CommentSection blogId={id} />
    </div>
  );
};

export default BlogDetails;
