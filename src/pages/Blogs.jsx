import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../data/firebase";
import staticBlogs from "../data/blogs"; 
import "./Blogs.css";

const Blogs = () => {
  const { selectedCategory } = useCategory();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "blogs"));
        const firebaseBlogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const allBlogs = [...firebaseBlogs, ...staticBlogs]; 
        allBlogs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)); // optional sorting

        console.log("📥 Total blogs:", allBlogs.length);
        setBlogs(allBlogs);
      } catch (error) {
        console.error("❌ Error fetching blogs:", error);
        setBlogs(staticBlogs); 
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter(
          (b) =>
            b.category?.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
        );

  const handleShare = (title, id) => {
    const url = `${window.location.origin}/blogs/${encodeURIComponent(id)}`;
    const text = `📖 ${title} - पढ़िए यहां: ${url}`;
    if (navigator.share) {
      navigator.share({ title, text, url });
    } else {
      navigator.clipboard.writeText(text);
      alert("✅ Link copied to clipboard");
    }
  };

  return (
    <div className="container py-4">
      <h1>
        {selectedCategory === "All"
          ? "📰 लेटेस्ट ब्लॉग्स"
          : `📂 ${selectedCategory} ब्लॉग्स`}
      </h1>

      {filteredBlogs.length === 0 ? (
        <p style={{ padding: "1rem", color: "gray" }}>
          😕 इस श्रेणी में अभी कोई ब्लॉग उपलब्ध नहीं है।
        </p>
      ) : (
        <div className="blog-grid">
          {filteredBlogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              <img
                src={blog.image || "/images/default.jpg"}
                alt={blog.title}
                className="blog-image"
              />
              <div className="blog-content">
                <h2 className="blog-title">{blog.title || "No Title"}</h2>

                {blog.state && (
                  <p className="blog-state">📍 राज्य: {blog.state}</p>
                )}

                <p className="blog-excerpt">
                  {blog.content
                    ? blog.content.slice(0, 130).replace(/<[^>]+>/g, "")
                    : "❗ Content not available"}...
                </p>

                <p className="blog-meta">
                  📅{" "}
                  {blog.publishedAt
                    ? new Date(blog.publishedAt).toLocaleDateString()
                    : "❓ Unknown date"}{" "}
                  | ⏱️ {blog.readingTime || "?"}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
