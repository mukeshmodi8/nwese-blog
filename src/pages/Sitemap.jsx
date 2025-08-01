import React, { useEffect, useState } from "react";
import { fetchAllBlogs } from "../data/blogService"; // blogService.js से import

const Sitemap = () => {
  const [xml, setXml] = useState("");

  useEffect(() => {
    const generateSitemap = async () => {
      const blogs = await fetchAllBlogs();

      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${blogs
            .map(
              (blog) => `
          <url>
            <loc>https://happyblogg.com/blogs/${blog.id}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>`
            )
            .join("")}
        </urlset>`;

      setXml(sitemapXml);
    };

    generateSitemap();
  }, []);

  return (
    <div>
      <pre>{xml}</pre>
    </div>
  );
};

export default Sitemap;
