import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../data/firebase";
import Swal from "sweetalert2";
import { ArrowLeft, Type, FileText, Send, ImagePlus } from "lucide-react";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import "./AddBlog.css";

const generateId = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const AddBlog = () => {
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    image: "",
    readingTime: "",
    category: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  /* =============================
     FEATURED IMAGE UPLOAD
  ============================== */
  const handleFeaturedImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setBlog((prev) => ({ ...prev, image: url }));
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  /* =============================
     INSERT IMAGE IN CONTENT
  ============================== */
  const handleInsertImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);
      try {
        const url = await uploadToCloudinary(file);
        setBlog((prev) => ({
          ...prev,
          content:
            prev.content +
            `\n<img src="${url}" alt="Blog image" loading="lazy" />\n`,
        }));
      } catch (err) {
        Swal.fire("Error", "Image upload failed", "error");
      } finally {
        setUploading(false);
      }
    };

    input.click();
  };

  /* =============================
     PUBLISH BLOG
  ============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog.image) {
      Swal.fire("Missing", "Please upload featured image", "warning");
      return;
    }

    if (!blog.metaTitle || !blog.metaDescription) {
      Swal.fire("Missing", "SEO fields are required", "warning");
      return;
    }

    if (!blog.title || !blog.content) {
      Swal.fire("Missing", "Title & content are required", "warning");
      return;
    }

    const id = generateId(blog.title);

    const blogData = {
      id,
      slug: id,
      title: blog.title,
      image: blog.image,
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
      readingTime: blog.readingTime || "5 min",
      category: blog.category,
      publishedAt: new Date().toISOString(),
      content: `<h1>${blog.title}</h1>\n${blog.content}`,
    };

    try {
      await setDoc(doc(firestore, "blogs", id), blogData);
      await Swal.fire("Success", "Blog Published!", "success");
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Publish error:", error);
      Swal.fire("Error", "Failed to publish blog", "error");
    }
  };

  return (
    <div className="add-blog-wrapper">
      {uploading && (
        <div className="upload-overlay">
          <div className="upload-box">
            <div className="spinner"></div>
            <p>Uploading, please wait…</p>
          </div>
        </div>
      )}

      <div className="container py-4" style={{ maxWidth: "1000px" }}>
        {/* HEADER */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="back-btn-custom">
            <ArrowLeft size={20} />
          </button>
          <h2 className="fw-bold m-0">Create New Blog</h2>
        </div>

        <form onSubmit={handleSubmit} className="row g-4">
          {/* LEFT */}
          <div className="col-lg-8">
            <div className="blog-card-custom p-4">
              <label className="custom-label">
                <Type size={16} /> Blog Title
              </label>
              <input
                type="text"
                name="title"
                className="input-field-custom mb-3"
                value={blog.title}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="btn btn-sm btn-outline-primary mb-2"
                onClick={handleInsertImage}
              >
                <ImagePlus size={16} /> Insert Image in Article
              </button>

              <label className="custom-label">
                <FileText size={16} /> Content (HTML allowed)
              </label>
              <textarea
                name="content"
                className="input-field-custom textarea-custom"
                rows={12}
                value={blog.content}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-4">
            <div className="blog-card-custom p-4 sticky-top" style={{ top: 20 }}>
              <h5 className="fw-bold mb-3">SEO & Settings</h5>

              <label className="custom-label">Featured Image</label>
              <input
                type="file"
                accept="image/*"
                className="input-field-custom mb-2"
                onChange={handleFeaturedImage}
              />

              {blog.image && (
                <img
                  src={blog.image}
                  alt="Preview"
                  className="img-fluid rounded mb-3"
                />
              )}

              <label className="custom-label">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                className="input-field-custom mb-2"
                value={blog.metaTitle}
                onChange={handleChange}
                required
              />

              <label className="custom-label">Meta Description</label>
              <textarea
                name="metaDescription"
                className="input-field-custom mb-2"
                rows={3}
                value={blog.metaDescription}
                onChange={handleChange}
                required
              />

              <label className="custom-label">Category</label>
              <input
                type="text"
                name="category"
                className="input-field-custom mb-2"
                value={blog.category}
                onChange={handleChange}
                required
              />

              <label className="custom-label">Reading Time</label>
              <input
                type="text"
                name="readingTime"
                className="input-field-custom mb-3"
                value={blog.readingTime}
                onChange={handleChange}
                placeholder="5 min"
              />

              <button type="submit" className="publish-btn-custom w-100">
                <Send size={18} /> Publish Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
