import React, { useState } from "react";
import { firestore } from "../../data/firebase"; // ✅ correct import
import { collection, addDoc } from "firebase/firestore";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(firestore, "products"), product); // ✅ firestore used here
      alert("✅ Product added successfully!");
      setProduct({
        title: "",
        price: "",
        description: "",
        image: "",
        category: ""
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 Add New Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Product</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "500px",
    margin: "auto",
    background: "#121212",
    borderRadius: "12px",
    color: "#fff"
  },
  heading: {
    textAlign: "center",
    color: "#00D1FF",
    marginBottom: "30px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    outline: "none"
  },
  button: {
    padding: "12px",
    background: "#00D1FF",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default AddProduct;
