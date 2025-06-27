// src/pages/About.jsx
import React from "react";
import "./About.css"; 

const About = () => {
     console.log("✅ About Page Loaded");
  return (
    <div className="about-page" style={{ padding: "2rem", maxWidth: "800px", margin: "auto", lineHeight: "1.8" }}>
      <h1>About Mr. Happy Blog</h1>
      <p>
        <strong>Mr. Happy Blog</strong> is a reliable platform where we deliver high-quality content on
        trending technology, blogging tips, daily news, and digital updates. Our goal is to provide
        authentic, informative, and engaging articles that help our readers stay informed and empowered.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>🔹 Latest Technology Blogs and How-To Guides</li>
        <li>🔹 Daily Tech News and Industry Trends</li>
        <li>🔹 Honest Reviews of Mobiles, Laptops, and Gadgets</li>
        <li>🔹 Blogging and SEO Tips for Beginners</li>
        <li>🔹 Freelancing, Online Earning, and Productivity Tips</li>
      </ul>

      <h2>Our Mission</h2>
      <p>
        Our mission is to empower readers with accurate and easy-to-understand content related to the
        digital world. Whether you’re a student, freelancer, blogger, or just a tech enthusiast – our
        platform is designed to provide value to everyone.
      </p>

      <h2>Who We Are</h2>
      <p>
        Mr. Happy Blog is managed by a team of passionate writers, researchers, and tech experts who
        are dedicated to sharing valuable knowledge and insights. We strive to maintain transparency,
        quality, and consistency in all our content.
      </p>

      <h2>Why You Should Follow Us</h2>
      <p>
        We believe in sharing helpful, practical, and trustworthy content that truly benefits our
        audience. By following us, you’ll always stay one step ahead in the digital world with our
        latest updates and insights.
      </p>
    </div>
  );
};

export default About;
