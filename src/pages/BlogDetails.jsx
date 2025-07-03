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
      const modifiedContent = insertAdsInContent(blog.content);
      setHtmlContent(modifiedContent);
    }
  }, [blog]);

  // ✅ Mid-Article Ad Insertion (after every 3 <p>)
  const insertAdsInContent = (htmlString) => {
    const adPlaceholder = `
      <div class="mid-article-ad" style="margin: 30px 0; text-align: center;">
        <script async="async" data-cfasync="false" src="//pl26954151.profitableratecpm.com/9811eb47cec886e50887ad29cf5a19f2/invoke.js"></script>
        <div id="container-9811eb47cec886e50887ad29cf5a19f2"></div>
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

  useEffect(() => {
    // ✅ Global Popunder Script (loads once)
    const popScript = document.createElement("script");
    popScript.src = "//pl26953552.profitableratecpm.com/6a/39/23/6a392388ddb1d4aa0f2247847e971468.js";
    popScript.async = true;
    document.body.appendChild(popScript);

    // ✅ Bottom Container Ad (invoke.js)
    const bottomScript = document.createElement("script");
    bottomScript.src = "//pl26954151.profitableratecpm.com/9811eb47cec886e50887ad29cf5a19f2/invoke.js";
    bottomScript.async = true;
    bottomScript.setAttribute("data-cfasync", "false");
    const container = document.getElementById("bottom-ad-container");
    if (container) {
      container.appendChild(bottomScript);
    }

    // Cleanup scripts on unmount
    return () => {
      document.body.removeChild(popScript);
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

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

      <div className="blog-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />

      {/* ✅ Bottom Ad Container */}
      <div id="bottom-ad-container" style={{ textAlign: "center", margin: "40px 0" }}></div>

      {/* ✅ Comment Section */}
      <CommentSection blogId={id} />
    </div>
  );
};

export default BlogDetails;
