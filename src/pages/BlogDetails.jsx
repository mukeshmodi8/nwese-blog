import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogs from "../data/blogs";
import { Helmet } from "react-helmet";
import { stripHtml } from "string-strip-html";
import CommentSection from "../components/CommentSection";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaTelegram,
  FaLink,
} from "react-icons/fa";
import "../styles/blog.css";
import "./BlogDetails.css";

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
  const blogTitle = blog.title;
  const blogImage = `https://nwese-blog-ncmd.vercel.app${blog.image}`;
  const blogDescription = stripHtml(blog.content).result.slice(0, 150);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentUrl);
    alert("🔗 Link copied to clipboard!");
  };

  return (
    <div className="blog-details-container">
      {/* ✅ SEO + Helmet */}
      <Helmet>
        <title>{blog.title} | Mr. Happy Blog</title>
        <meta name="description" content={blogDescription} />

        {/* Open Graph */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blogDescription} />
        <meta property="og:image" content={blogImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blogDescription} />
        <meta name="twitter:image" content={blogImage} />

        {/* Canonical */}
        <link rel="canonical" href={currentUrl} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            image: blogImage,
            author: {
              "@type": "Person",
              name: "Mr. Happy",
            },
            publisher: {
              "@type": "Organization",
              name: "NWese Blog",
              logo: {
                "@type": "ImageObject",
                url: "https://nwese-blog-ncmd.vercel.app/logo.png",
              },
            },
            datePublished: blog.publishedAt,
            description: `जानिए - ${blog.title} | NWese हिंदी ब्लॉग में विस्तार से पढ़ें।`,
          })}
        </script>
      </Helmet>

      {/* ✅ Blog Content */}
      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-date">{new Date(blog.publishedAt).toLocaleDateString()}</p>
      <img className="blog-image" src={blog.image} alt={blog.title} />
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* ✅ Share Buttons */}
      <div className="share-section">
        <h4>📤 Share This Blog:</h4>
        <div className="share-icons">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`📢 ${blogTitle}\n🔗 ${currentUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on WhatsApp"
          >
            <FaWhatsapp className="icon whatsapp" />
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
          >
            <FaFacebook className="icon facebook" />
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`📢 ${blogTitle} 🔗 ${currentUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Twitter"
          >
            <FaTwitter className="icon twitter" />
          </a>

          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blogTitle)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Telegram"
          >
            <FaTelegram className="icon telegram" />
          </a>

          <button onClick={handleCopy} className="copy-button" title="Copy Blog Link">
            <FaLink className="icon link" />
          </button>
        </div>
      </div>

      {/* ✅ Comments */}
      <CommentSection blogId={id} />
    </div>
  );
};

export default BlogDetails;
