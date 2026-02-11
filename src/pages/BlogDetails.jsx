import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../data/firebase";
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
import staticBlogs from "../data/blogs";
import "../styles/blog.css";
import "./BlogDetails.css";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const staticBlog = staticBlogs.find((b) => b.id === id);
        if (staticBlog) {
          setBlog(staticBlog);
          const others = staticBlogs.filter((b) => b.id !== id).slice(0, 3);
          setSuggestedBlogs(others);
          setLoading(false);
          return;
        }

        const blogRef = doc(firestore, "blogs", id);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
          const fetchedBlog = { id: blogSnap.id, ...blogSnap.data() };
          setBlog(fetchedBlog);
          const others = staticBlogs
            .filter((b) => b.id !== blogSnap.id)
            .slice(0, 3);
          setSuggestedBlogs(others);
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

  const rawText = stripHtml(
    Array.isArray(blog.content)
      ? blog.content.map((b) => b.text).join(" ")
      : blog.content
  ).result;

  const autoDescription = rawText.slice(0, 155);

  const finalTitle = blog.metaTitle
    ? blog.metaTitle
    : `${blog.title} | Mr Happy Blog`;

  const finalDescription = blog.metaDescription
    ? blog.metaDescription
    : autoDescription;

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
                alt={block.alt || blog.title}
                className="blog-image"
                loading="lazy"
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
        <title>{finalTitle}</title>
        <meta name="description" content={finalDescription} />
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={finalDescription} />
        <meta property="og:image" content={blogImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={finalTitle} />
        <meta name="twitter:description" content={finalDescription} />
        <meta name="twitter:image" content={blogImage} />
        <link rel="canonical" href={currentUrl} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            image: blog.image,
            datePublished: blog.publishedAt,
            author: {
              "@type": "Person",
              name: "Mr Happy"
            },
            publisher: {
              "@type": "Organization",
              name: "Mr Happy Blog",
              logo: {
                "@type": "ImageObject",
                url: "https://happyblogg.com/logo.jpg"
              }
            },
            description: finalDescription,
            mainEntityOfPage: currentUrl
          })}
        </script>
      </Helmet>

      <h1 className="blog-title">{blog.title}</h1>

      <p className="blog-date">
        {blog.publishedAt
          ? new Date(blog.publishedAt).toLocaleDateString()
          : ""}
      </p>

      <img className="blog-image" src={blog.image} alt={blog.title} />

      {renderBlogContent()}

      {/* ✅ Share Section (UNCHANGED) */}
      <div className="share-section">
        <h4>📤 Share This Blog:</h4>
        <div className="share-icons">
          <a href={`https://wa.me/?text=${encodeURIComponent(`📢 ${blogTitle}\n🔗 ${currentUrl}`)}`} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="icon whatsapp" />
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="icon facebook" />
          </a>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`📢 ${blogTitle} 🔗 ${currentUrl}`)}`} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="icon twitter" />
          </a>
          <a href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blogTitle)}`} target="_blank" rel="noopener noreferrer">
            <FaTelegram className="icon telegram" />
          </a>
          <button onClick={handleCopy} className="copy-button">
            <FaLink className="icon link" />
          </button>
        </div>
      </div>

      {/* ✅ Suggested Blogs (UNCHANGED) */}
      {suggestedBlogs && suggestedBlogs.length > 0 && (
        <div className="suggested-blog">
          <hr />
          <h3 className="suggested-title">📝 और ब्लॉग पढ़ें</h3>
          <div className="suggested-blog-list">
            {suggestedBlogs.map((blog) => (
              <Link to={`/blogs/${blog.id}`} key={blog.id} className="suggested-card">
                <img src={blog.image} alt={blog.title} className="suggested-image" />
                <div className="suggested-text">
                  <h4>{blog.title}</h4>
                  <p>👉 पूरा ब्लॉग पढ़ें</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <CommentSection blogId={id} />
    </div>
  );
};

export default BlogDetails;
