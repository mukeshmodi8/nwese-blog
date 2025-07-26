import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../data/firebase";
import { Helmet } from "react-helmet";
import { stripHtml } from "string-strip-html";
import CommentSection from "../components/CommentSection";
import AdSenseAd from "../components/AdSenseAd";
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
  const [suggestedBlog, setSuggestedBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const staticBlog = staticBlogs.find((b) => b.id === id);
        if (staticBlog) {
          setBlog(staticBlog);
          setLoading(false);
          // Suggest any other blog
          const otherBlogs = staticBlogs.filter((b) => b.id !== id);
          const random = otherBlogs[Math.floor(Math.random() * otherBlogs.length)];
          setSuggestedBlog(random);
          return;
        }

        const blogRef = doc(firestore, "blogs", id);
        const blogSnap = await getDoc(blogRef);
        if (blogSnap.exists()) {
          const fetchedBlog = { id: blogSnap.id, ...blogSnap.data() };
          setBlog(fetchedBlog);
          const otherBlogs = staticBlogs.filter((b) => b.id !== blogSnap.id);
          const random = otherBlogs[Math.floor(Math.random() * otherBlogs.length)];
          setSuggestedBlog(random);
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
          <img src="/logo.jpg" alt="Mr. Happy Blog" className="animated-logo" />
        </div>
        <p className="loading-text">📖 ब्लॉग लोड हो रहा है...</p>
      </div>
    );
  }

  if (!blog) return <h1>❌ Blog Not Found</h1>;

  const blogTitle = blog.title;
  const blogImage = blog.image;
  const currentUrl = `https://happyblogg.com/blogs/${id}`;
  const blogDescription = stripHtml(
    Array.isArray(blog.content)
      ? blog.content.map((b) => b.text).join(" ")
      : blog.content
  ).result.slice(0, 150);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentUrl);
    alert("🔗 Link copied to clipboard!");
  };

  const renderBlogContent = () => {
    if (!Array.isArray(blog.content)) {
      return (
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      );
    }

    return (
      <div className="blog-content">
        {blog.content.map((block, index) => {
          if (block.type === "h1") return <h2 key={index}>{block.text}</h2>;
          if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
          if (block.type === "h3") return <h3 key={index}>{block.text}</h3>;
          if (block.type === "img")
            return (
              <img
                key={index}
                src={block.src}
                alt={block.alt || ""}
                className="blog-image"
              />
            );
          return <p key={index}>{block.text}</p>;
        })}
      </div>
    );
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

      {/* <AdSenseAd /> */}

      {renderBlogContent()}

      {/* <AdSenseAd /> */}

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


      {/* ✅ Suggested Blog With Image */}
      {suggestedBlog && (
        <div className="suggested-blog">
          <hr />
          <h3 className="suggested-title">📝 और ब्लॉग पढ़ें</h3>
          <Link to={`/blogs/${suggestedBlog.id}`} className="suggested-card">
            <img
              src={suggestedBlog.image}
              alt={suggestedBlog.title}
              className="suggested-image"
            />
            <div className="suggested-text">
              <h4>{suggestedBlog.title}</h4>
              <p>👉 पूरा ब्लॉग पढ़ें</p>
            </div>
          </Link>
        </div>
      )}

      {/* <AdSenseAd /> */}
      <CommentSection blogId={id} />
      {/* <AdSenseAd /> */}
    </div>
  );
};

export default BlogDetails;
