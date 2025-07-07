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
          (b) =>
            b.category?.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
        );

  return (
    <div className="home-ui jagran-style">
      {/* ✅ Helmet SEO */}
      <Helmet>
        <title>Mr Happy Blog | Hindi Tech & News Articles</title>
        <meta
          name="description"
          content="हिंदी में पढ़ें टेक्नोलॉजी, न्यूज़ और ज़रूरी ब्लॉग्स Mr. Happy Blog पर!"
        />
        <meta
          property="og:title"
          content="Mr Happy Blog | Hindi Tech & News Articles"
        />
        <meta
          property="og:description"
          content="हिंदी में पढ़ें टेक्नोलॉजी, न्यूज़ और ज़रूरी ब्लॉग्स Mr. Happy Blog पर!"
        />
        <meta
          property="og:image"
          content={`${baseUrl}/logo.jpg`} 
        />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Mr Happy Blog | Hindi Tech & News Articles"
        />
        <meta
          name="twitter:description"
          content="हिंदी में पढ़ें टेक्नोलॉजी, न्यूज़ और ज़रूरी ब्लॉग्स Mr. Happy Blog पर!"
        />
        <meta
          name="twitter:image"
          content={`${baseUrl}/logo.png`}
        />

        {/* Canonical */}
        <link rel="canonical" href={baseUrl} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Mr Happy Blog",
            url: baseUrl,
            description:
              "हिंदी में पढ़ें टेक्नोलॉजी, न्यूज़ और ज़रूरी ब्लॉग्स Mr. Happy Blog पर!",
            publisher: {
              "@type": "Organization",
              name: "Mr. Happy",
              logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.png`,
              },
            },
          })}
        </script>
      </Helmet>

      {/* ✅ Main Blog UI */}
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
                            .replace(/<[^>]+>/g, "")
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
