import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>If you have any questions, suggestions, or collaboration ideas — feel free to contact us. We'd love to hear from you!</p>

      <div className="contact-details">
        <p><strong>📧 Email:</strong> <a href="devmukeshmodi@gmail.com">devmukeshmodi@gmail.com</a></p>
        <p><strong>🌐 Website:</strong> <a href="https://nwese-blog-5xg5.vercel.app/" target="_blank" rel="noopener noreferrer">https://nwese-blog-5xg5.vercel.app/</a></p>
        <p><strong>📍 Location:</strong> Ahmedabad, Gujarat, India</p>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message..." rows="5" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
