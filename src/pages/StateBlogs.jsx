import React from "react";
import { useParams } from "react-router-dom";
import blogs from "../data/blogs";
import { Link } from "react-router-dom";
import "./Blogs.css";

const StateBlogs = () => {
  const { stateName } = useParams();
  const filteredBlogs = blogs.filter((blog) => blog.state === stateName);

  return (
    <div className="container py-4">
      <h1>📍 {stateName} के ब्लॉग्स</h1>

      {filteredBlogs.length === 0 ? (
        <p>कोई ब्लॉग उपलब्ध नहीं है इस राज्य के लिए।</p>
      ) : (
        <div className="blog-grid">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <img src={blog.image} alt={blog.title} className="blog-image" />
              <div className="blog-content">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-excerpt">
                  {blog.content.slice(0, 130).replace(/<[^>]+>/g, "")}...
                </p>
                <p className="blog-meta">
                  📅 {new Date(blog.publishedAt).toLocaleDateString()} | ⏱️ {blog.readingTime}
                </p>
                <Link to={`/blogs/${encodeURIComponent(blog.id)}`} className="blog-link">
                  और पढ़ें →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StateBlogs;
