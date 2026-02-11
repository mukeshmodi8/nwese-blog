import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../data/firebase";
import { Edit3, Trash2, X, Check, Search, ArrowLeft, Filter, Hash } from "lucide-react";
import "./ManageBlogs.css";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

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

  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))];

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Delete this post?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete",
    });

    if (confirmResult.isConfirmed) {
      try {
        await deleteDoc(doc(firestore, "blogs", id));
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        Swal.fire("Deleted!", "Post has been removed.", "success");
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
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
      Swal.fire("Success!", "Post updated successfully.", "success");
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      Swal.fire("Failed", error.message, "error");
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="manage-wrapper">
      <div className="container py-5">
        
        {/* --- Top Header & Back Button --- */}
        <div className="d-flex align-items-center justify-content-between mb-5">
          <div className="d-flex align-items-center gap-3">
            <button onClick={() => navigate(-1)} className="back-btn-ui">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="fw-bold text-dark mb-0">Manage Posts</h2>
              <p className="text-muted small mb-0">Total {filteredBlogs.length} articles found</p>
            </div>
          </div>
          
          <div className="search-box-ui">
            <Search size={18} className="search-icon-ui" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="form-control-ui shadow-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- Category Chips --- */}
        <div className="category-scroll-ui mb-4">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`chip-btn-ui ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- Blog List Grid (Professional Table Alternative) --- */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 custom-table-ui">
              <thead>
                <tr>
                  <th className="px-4 py-4 text-secondary small text-uppercase fw-bold border-0">Article Details</th>
                  <th className="py-4 text-secondary small text-uppercase fw-bold border-0 text-center">Category</th>
                  <th className="py-4 text-secondary small text-uppercase fw-bold border-0 text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="px-4 py-4 border-bottom border-light">
                      <div className="d-flex align-items-center gap-3">
                        <img src={blog.image} alt="" className="blog-thumb-ui shadow-sm" />
                        <div>
                          <h6 className="fw-bold text-dark mb-1">{blog.title}</h6>
                          <span className="text-muted extra-small-ui"><Hash size={10} className="me-1" />{blog.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center border-bottom border-light">
                      <span className="badge-category-ui">{blog.category}</span>
                    </td>
                    <td className="text-end pe-4 border-bottom border-light">
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn-action-ui edit" onClick={() => setEditingBlog(blog)}>
                          <Edit3 size={16} />
                        </button>
                        <button className="btn-action-ui delete" onClick={() => handleDelete(blog.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Edit Modal --- */}
        {editingBlog && (
          <div className="modal-backdrop-ui">
            <div className="modal-card-ui animate-up-ui">
              <div className="modal-header-ui">
                <h4 className="fw-bold mb-0">Update Article</h4>
                <button className="close-btn-ui" onClick={() => setEditingBlog(null)}><X size={20} /></button>
              </div>

              <div className="modal-body-ui">
                <div className="mb-4">
                  <label className="label-ui">Title</label>
                  <input className="input-ui" value={editingBlog.title} onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})} />
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="label-ui">Category</label>
                    <input className="input-ui" value={editingBlog.category} onChange={(e) => setEditingBlog({...editingBlog, category: e.target.value})} />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="label-ui">Thumbnail URL</label>
                    <input className="input-ui" value={editingBlog.image} onChange={(e) => setEditingBlog({...editingBlog, image: e.target.value})} />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="label-ui">Body Content</label>
                  <textarea className="input-ui scroll-ui" rows="8" value={editingBlog.content} onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}></textarea>
                </div>
              </div>

              <div className="modal-footer-ui">
                <button className="btn-ui-secondary" onClick={() => setEditingBlog(null)}>Discard</button>
                <button className="btn-ui-primary" onClick={handleUpdate}>Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBlogs;