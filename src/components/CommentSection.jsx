import React, { useEffect, useState } from "react";
import { ref, push, onValue, update, remove } from "firebase/database";
import { db } from "../data/firebase";
import { getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CommentSection = ({ blogId }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [replyingId, setReplyingId] = useState(null);

  const commentRef = ref(db, `comments/${blogId}`);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const timestamp = new Date().toISOString();

    if (editingId) {
      update(ref(db, `comments/${blogId}/${editingId}`), {
        name,
        comment,
        timestamp,
      });
      setEditingId(null);
    } else {
      const newComment = {
        name,
        comment,
        timestamp,
        likes: 0,
        parentId: replyingId || null,
        userId: currentUser?.uid || null,
        userEmail: currentUser?.email || null,
      };
      push(commentRef, newComment);
    }

    setComment("");
    setName("");
    setReplyingId(null);
  };

  const handleEdit = (id, c) => {
    setName(c.name);
    setComment(c.comment);
    setEditingId(id);
  };

 const handleDelete = (id) => {
  remove(ref(db, `comments/${blogId}/${id}`))
    .then(() => {
      toast.success("🗑️ Comment deleted successfully!");
    })
    .catch((error) => {
      toast.error("❌ Failed to delete comment!");
      console.error(error);
    });
};


  const handleLike = (id, currentLikes) => {
    update(ref(db, `comments/${blogId}/${id}`), {
      likes: currentLikes + 1,
    });
  };

  const handleReply = (id) => {
    setReplyingId(id);
  };

  useEffect(() => {
    onValue(commentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        setComments(list);
      } else {
        setComments([]);
      }
    });
  }, [blogId]);

  const renderComments = (parentId = null) => {
    return comments
      .filter((c) => (c.parentId ?? null) === parentId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .map((c) => (
        <div key={c.id} style={{ marginLeft: parentId ? 30 : 0, ...styles.commentBox }}>
          <div style={styles.avatar}>{c.name?.[0]?.toUpperCase()}</div>
          <div style={{ flex: 1 }}>
            <strong>{c.name}</strong>
            <p>{c.comment}</p>
            <div style={styles.actionsRow}>
              <span style={styles.time}>{new Date(c.timestamp).toLocaleString()}</span>
              <button onClick={() => handleLike(c.id, c.likes || 0)} style={styles.actionBtn}>
                💖
                {c.likes || 0}
              </button>
              <button onClick={() => handleReply(c.id)} style={styles.actionBtn}>
                ↩️ Reply
              </button>

              {(c.userId === currentUser?.uid || currentUser?.email === "admin@gmail.com") && (
                <>
                  <button onClick={() => handleEdit(c.id, c)} style={styles.actionBtn}>
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(c.id)} style={styles.actionBtn}>
                    🗑 Delete
                  </button>
                </>
              )}
            </div>
            {renderComments(c.id)}
          </div>
        </div>
      ));
  };

  return (
  <div style={styles.container}>
    <h3>{editingId ? "✏️ Edit Comment" : replyingId ? "↩️ Reply" : "💬 Leave a Comment"}</h3>

    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <textarea
        placeholder="Your Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={styles.textarea}
      ></textarea>
      <button type="submit" style={styles.button}>
        {editingId ? "Update" : "Submit"}
      </button>
    </form>

    <div style={styles.commentList}>
      {comments.length === 0 ? (
        <p style={{ color: "#777", fontStyle: "italic" }}>No comments yet.</p>
      ) : (
        renderComments()
      )}
    </div>

   
    <ToastContainer position="top-right" autoClose={2000} />
  </div>
);

};

const styles = {
  container: { padding: 20 },
  form: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 },
  input: { padding: 8, borderRadius: 4, border: "1px solid #ccc" },
  textarea: { padding: 8, borderRadius: 4, border: "1px solid #ccc" },
  button: { padding: 10, background: "#333", color: "#fff", border: "none", borderRadius: 4 },
  commentList: { display: "flex", flexDirection: "column", gap: 12 },
  commentBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    background: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  time: { fontSize: 12, color: "#888" },
  actionsRow: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 5 },
  actionBtn: {
    background: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    fontSize: 14,
  },
};

export default CommentSection;
