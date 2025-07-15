import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../data/firebase";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  
  const fetchBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "blogs"));
      const blogsData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setBlogs(blogsData);
    } catch (error) {
      console.error("❌ Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

 
const handleDelete = async (id) => {
  const confirmResult = await Swal.fire({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this blog!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (confirmResult.isConfirmed) {
    try {
      const ref = doc(firestore, "blogs", id);
      await deleteDoc(ref);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));

      Swal.fire("Deleted!", "Your blog has been deleted.", "success");
    } catch (err) {
      console.error("❌ Delete Error:", err.message);
      Swal.fire("Error!", err.message, "error");
    }
  }
};



  const handleEditChange = (e) => {
    setEditingBlog({ ...editingBlog, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const blogRef = doc(firestore, "blogs", editingBlog.id);
      await updateDoc(blogRef, {
        title: editingBlog.title,
        category: editingBlog.category,
        image: editingBlog.image,
        content: editingBlog.content,
      });
      alert("✅ Blog updated!");
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      alert("❌ Update failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>📝 Manage Blogs</h2>

      {blogs.length === 0 ? (
        <p>😕 कोई ब्लॉग नहीं मिला।</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>📛 Title</th>
              <th style={thStyle}>📂 Category</th>
              <th style={thStyle}>🗓️ Date</th>
              <th style={thStyle}>⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td style={tdStyle}>{blog.title}</td>
                <td style={tdStyle}>{blog.category}</td>
                <td style={tdStyle}>
                  {blog.publishedAt
                    ? new Date(blog.publishedAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => setEditingBlog(blog)}
                    style={editBtn}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    style={deleteBtn}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Modal */}
      {editingBlog && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3>✏️ Edit Blog</h3>
            <input
              name="title"
              value={editingBlog.title}
              onChange={handleEditChange}
              placeholder="Title"
              style={inputStyle}
            />
            <input
              name="category"
              value={editingBlog.category}
              onChange={handleEditChange}
              placeholder="Category"
              style={inputStyle}
            />
            <input
              name="image"
              value={editingBlog.image}
              onChange={handleEditChange}
              placeholder="Image URL"
              style={inputStyle}
            />
            <textarea
              name="content"
              value={editingBlog.content}
              onChange={handleEditChange}
              rows="5"
              placeholder="Content"
              style={textareaStyle}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setEditingBlog(null)} style={cancelBtn}>
                ❌ Cancel
              </button>
              <button onClick={handleUpdate} style={saveBtn}>
                ✅ Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 👉 Inline styles
const thStyle = { border: "1px solid #ccc", padding: "10px" };
const tdStyle = { border: "1px solid #ccc", padding: "10px" };

const btnBaseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px", // icon और text के बीच gap
  padding: "8px 16px", // बराबर padding
  minWidth: "80px", // दोनों बटन कम से कम इतने चौड़े होंगे
  height: "40px",
  fontSize: "14px",
  fontWeight: "500",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const editBtn = {
  ...btnBaseStyle,
  backgroundColor: "#007bff",
  color: "#fff",
};

const deleteBtn = {
  ...btnBaseStyle,
  backgroundColor: "#dc3545",
  color: "#fff",
};


const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  background: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalBox = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "500px",
};

const cancelBtn = {
  padding: "8px 16px",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const saveBtn = {
  padding: "8px 16px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ManageBlogs;
