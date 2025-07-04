// src/pages/Home.jsx
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

  // ✅ Filter Blogs by Selected Category
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter(
          (b) => b.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
        );

  return (
    <div className="home-ui jagran-style">
      <Helmet>
        <title>Mr Happy Blog | Hindi Tech & News Articles</title>
        <meta name="description" content="हिंदी में पढ़ें टेक्नोलॉजी, न्यूज़ और ज़रूरी ब्लॉग्स Mr. Happy Blog पर!" />
      </Helmet>

      <main className="news-section">
        <h2>
          {selectedCategory === "All"
            ? "📝 लेटेस्ट ब्लॉग्स"
            : `🗂️ ${selectedCategory} ब्लॉग्स`}
        </h2>

        {filteredBlogs.length === 0 ? (
          <p style={{ padding: "1rem", color: "gray" }}>
            😕 इस श्रेणी में अभी कोई ब्लॉग उपलब्ध नहीं है।
          </p>
        ) : (
          <div className="news-cards">
            {filteredBlogs.map((blog) => {
              const blogUrl = `${baseUrl}/blogs/${encodeURIComponent(blog.id)}`;

              return (
                <div key={blog.id} className="news-card">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="news-img"
                  />
                  <div className="news-content">
                    <h3>{blog.title}</h3>

                    <div
                      className="excerpt"
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.content
                            .replace(/<[^>]+>/g, "") // remove HTML tags
                            .slice(0, 80) + "...",
                      }}
                    ></div>

                    <p className="meta">
                      📅 {format(new Date(blog.publishedAt), "dd MMM yyyy")} | ⏱️{" "}
                      {blog.readingTime} | ⌛{" "}
                      {formatDistanceToNow(new Date(blog.publishedAt), {
                        addSuffix: true,
                      })}
                    </p>

                    <Link
                      to={`/blogs/${encodeURIComponent(blog.id)}`}
                      className="read-btn"
                    >
                      और पढ़ें →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
