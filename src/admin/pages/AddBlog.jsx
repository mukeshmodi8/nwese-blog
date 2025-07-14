import React, { useState } from "react";
import { firestore } from "../../data/firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./AddBlog.css";


const AddBlog = () => {
    const [blog, setBlog] = useState({
        title: "",
        image: "",
        category: "",
        readingTime: "",
        content: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const generateId = (title) =>
        title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const id = generateId(blog.title); // ✅ slug

        const blogData = {
            id,
            title: blog.title,
            image: blog.image,
            publishedAt: new Date().toISOString(),
            readingTime: blog.readingTime || "5 min",
            category: blog.category,
            content: blog.content,
        };

        try {
            await setDoc(doc(firestore, "blogs", id), blogData); // ✅ use setDoc instead of addDoc
            alert("✅ Blog added successfully!");
            navigate("/blogs");
        } catch (error) {
            console.error("❌ Error adding blog:", error);
            alert("❌ Failed to add blog");
        }
    };

    return (
        <div className="add-blog-container">
            <h2>➕ Add New Blog</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={blog.title} onChange={handleChange} required />
                <input type="text" name="image" placeholder="Image URL" value={blog.image} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" value={blog.category} onChange={handleChange} required />
                <input type="text" name="readingTime" placeholder="Reading Time (e.g., 3 min)" value={blog.readingTime} onChange={handleChange} />
                <textarea name="content" placeholder="Content (HTML allowed)" value={blog.content} onChange={handleChange} rows={5} required />
                <button type="submit">✅ Add Blog</button>
            </form>
        </div>

    );
};

export default AddBlog;
