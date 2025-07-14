// src/components/CategoryFilter.jsx
import React from "react";
import { useCategory } from "../context/CategoryContext";

const CategoryFilter = ({ categories }) => {
  const { selectedCategory, setSelectedCategory } = useCategory();

  return (
    <div className="flex gap-4 flex-wrap">
      <button
        className={selectedCategory === "All" ? "active" : ""}
        onClick={() => setSelectedCategory("All")}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          className={selectedCategory === cat ? "active" : ""}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
