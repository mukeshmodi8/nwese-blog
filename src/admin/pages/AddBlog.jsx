import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../data/firebase";

import Swal from "sweetalert2";

// SEO-friendly ID generator
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

    // Auto-wrap Title inside H1
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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          required
          className="w-full p-3 border rounded-md"
        />

        <input
          type="text"
          name="image"
          value={blog.image}
          onChange={handleChange}
          placeholder="Paste image URL"
          required
          className="w-full p-3 border rounded-md"
        />

        <input
          type="text"
          name="readingTime"
          value={blog.readingTime}
          onChange={handleChange}
          placeholder="Reading time (e.g. 5 min)"
          className="w-full p-3 border rounded-md"
        />

        <input
          type="text"
          name="category"
          value={blog.category}
          onChange={handleChange}
          placeholder="Blog category (e.g. Tech, Coding)"
          required
          className="w-full p-3 border rounded-md"
        />

        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          placeholder="Write your blog content here... (HTML supported)"
          rows={10}
          required
          className="w-full p-3 border rounded-md"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
