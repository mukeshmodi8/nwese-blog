import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import News from "./pages/News";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import InviteFriends from "./pages/InviteFriends";
import Privacy from "./pages/Privacy";
import States from "./pages/States";
import FooterNav from "./components/FooterNav";
import { CategoryProvider } from "./context/CategoryContext"; // ✅ Add this import
import StateBlogs from "./pages/StateBlogs";

function App() {
  return (
    <Router>
      <CategoryProvider>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/invite" element={<InviteFriends />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/states" element={<States />} />
            <Route path="/state/:stateName" element={<StateBlogs />} />
          </Routes>
        </div>
        <Footer />
        <FooterNav />
      </CategoryProvider>
    </Router>
  );
}

export default App;
