import React from "react";
import blogs from "../data/blogs";
import { Link } from "react-router-dom";
import "./Blogs.css";

const Blogs = () => {
  const handleShare = (title, id) => {
    const url = `${window.location.origin}/blogs/${encodeURIComponent(id)}`;
    const text = `📖 ${title} - पढ़िए यहां: ${url}`;
    if (navigator.share) {
      navigator.share({
        title,
        text,
        url,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert("Link copied to clipboard ✅");
    }
  };

  return (
    <div className="container py-4">
      <h1>📰 लेटेस्ट ब्लॉग्स</h1>
      <div className="blog-grid">
        {blogs.map((blog, index) => (
          <React.Fragment key={blog.id}>
            <div className="blog-card">
              <img src={blog.image} alt={blog.title} className="blog-image" />
              <div className="blog-content">
                <h2 className="blog-title">{blog.title}</h2>

                {/* ✅ राज्य दिखा रहे हैं */}
                <p className="blog-state">📍 राज्य: {blog.state}</p>

                <p className="blog-excerpt">
                  {blog.content.slice(0, 130).replace(/<[^>]+>/g, "")}...
                </p>
                <p className="blog-meta">
                  📅 {new Date(blog.publishedAt).toLocaleDateString()} | ⏱️{" "}
                  {blog.readingTime}
                </p>
                <div className="blog-actions">
                  <Link
                    to={`/blogs/${encodeURIComponent(blog.id)}`}
                    className="blog-link"
                  >
                    और पढ़ें →
                  </Link>
                  <button
                    className="share-button"
                    onClick={() => handleShare(blog.title, blog.id)}
                  >
                    🔗 शेयर
                  </button>
                </div>
              </div>
            </div>

            {/* Optional: हर 3 ब्लॉग के बाद Ad डाल सकते हो */}
            {/* {(index + 1) % 3 === 0 && <AdBanner />} */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
