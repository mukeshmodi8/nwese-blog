export default async function sitemap() {
  const baseUrl = "https://www.happyblogg.com";

  // yahan baad me Firebase se blogs laa sakte ho
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      priority: 0.9,
    },
  ];
}
