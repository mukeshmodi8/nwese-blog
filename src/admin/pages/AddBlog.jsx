import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../data/firebase";
import "./AddBlog.css";
import Swal from "sweetalert2";

const generateId = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const AddBlog = () => {
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    image: "",
    readingTime: "",
    category: "",
    content: "",
  });

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = generateId(blog.title);
    const autoContent = `<h1>${blog.title}</h1>\n${blog.content}`;

    const blogData = {
      id,
      title: blog.title,
      image: blog.image,
      publishedAt: new Date().toISOString(),
      readingTime: blog.readingTime || "5 min",
      category: blog.category,
      content: autoContent,
    };

    try {
      await setDoc(doc(firestore, "blogs", id), blogData);

      await Swal.fire({
        icon: "success",
        title: "✅ Blog added!",
        text: "Your blog was added successfully!",
        confirmButtonColor: "#3085d6",
      });

      navigate("/blogs");
    } catch (error) {
      console.error("Error adding blog:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="add-blog-container">
      <h2>Add New Blog</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          required
        />

        <input
          type="text"
          name="image"
          value={blog.image}
          onChange={handleChange}
          placeholder="Paste image URL"
          required
        />

        <input
          type="text"
          name="readingTime"
          value={blog.readingTime}
          onChange={handleChange}
          placeholder="Reading time (e.g. 5 min)"
        />

        <input
          type="text"
          name="category"
          value={blog.category}
          onChange={handleChange}
          placeholder="Blog category (e.g. Tech, Travel)"
          required
        />

        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          placeholder="Write your blog content here... (HTML supported)"
          rows={10}
          required
        ></textarea>

        <button type="submit">Submit Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;