// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import News from "./pages/News";
import About from "./pages/About";
import Contact from "./pages/Contact"; // ✅ Correct import

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} /> {/* ✅ About route */}
          <Route path="/contact" element={<Contact />} /> {/* ✅ Contact route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
