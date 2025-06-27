import React from "react";
import "./Privacy.css"; // external css file

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-date">Effective Date: June 27, 2025</p>

        <h2>Introduction</h2>
        <p>
          Welcome to Mr. Happy Blog. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website at 
          <strong> https://nwese-blog-5xg5.vercel.app/</strong>.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address, and any data you voluntarily provide through contact forms or newsletter subscriptions.
        </p>

        <h2>Log Files</h2>
        <p>
          Like many websites, we use log files. These include your IP address, browser type, date/time stamp, referring pages, and possibly the number of clicks.
        </p>

        <h2>Cookies</h2>
        <p>
          We use cookies to enhance your experience. You can choose to disable cookies through your browser settings.
        </p>

        <h2>Google AdSense</h2>
        <p>
          We use Google AdSense. It may use cookies to serve ads based on your previous visits to this or other websites. You can opt out of personalized advertising by visiting Google Ads Settings.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Our Privacy Policy does not apply to other advertisers or websites. Please consult their policies separately.
        </p>

        <h2>Children's Information</h2>
        <p>
          We do not knowingly collect personal information from children under 13. If you believe your child has provided us with such data, please contact us.
        </p>

        <h2>Consent</h2>
        <p>
          By using our website, you consent to our Privacy Policy and agree to its terms.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
