import React from "react";
import { useParams } from "react-router-dom";
import blogs from "../data/blogs";
import { formatDistanceToNow, format } from "date-fns";

import {
    FaWhatsapp,
    FaFacebook,
    FaTwitter,
    FaTelegram,
    FaShareAlt,
} from "react-icons/fa";

const BlogDetails = () => {
    const { id } = useParams();
    const blog = blogs.find((b) => b.id.toString() === id);

    if (!blog) {
        return <h2>❌ Blog Not Found</h2>;
    }

    const shareText = `Check out this blog: ${blog.title}`;
    const shareUrl = `${window.location.origin}/blogs/${blog.id}`;

    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

    return (
        <div className="blog-details" style={{ padding: "20px" }}>
            <h1>{blog.title}</h1>
            <img
                src={blog.image}
                alt={blog.title}
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    borderRadius: "8px",
                    marginTop: "20px",
                }}
            />
            <p
                style={{
                    fontSize: "18px",
                    marginTop: "20px",
                    whiteSpace: "pre-line",
                }}
            >
                {blog.content}
            </p>
            <p style={{ fontSize: "14px", color: "#777" }}>
                📅 Published: {format(new Date(blog.publishedAt), "hh:mm a")} |
                ⏱️ {blog.readingTime} |
                ⌛ {formatDistanceToNow(new Date(blog.publishedAt), { addSuffix: true })}
            </p>



            {/* Share Icons */}
            <div
                style={{
                    marginTop: "30px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flexWrap: "wrap",
                }}
            >
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                    <FaShareAlt style={{ marginRight: "5px" }} />
                    Share Social:
                </span>

                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    style={{ color: "#25D366", fontSize: "24px" }}
                >
                    <FaWhatsapp />
                </a>
                <a
                    href={facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    style={{ color: "#1877F2", fontSize: "24px" }}
                >
                    <FaFacebook />
                </a>
                <a
                    href={twitterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                    style={{ color: "#1DA1F2", fontSize: "24px" }}
                >
                    <FaTwitter />
                </a>
                <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                    style={{ color: "#0088cc", fontSize: "24px" }}
                >
                    <FaTelegram />
                </a>
            </div>
        </div>
    );
};

export default BlogDetails;
