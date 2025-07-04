import React from "react";
import blogs from "../data/blogs";
import { Link } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";
import { formatDistanceToNow, format } from "date-fns";
import { Helmet } from "react-helmet";
import "./Home.css";

const Home = () => {
  const { selectedCategory } = useCategory();
  const baseUrl = window.location.origin;

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  return (
    <div className="home-ui jagran-style">
      <Helmet>
        <title>Mr Happy Blog | Hindi Tech & News Articles</title>
      </Helmet>

      <main className="news-section">
        <h2>{selectedCategory === "All" ? "लेटेस्ट ब्लॉग्स" : `${selectedCategory} ब्लॉग्स`}</h2>
        <div className="news-cards">
          {filteredBlogs.map((blog) => {
            const shareUrl = `${baseUrl}/blogs/${encodeURIComponent(blog.id)}`;
            return (
              <div key={blog.id} className="news-card">
                <img src={blog.image} alt={blog.title} className="news-img" />
                <div className="news-content">
                  <h3>{blog.title}</h3>
                  <div
                    className="excerpt"
                    dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 60) + "..." }}
                  ></div>
                  <p className="meta">
                    📅 {format(new Date(blog.publishedAt), "dd MMM yyyy")} | ⏱️ {blog.readingTime} | ⌛ {formatDistanceToNow(new Date(blog.publishedAt), { addSuffix: true })}
                  </p>
                  <Link to={`/blogs/${encodeURIComponent(blog.id)}`} className="read-btn">और पढ़ें</Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;