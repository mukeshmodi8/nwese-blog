const fs = require("fs");
const blogs = require("./src/data/blogs.data");


const BASE_URL = "https://happyblogg.com";

const staticUrls = [
  {
    loc: `${BASE_URL}/`,
    priority: "1.0",
  },
];

const blogUrls = blogs.map((blog) => {
  const encodedSlug = encodeURIComponent(blog.id.trim().replace(/\s+/g, "-"));
  return {
    loc: `${BASE_URL}/blogs/${encodedSlug}`,
    priority: "0.8",
  };
});

const allUrls = [...staticUrls, ...blogUrls];

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `<url>
  <loc>${url.loc}</loc>
  <priority>${url.priority}</priority>
</url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync("./public/sitemap.xml", xmlContent, "utf8");
console.log("✅ Sitemap generated successfully!");
