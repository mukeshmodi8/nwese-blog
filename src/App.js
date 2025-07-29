import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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
import { CategoryProvider } from "./context/CategoryContext";
import StateBlogs from "./pages/StateBlogs";
import Video from "./pages/Video";
import ScrollToTop from "./components/ScrollToTop";
import FlashNews from "./pages/FlashNews";
import Sports from "./components/Sports";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoutes from "./admin/AdminRoutes";
import Sitemap from "./pages/Sitemap";
import SingleBlog from "./pages/SingleBlog";
import SubscribePopup from "./components/SubscribePopup";
import { requestPermissionAndGetToken, onMessageListener } from "./data/firebase-messaging-sw";

// ✅ Renamed lucide-react icon import to avoid conflict
import { Download as DownloadIcon } from "lucide-react";

// ✅ Page component
import Download from "./pages/Download";
// import AppDownloadBanner from "./components/AppDownloadBanner"; // Optional

const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    requestPermissionAndGetToken(); 

    onMessageListener()
      .then((payload) => {
        const { title, body } = payload.notification || {};
        toast.info(`${title} - ${body}`);
      })
      .catch((err) => console.error("⚠️ FCM listener error:", err));
  }, []);

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <ToastContainer position="top-right" autoClose={3000} />
      <ScrollToTop />
      <SubscribePopup />

      <div className="p-4">
        {/* <AppDownloadBanner /> ✅ Optional banner component */}

        <Routes>
          {/* ✅ Public Routes */}
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
          <Route path="/videos" element={<Video />} />
          <Route path="/fast-news" element={<FlashNews />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/single-blog/:id" element={<SingleBlog />} />
          <Route path="/download" element={<Download />} /> {/* ✅ Corrected */}
         
          {/* ✅ Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FooterNav />}
    </>
  );
};

function App() {
  return (
    <Router>
      <CategoryProvider>
        <AppLayout />
      </CategoryProvider>
    </Router>
  );
}

export default App;
