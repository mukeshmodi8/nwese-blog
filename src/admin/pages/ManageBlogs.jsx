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
        await deleteDoc(doc(firestore, "blogs", id));
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
      Swal.fire("✅ Updated!", "Blog updated successfully.", "success");
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      Swal.fire("❌ Update Failed", error.message, "error");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📝 Manage Blogs</h2>

      {blogs.length === 0 ? (
        <p style={styles.noBlogs}>😕 कोई ब्लॉग नहीं मिला।</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>📛 Title</th>
                <th style={styles.th}>📂 Category</th>
                <th style={styles.th}>🗓️ Date</th>
                <th style={styles.th}>⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td style={styles.td}>{blog.title}</td>
                  <td style={styles.td}>{blog.category}</td>
                  <td style={styles.td}>
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => setEditingBlog(blog)}
                      style={styles.editBtn}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      style={styles.deleteBtn}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {editingBlog && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h3>✏️ Edit Blog</h3>
            <input
              name="title"
              value={editingBlog.title}
              onChange={handleEditChange}
              placeholder="Title"
              style={styles.input}
            />
            <input
              name="category"
              value={editingBlog.category}
              onChange={handleEditChange}
              placeholder="Category"
              style={styles.input}
            />
            <input
              name="image"
              value={editingBlog.image}
              onChange={handleEditChange}
              placeholder="Image URL"
              style={styles.input}
            />
            <textarea
              name="content"
              value={editingBlog.content}
              onChange={handleEditChange}
              rows="5"
              placeholder="Content"
              style={styles.textarea}
            />
            <div style={styles.modalActions}>
              <button onClick={() => setEditingBlog(null)} style={styles.cancelBtn}>
                ❌ Cancel
              </button>
              <button onClick={handleUpdate} style={styles.saveBtn}>
                ✅ Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    maxWidth: "1200px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
  },
  noBlogs: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px",
  },
  th: {
    border: "1px solid #ccc",
    padding: "12px",
    textAlign: "left",
    background: "#f8f8f8",
  },
  td: {
    border: "1px solid #ccc",
    padding: "12px",
  },
  editBtn: {
    padding: "8px 16px",
    minWidth: "80px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginRight: "8px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "8px 16px",
    minWidth: "80px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  modalOverlay: {
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
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.3)",
  },
  input: {
    width: "100%",
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "vertical",
    marginBottom: "15px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelBtn: {
    padding: "8px 16px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  saveBtn: {
    padding: "8px 16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ManageBlogs;
