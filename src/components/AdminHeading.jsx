// components/AdminHeading.jsx
import React from "react";

const AdminHeading = ({ title }) => {
  return (
    <h1 className="text-3xl font-bold text-center text-gray-800 mt-4">
      {title}
    </h1>
  );
};

export default AdminHeading;
