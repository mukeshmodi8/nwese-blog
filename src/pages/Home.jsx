import React, { useEffect, useState } from "react";
import staticBlogs from "../data/blogs"; // Static blogs
import { Link } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";
import { formatDistanceToNow, format } from "date-fns";
import { Helmet } from "react-helmet";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../data/firebase"; // Firebase setup
import "./Home.css";

const Home = () => {
  const { selectedCategory } = useCategory();
  const baseUrl = window.location.origin;

  const [blogs, setBlogs] = useState([]);
  const [showBanner, setShowBanner] = useState(true);

  // 🔁 Fetch Firebase + Static Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "blogs"));
        const firebaseBlogs = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });

        const allBlogs = [...firebaseBlogs, ...staticBlogs];
        allBlogs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        setBlogs(allBlogs);
      } catch (error) {
        console.error("❌ Error fetching blogs:", error);
        setBlogs(staticBlogs); // fallback
      }
    };

    fetchBlogs();
  }, []);

  // 🔻 Hide banner on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowBanner(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Category Filter
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter(
          (b) =>
            (b.category || "").trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
        );

  return (
    <div className="home-ui jagran-style">
      <Helmet>
        <title>Mr Happy Blog | Hindi Tech & News Articles</title>
        <meta
          name="description"
          content="हिंदी में पढ़ें टेक्नोलॉजी, न्यूज़ और ज़रूरी ब्लॉग्स Mr. Happy Blog पर!"
        />
        <meta property="og:title" content="Mr Happy Blog | Hindi Tech & News Articles" />
        <meta
          property="og:description"
          content="हिंदी में पढ़ें टेक्नोलॉजी, न्यूज़ और ज़रूरी ब्लॉग्स Mr. Happy Blog पर!"
        />
        <meta property="og:image" content={`${baseUrl}/logo.jpg`} />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mr Happy Blog | Hindi Tech & News Articles" />
        <meta
          name="twitter:description"
          content="हिंदी में पढ़ें टेक्नोलॉजी, न्यूज़ और ज़रूरी ब्लॉग्स Mr. Happy Blog पर!"
        />
        <meta name="twitter:image" content={`${baseUrl}/logo.png`} />
        <link rel="canonical" href={baseUrl} />
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

      {/* ✅ Blog UI */}
      <main className="news-section">
        <h2>
          {selectedCategory === "All"
            ? "📝 लेटेस्ट ब्लॉग्स"
            : `🗂️ ${selectedCategory} ब्लॉग्स`}
        </h2>

        {/* ✅ Download Banner — अब यहां रखा गया है */}
        {/* {showBanner && (
          <div className="app-banner mb-4">
            📱 Best experience on app –{" "}
            <Link to="/download" className="banner-link">
              Download Now
            </Link>
          </div>
        )} */}

        {filteredBlogs.length === 0 ? (
          <p style={{ padding: "1rem", color: "gray" }}>
            😕 इस श्रेणी में अभी कोई ब्लॉग उपलब्ध नहीं है।
          </p>
        ) : (
          <div className="news-cards">
            {filteredBlogs.map((blog) => {
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
                          (blog.content || "")
                            .replace(/<[^>]+>/g, "")
                            .slice(0, 80) + "...",
                      }}
                    ></div>
                    <p className="meta">
                      📅{" "}
                      {blog.publishedAt
                        ? format(new Date(blog.publishedAt), "dd MMM yyyy")
                        : "?"}{" "}
                      | ⏱️ {blog.readingTime || "?"} | ⌛{" "}
                      {blog.publishedAt
                        ? formatDistanceToNow(new Date(blog.publishedAt), {
                            addSuffix: true,
                          })
                        : ""}
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
