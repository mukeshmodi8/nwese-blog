// ✅ src/components/CommentSection.jsx
import React, { useEffect, useState } from "react";
import { ref, push, onValue } from "firebase/database";
import { db } from "../data/firebase";

const CommentSection = ({ blogId }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || comment.trim() === "") return;

    const commentRef = ref(db, `comments/${blogId}`);
    const newComment = {
      name,
      comment,
      timestamp: new Date().toISOString(),
    };

    push(commentRef, newComment);
    setComment("");
    setName("");
  };

  useEffect(() => {
    const commentRef = ref(db, `comments/${blogId}`);
    onValue(commentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedComments = Object.values(data).sort((a, b) =>
          new Date(b.timestamp) - new Date(a.timestamp)
        );
        setComments(loadedComments);
      } else {
        setComments([]);
      }
    });
  }, [blogId]);

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>💬 Leave a Comment</h3>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          style={styles.input}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Your Comment"
          value={comment}
          style={styles.textarea}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

      <div style={styles.commentList}>
        {comments.length === 0 ? (
          <p style={{ color: "#777", fontStyle: "italic" }}>No comments yet.</p>
        ) : (
          comments.map((c, i) => (
            <div key={i} style={styles.commentBox}>
              <div style={styles.avatar}>
                {c.name?.[0]?.toUpperCase() || "?"}
              </div>
              <div>
                <strong>{c.name}</strong>
                <p style={{ margin: "5px 0" }}>{c.comment}</p>
                <span style={styles.time}>
                  {new Date(c.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    borderTop: "1px solid #ccc",
    marginTop: "40px",
    paddingTop: "30px",
  },
  heading: {
    marginBottom: "15px",
    fontSize: "22px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "25px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#333",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },
  commentList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  commentBox: {
    display: "flex",
    gap: "10px",
    background: "#f9f9f9",
    padding: "12px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  time: {
    fontSize: "12px",
    color: "#888",
  },
};

export default CommentSection;
