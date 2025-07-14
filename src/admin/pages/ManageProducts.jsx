import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageProducts = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setItems(stored);
  }, []);

  const handleDelete = (id) => {
    const filtered = items.filter((item) => item.id !== id);
    setItems(filtered);
    localStorage.setItem("products", JSON.stringify(filtered));
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-primary">🛠️ Manage Products</h2>
      {items.length === 0 ? (
        <div className="alert alert-info text-center">No products found</div>
      ) : (
        <div className="row">
          {items.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                {item.image && (
                  <img src={item.image} className="card-img-top" alt={item.title} height="200" style={{ objectFit: "cover" }} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-muted">
                    {item.description || item.desc}
                  </p>
                  <p><strong>₹{item.price}</strong> | Category: {item.category}</p>
                  <button className="btn btn-danger w-100" onClick={() => handleDelete(item.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
