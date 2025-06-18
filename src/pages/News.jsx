import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://newsapi.org/v2/top-headlines?country=in&apiKey=YOUR_API_KEY")
      .then((res) => setArticles(res.data.articles))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">📰 Latest News</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((news, i) => (
          <div key={i} className="p-4 border rounded shadow hover:shadow-lg transition duration-300">
            {news.urlToImage && (
              <img
                src={news.urlToImage}
                alt={news.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}
            <h3 className="font-semibold text-lg mb-1">{news.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{news.description}</p>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
