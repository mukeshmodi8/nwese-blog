import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../data/firebase";
import { Helmet } from "react-helmet";
import { stripHtml } from "string-strip-html";
import CommentSection from "../components/CommentSection";
import AdSenseAd from "../components/AdSenseAd"; // ✅ Ad component added
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaTelegram,
  FaLink,
} from "react-icons/fa";
import staticBlogs from "../data/blogs";
import "../styles/blog.css";
import "./BlogDetails.css";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const staticBlog = staticBlogs.find((b) => b.id === id);
        if (staticBlog) {
          setBlog(staticBlog);
          setLoading(false);
          return;
        }

        const blogRef = doc(firestore, "blogs", id);
        const blogSnap = await getDoc(blogRef);
        if (blogSnap.exists()) {
          setBlog({ id: blogSnap.id, ...blogSnap.data() });
        } else {
          setBlog(null);
        }
      } catch (err) {
        console.error("❌ Error fetching blog:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

 if (loading) {
  return (
    <div className="loading-container">
      <div className="logo-wrapper">
        <img
          src="/logo.jpg"
          alt="Mr. Happy Blog"
          className="animated-logo"
        />
      </div>
      <p className="loading-text">📖 ब्लॉग लोड हो रहा है...</p>
    </div>
  );
}



  if (!blog) return <h1>❌ Blog Not Found</h1>;

  // const currentUrl = window.location.href;
  const blogTitle = blog.title;
  const blogImage = blog.image;
  const blogDescription = stripHtml(blog.content).result.slice(0, 150);
  const currentUrl = `https://happyblogg.com/blogs/${id}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentUrl);
    alert("🔗 Link copied to clipboard!");
  };

  return (
    <div className="blog-details-container">
      <Helmet>
        <title>{blog.title} | Mr. Happy Blog</title>
        <meta name="description" content={blogDescription} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blogDescription} />
        <meta property="og:image" content={blogImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blogDescription} />
        <meta name="twitter:image" content={blogImage} />
        <link rel="canonical" href={currentUrl} />
      </Helmet>

      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-date">
        {blog.publishedAt
          ? new Date(blog.publishedAt).toLocaleDateString()
          : ""}
      </p>
      <img className="blog-image" src={blog.image} alt={blog.title} />

      {/* ✅ Ad #1: After Image */}
      <AdSenseAd />

      {/* ✅ Blog Content */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* ✅ Ad #2: After content */}
      <AdSenseAd />

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

      {/* ✅ Ad #3: After share section */}
      <AdSenseAd />

      {/* ✅ Comment Section */}
      <CommentSection blogId={id} />

      {/* ✅ Ad #4: At the very end */}
      <AdSenseAd />
    </div>
  );
};

export default BlogDetails;
