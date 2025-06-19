import React from "react";

const CategoryFilter = ({ categories, onSelect }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      <button onClick={() => onSelect("All")}>All</button>
      {categories.map((cat) => (
        <button key={cat} onClick={() => onSelect(cat)}>{cat}</button>
      ))}
    </div>
  );
};

export default CategoryFilter;
