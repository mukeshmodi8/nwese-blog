import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../data/firebase";
import { Helmet } from "react-helmet";
import Seo from "../components/Seo";


const SingleBlog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogRef = doc(firestore, "blogs", id);
      const docSnap = await getDoc(blogRef);
      if (docSnap.exists()) {
        setBlogData(docSnap.data());
      }
    };
    fetchBlog();
  }, [id]);

  const title = blogData?.title || "Blog Title";
  const description = blogData?.content?.slice(0, 150) || "Blog Description";
  const image = blogData?.image || "https://happyblogg.com/default-image.jpg";

  return (
    <div>
      <Helmet>
        <title>{title} | HappyBlogg</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* अब blog का main content */}
      <h1>{title}</h1>
      <p>{blogData?.content}</p>
      <img src={image} alt={title} />
    </div>
  );
};

export default SingleBlog;
