import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { 
  ArrowLeft, 
  Trash2, 
  Search, 
  Package, 
  Plus, 
  ShoppingBag, 
  Tag as TagIcon 
} from "lucide-react";
import "./ManageProducts.css";

const ManageProducts = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setItems(stored);
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove this product?",
      text: "This item will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete",
      borderRadius: "15px"
    }).then((result) => {
      if (result.isConfirmed) {
        const filtered = items.filter((item) => item.id !== id);
        setItems(filtered);
        localStorage.setItem("products", JSON.stringify(filtered));
        Swal.fire("Deleted!", "Product has been removed.", "success");
      }
    });
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-manage-wrapper">
      <div className="container py-5">
        
        {/* --- Header Section --- */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
          <div className="d-flex align-items-center gap-3">
            <button onClick={() => navigate(-1)} className="btn-back-product">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="fw-bold text-dark mb-0">Inventory Manager</h2>
              <p className="text-muted small mb-0">Manage your product list and stock</p>
            </div>
          </div>

          <div className="d-flex gap-3">
            <div className="product-search-box">
              <Search size={18} className="product-search-icon" />
              <input 
                type="text" 
                placeholder="Find product..." 
                className="product-input shadow-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-add-product" onClick={() => navigate("/admin/add-product")}>
              <Plus size={20} /> <span className="d-none d-sm-inline">New</span>
            </button>
          </div>
        </div>

        {/* --- Content Grid --- */}
        {filteredItems.length === 0 ? (
          <div className="empty-product-state">
            <div className="empty-icon-box mb-3">
              <Package size={60} strokeWidth={1} />
            </div>
            <h4 className="fw-bold">No items found</h4>
            <p className="text-muted">Start by adding your first product to the inventory.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div className="product-card-premium h-100 shadow-sm border-0">
                  <div className="product-img-container">
                    {item.image ? (
                      <img src={item.image} className="product-img" alt={item.title} />
                    ) : (
                      <div className="product-placeholder"><ShoppingBag size={40} /></div>
                    )}
                    <div className="product-category-pill">{item.category}</div>
                  </div>
                  
                  <div className="card-body p-4">
                    <h6 className="product-title-ui mb-1">{item.title}</h6>
                    <p className="product-desc-ui small mb-3">
                      {item.description || item.desc || "No description provided."}
                    </p>
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="product-price-ui">
                        <span className="currency-symbol">₹</span>{item.price}
                      </div>
                      <div className="small text-muted d-flex align-items-center">
                        <TagIcon size={12} className="me-1" /> Stocked
                      </div>
                    </div>

                    <button className="btn-delete-product" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={18} className="me-2" /> Delete Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;