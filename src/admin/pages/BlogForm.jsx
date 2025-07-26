import React, { useState } from "react";
import { firestore } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "blogs"), {
        title,
        content,
        createdAt: Timestamp.now(),
      });
      setTitle("");
      setContent("");
      alert("Blog Added");
    } catch (err) {
      console.error("Error adding blog:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Title (auto h1)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2"
      />
      <textarea
        placeholder="Content (HTML supported)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 h-40"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Blog
      </button>
    </form>
  );
};

export default BlogForm;
